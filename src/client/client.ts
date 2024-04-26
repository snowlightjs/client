import { TypedEmitter } from "tiny-typed-emitter";
import websocket, { DiscordClientOptions } from "./websocket";
import { DiscordClientEvents } from "../types/Events";
import { Guilds } from "../structures/Guilds";
import { Channel } from "../structures/Channel";
import { Message } from "../structures/Message";

export class Client extends TypedEmitter<DiscordClientEvents> {
    options: DiscordClientOptions;
    websocket: websocket;
    public guilds = new Guilds();
    public channels = new Channel();
    public message = new Message();
    constructor(options: DiscordClientOptions) {
        super();
        if (typeof options !== 'object' || options === null) {
            throw new Error("Options must be an object");
        }
        this.options = {
            token: options.token,
            intents: options.intents,
        };
        this.websocket = new websocket(this.options, this);
    }
    public async destroy() {
        this.emit("raw", 'Destroyed the client');
        return process.exit(0);
    }

    public async login(token: string = this.options.token) {
        if (!token || typeof token !== 'string') throw new Error("Token must be a string");
        this.options.token = token = token.replace(/^(Bot|Bearer)\s*/i, '');
        this.emit("raw", `Provided token: ${this.options.token}`);
        this.emit("raw", 'Preparing to connect to the gateway...');
        try {
            const discord = await fetch(`https://discord.com/api/v10/gateway/bot`, {
                headers: {
                    Authorization: `Bot ${this.options.token}`,
                }
            });
            if (!discord.ok) {
                throw new Error(`Failed to fetch the gateway: ${discord.statusText}`);
            }
            await this.websocket.connect();
            return this.emit("raw", `Connected to the gateway ${this.options.token}!`);
        } catch (error) {
            this.emit("raw", `An error occurred: ${error.message}`);
            await this.destroy();
            throw error;
        }
    }

    public stopInterval(id: number) {
        return clearInterval(id);
    }
}