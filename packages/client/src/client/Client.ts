import { DiscordClientOptions, DiscordEvents } from "../types/Types";
import { TypedEmitter } from "tiny-typed-emitter";
import { DiscordWebSocket } from "./DiscordWebSocket";
import { User } from "./interface/User";
import { Guild } from "./interface/Guilds";
import { Role } from "./interface/Role";
import { Interaction } from "./interface/Interaction";

export class Client extends TypedEmitter<DiscordEvents> {
    options: DiscordClientOptions;
    public cache = new Map();
    public user: User = new User();
    public ws: DiscordWebSocket;
    public guild = new Guild();
    constructor(options: DiscordClientOptions) {
        super();
        if (typeof options !== 'object' || options === null) {
            throw new Error("Invalid options provided");
        }
        this.options = {
            token: options.token,
            intents: options.intents,
            shard: {
                shardCount: options.shard?.shardCount,
                totalShards: options.shard?.totalShards,
            },
            api_version: options.api_version,
            presence: {
                activities:{
                    name: options.presence.activities.name,
                    type: options.presence.activities.type,
                    url: options.presence.activities.url
                },
                status: options.presence?.status
            }
        };
        this.ws = new DiscordWebSocket(this.options.shard.totalShards, this);
    }
    public async destroy() {
        this.emit("debug", 'Destroyed the client');
        return process.exit(0);
    }

    public async login(token: string = this.options.token) {
        if (!token || typeof token !== 'string') throw new Error("Invalid token provided");
        this.emit("debug", `Provided token: ${this.options.token}`);
        this.emit("debug", 'Preparing to connect to the gateway...');
        try {
            const discord = await fetch(`https://discord.com/api/v10/gateway/bot`, {
                headers: {
                    Authorization: `Bot ${this.options.token}`,
                }
            });
            if (!discord.ok) {
                throw new Error(`Failed to connect to the gateway: ${discord.statusText}`);
            }
            await this.ws.connect();
            return this.emit("debug", `Connected to the gateway ${this.options.token}!`);
        } catch (error) {
            this.emit("debug", `An error occurred: ${error}`);
            await this.destroy();
            throw error;
        }
    }

    public stopInterval(id: number) {
        return clearInterval(id);
    }
}