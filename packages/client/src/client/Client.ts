import DiscordWebSocket from "@snowlightjs/gateway/src/client/DiscordWebSocket";
import { TypedEmitter } from "tiny-typed-emitter";
import { GatewayDispatchEvents } from "discord-api-types/v10";

interface DiscordClientOptions {
    token: string;
    intents: number;
    shard?: {
        totalShards: number;
        shardCount: number[];
    };
    presence?: {
        activities: [
            {
                name: string;
                url: string;
                type: number;
            }
        ];
    };
}
export interface DiscordClientEvents {
    raw: (payload: any) => void;
    ready: (payload: any) => void;
}

/* The `Client` class in TypeScript represents a Discord client with methods for logging in, destroying
the client, and managing intervals. */
export class Client extends TypedEmitter<DiscordClientEvents> {
    options: DiscordClientOptions;
    websocket: DiscordWebSocket;
    sessionId: string;
    isReady: boolean = false;
    guilds: Map<string, any> = new Map();
    isPayloadReady: boolean = false;
    timeout_ready_emit: NodeJS.Timeout;
    /* The `constructor` method in the `Client` class is a special method in TypeScript that gets called
    when a new instance of the class is created. In this specific code snippet: */
    constructor(options: DiscordClientOptions) {
        super();
        this.options = {
            token: options.token,
            intents: options.intents,
            shard: options.shard,
            presence: options.presence,
        };
        this.websocket = new DiscordWebSocket(this.options);
        this.websocket.on("raw", (payload) => this.emit("raw", payload));
        this.websocket.on("d", this.onMessage.bind(this));
    }                                                        
    /**
     * The `destroy` function emits a "raw" event indicating the client has been destroyed and then
     * exits the process with code 0.
     * @returns The `destroy` method is returning a promise since it is an asynchronous function
     * declared with the `async` keyword. The promise will resolve with the value `process.exit(0)`
     * once the function completes.
     */
    public destroy() {
        this.emit("raw", 'Destroyed the client');
        return process.exit(0);
    }

    Ready() {
        if (this.timeout_ready_emit) clearTimeout(this.timeout_ready_emit)
        this.timeout_ready_emit = setTimeout(() => {
            this.isPayloadReady = true
            this.emit('ready', this.guilds);
        }, 1500)
    }

    private onMessage(packets: any) {
        const payload = JSON.parse(packets);
        if (!payload.t) this.emit('raw', payload);
        const { t, d } = payload;
        switch (payload.op) {
            case GatewayDispatchEvents.Ready:
                this.sessionId = payload.d.session_id;
                this.#debug(`Received READY Gateway with session id (${this.sessionId})`)
                this.guilds.set(t, payload);
                this.isReady = true
                this.emit('ready', payload)
                this.emit("raw", payload);
                break;
            case GatewayDispatchEvents.GuildCreate:
                if (!this.isPayloadReady) this.Ready()
                this.guilds.set(d.id, d);
                this.emit("raw", payload);
                break;
            case GatewayDispatchEvents.GuildDelete:
                this.guilds.delete(d.id)
                this.emit("raw", payload);
                break;
        }
    }
    #debug(message: string) {
        this.emit("raw", message);
    }
   /**
    * The function `login` in TypeScript asynchronously connects to the Discord gateway using a
    * provided token after performing necessary preparations and error handling.
    * @param {string} token - The `token` parameter in the `login` function is used for authentication
    * purposes. It is a string that represents the token needed to connect to the Discord API as a bot.
    * The function checks if the token is provided and is a string type before proceeding with the
    * authentication process.
    * @returns The `login` method is returning a Promise that resolves with a message indicating
    * successful connection to the gateway if everything goes well. If an error occurs during the
    * process, it will emit an error message and then destroy the connection before throwing the error.
    */
    public async login(token: string = this.options.token) {
        if (!token || typeof token !== 'string') throw new Error("Token must be a string");
        this.emit("raw", `Provided token: ${this.options.token}`);
        try {
            this.websocket.connect();
            return this.emit("raw", `Connected to the gateway ${this.options.token}!`);
        } catch (error) {
            this.emit("raw", `An error occurred: ${error.message}`);
            await this.destroy();
            throw error;
        }
    }

  /**
   * The `stopInterval` function in TypeScript stops the interval with the specified ID.
   * @param {number} id - The `id` parameter is a number that represents the identifier of the interval
   * that you want to stop or clear.
   * @returns The `clearInterval(id)` function is being called with the `id` parameter passed in, and
   * the return value of this function is being returned. The `clearInterval(id)` function clears the
   * interval set by `setInterval()` and returns undefined.
   */
    public stopInterval(id: number) {
        return clearInterval(id);
    }
}