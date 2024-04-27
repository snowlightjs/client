import WebSocket from 'ws'
import { TypedEmitter } from 'tiny-typed-emitter'
import { GatewayDispatchEvents, GatewayOpcodes } from 'discord-api-types/v10'
import { Client } from './client';


/* The `interface Events` is defining a structure that specifies the shape of events that can be
emitted by the WebSocket class. In this case, it defines an event named `raw` that takes a payload
of type string as a parameter and returns void. This allows the WebSocket class to emit a `raw`
event with a string payload when certain conditions are met, and other parts of the code can listen
for and handle this event accordingly. */
interface Events {
    raw: (payload: string) => void
}

export interface DiscordClientOptions {
    token: string;
    intents: number;
    shard: {
        totalShards: number;
        shardCount: number[];
    }
    presence: {
        activities: [
            {
                name: string,
                url: string,
                type: number
            }
        ]
    },
}

/* The class `websocket` in TypeScript represents a WebSocket client for connecting to a Discord
gateway server, handling various events and payloads. */
export default class DiscordWebSocket extends TypedEmitter<Events> {
    ws: WebSocket | null = null
    lasttimeHeartbeat: number = 0
    start_time: Date = new Date()
    sessionId: string | null = null
    sequenceNumber: number | null = null
    ping: number = -1
    isReconnect: boolean = false
    isReady: boolean = false
    isPayloadReady: boolean = false
    timeout_ready_emit: NodeJS.Timeout | null = null
    id: string
    cache = new Map()
    /* The `options` property in the WebSocket class is an object that contains two key-value pairs: */
    options: DiscordClientOptions
    client: Client
    /**
     * The above function is a TypeScript constructor that takes a single parameter and calls the
     * superclass constructor.
     * @param readonly - The `readonly` keyword in a constructor parameter indicates that the property
     * should be read-only once it is initialized. This means that the property can only be set during
     * object creation and cannot be modified afterwards.
     */
    constructor(options: DiscordClientOptions, client: Client) {
        super()
        this.options = options
        this.client = client
    }

    /*
    * Get uptime of shard
    */
    get uptime(): number {
        return this.start_time.getTime() - new Date().getTime()
    }

    /**
     * The `connect` function establishes a WebSocket connection to a Discord gateway server and sets
     * up event handlers for open, message, close, and error events.
     */
    async connect() {
        const ws = new WebSocket(`wss://gateway.discord.gg/?v=10&encoding=json`)
        this.ws = ws
        ws.on('open', this.onOpen.bind(this))
        ws.on('message', this.onMessage.bind(this))
        ws.on('close', (code: number, reason: string) => this.onClose(code, reason))
        ws.on('error', this.onError.bind(this))
    }

    /**
     * The `onOpen` function checks if the WebSocket is defined and logs a debug message if it is not.
     * @returns The `debug` function will be called with the message "WebSocket is not defined", but
     * nothing will be explicitly returned from the `onOpen` function.
     */
    onOpen() {
        if (this.ws === null) {
            return this.debug('WebSocket is not defined')
        }
    }

    /**
     * The function processes incoming packets in TypeScript, handling various Gateway opcodes and
     * emitting events accordingly.
     * @param {string} packets - The `packets` parameter in the `onMessage` function is a string
     * containing JSON data that represents a message received from a gateway. The function parses this
     * JSON data to extract information such as the opcode (`op`) and event type (`t`) to determine how
     * to handle the message. The function
     */
    onMessage(packets: string): void {
        const payload = JSON.parse(packets)
        this.emit('raw', payload)
        switch (payload.op) {
            case GatewayOpcodes.Hello:
                this.cache.set(this.id, setInterval(() => {
                    this.send({ op: GatewayOpcodes.Heartbeat, d: this.sequenceNumber })
                    this.lasttimeHeartbeat = Date.now()
                }, payload.d.heartbeat_interval))
                if (this.sessionId !== null && this.sequenceNumber !== null) { this.resume() } else { this.identify() }
                break;
            case GatewayOpcodes.HeartbeatAck:
                this.ping = Date.now() - this.lasttimeHeartbeat;
                this.debug(`Received HeartbeatAck with ping ${this.ping}`)
                break;
            case GatewayOpcodes.InvalidSession:
                this.debug(`Received InvalidSession`)
                this.sessionId = null
                this.sequenceNumber = null
                this.reconnect();
                if (payload.d === true) { this.resume() } else { this.reconnect() }
                break;
            case GatewayOpcodes.Reconnect:
                this.debug(`Received Reconnect Gateway`)
                this.reconnect();
                break;
            case GatewayOpcodes.Dispatch:
                this.sequenceNumber = payload.s
                switch (payload.t) {
                    case GatewayDispatchEvents.Ready:
                        this.sessionId = payload.d.session_id
                        this.debug(`Received READY Gateway with session id (${this.sessionId})`)
                        this.client.emit('ready', payload)
                        break;
                    case GatewayDispatchEvents.MessageCreate:
                        this.client.emit('messageCreate', payload)
                        break;
                    case GatewayDispatchEvents.GuildCreate:
                        this.client.emit('guildCreate', payload)
                        break
                    case GatewayDispatchEvents.GuildUpdate:
                        this.client.emit('guildUpdate', payload)
                        break
                    case GatewayDispatchEvents.GuildDelete:
                        this.client.emit('guildDelete', payload)
                        break
                    case GatewayDispatchEvents.ChannelCreate:
                        this.client.emit('channelCreate', payload)
                        break
                    case GatewayDispatchEvents.ChannelUpdate:
                        this.client.emit('channelUpdate', payload)
                        break
                    case GatewayDispatchEvents.ChannelDelete:
                        this.client.emit('channelDelete', payload)
                        break
                    case GatewayDispatchEvents.IntegrationCreate:
                        this.client.emit('InteractionCreate', payload)
                        break
                    case GatewayDispatchEvents.VoiceStateUpdate:
                        this.client.emit('voiceStateUpdate', payload)
                        break
                    case GatewayDispatchEvents.VoiceServerUpdate:
                        this.client.emit('voiceStateUpdate', payload)
                        break
                    case GatewayDispatchEvents.MessageDelete:
                        this.client.emit('messageDelete', payload)
                        break
                    case GatewayDispatchEvents.MessageUpdate:
                        this.client.emit('messageUpdate', payload)
                        break
                    case GatewayDispatchEvents.MessageDeleteBulk:
                        this.client.emit('messageDeleteBulk', payload)
                        break
                    case GatewayDispatchEvents.GuildBanAdd:
                        this.client.emit('guildBanAdd', payload)
                        break
                    case GatewayDispatchEvents.GuildBanRemove:
                        this.client.emit('guildBanRemove', payload)
                        break
                    case GatewayDispatchEvents.GuildEmojisUpdate:
                        this.client.emit('guildEmojisUpdate', payload)
                        break
                    case GatewayDispatchEvents.GuildMemberAdd:
                        this.client.emit('guildMemberAdd', payload)
                        break
                    case GatewayDispatchEvents.GuildMemberRemove:
                        this.client.emit('guildMemberRemove', payload)
                        break
                    case GatewayDispatchEvents.GuildMemberUpdate:
                        this.client.emit('guildMemberUpdate', payload)
                        break
                    case GatewayDispatchEvents.GuildMembersChunk:
                        this.client.emit('guildMembersChunk', payload)
                        break
                    case GatewayDispatchEvents.PresenceUpdate:
                        this.client.emit('presenceUpdate', payload)
                        break
                    case GatewayDispatchEvents.Resumed:
                        this.debug(`Received RESUMED Gateway`)
                        break;
                }
                break;
            default:
                this.debug(`Received unknown Gateway with opcode ${payload.op}`)

        }
    }

    /**
     * The `onClose` function handles the disconnection from the Discord Gateway by setting certain
     * properties and reconnecting.
     * @param {number} code - The `code` parameter in the `onClose` function represents the numeric code
     * indicating the reason for the connection closure. This code is provided by the WebSocket
     * connection when it is closed, and different codes represent different reasons for the closure
     * (e.g., normal closure, abnormal closure, error codes, etc
     * @param {string} reason - The `reason` parameter in the `onClose` function represents the reason
     * for the disconnection from the Discord Gateway. It could provide information such as whether the
     * disconnection was due to an error, timeout, or intentional closure.
     */
    async onClose(code: number, reason: string) {
        this.ping = -1
        this.isReady = false
        this.debug(`Disconnected from Discord Gateway with code ${code} and reason ${reason}`)
        this.connect()
    }

    /**
     * The `onError` function logs an error message with debug information.
     * @param {Error} error - The `error` parameter in the `onError` function is of type `Error`, which
     * is an object that represents an error that occurred during the execution of the code.
     */
    onError(error: Error) {
        this.debug(`Error: ${error}`);
    }

    /**
     * The function `send` sends a JSON stringified payload over a WebSocket connection.
     * @param {Dictionary} payload - The `payload` parameter in the `send` function is a dictionary
     * object that contains the data to be sent. It is converted to a JSON string using `JSON.stringify`
     * before being sent over a WebSocket connection using `this.ws.send(raw)`.
     * @returns If the `this.ws` property is `null`, the function will return without sending the
     * payload.
     */
    send(payload: Dictionary) {
        if (this.ws === null) return
        const raw = JSON.stringify(payload)
        this.ws.send(raw)
    }

    /**
     * The `reconnect` function resets the ping value and closes the WebSocket connection with a
     * specific code and reason for reconnecting.
     */
    async reconnect() {
        this.ping = -1
        this.ws?.close(4000, 'Reconnecting')
    }

    /**
     * The `identify` function sends an identification request to a gateway with specified token,
     * intents, properties, and other parameters.
     */
    async identify() {
        this.debug(`Identifying with Gateway`)
        this.send({
            op: GatewayOpcodes.Identify,
            d: {
                token: this.options.token,
                intents: this.options.intents,
                properties: { $os: process.platform, $browser: ((await (import("../../package.json"))).name), $device: ((await (import("../../package.json"))).name) },
                shard: this.client.options.shard.shardCount,
                compress: false,
                large_threshold: 50,
                presence: {
                    status: 'online',
                    activities: this.options.presence.activities.map((activity: any) => {
                        return ({
                            name: activity.name,
                            type: activity.type,
                            url: activity.url
                        })
                    })
                },
            },
        })
    }

    /**
     * The `resume` function sends a resume payload with the token, session ID, and sequence number to
     * the gateway.
     */
    resume() {
        this.debug(`Resuming with Gateway`)
        this.send({
            op: GatewayOpcodes.Resume,
            d: { token: this.options.token, session_id: this.sessionId, seq: this.sequenceNumber }
        })
    }

    /**
     * The `Ready` function sets a timeout to update the `isPayloadReady` property after 1500 milliseconds.
     */
    Ready() {
        if (this.timeout_ready_emit) clearTimeout(this.timeout_ready_emit)
        this.timeout_ready_emit = setTimeout(() => {
            this.isPayloadReady = true
        }, 1500)
    }

    /**
     * The debug function logs a message with a prefix indicating it is related to WebSocket
     * communication.
     * @param {string} message - The `message` parameter in the `debug` function is a string that
     * contains information to be logged or output for debugging purposes.
     */
    debug(message: string) {
        this.emit('raw', `[WebSocket] -> ${JSON.stringify(message)}`)
    }
}
/* The `export declare interface ShardManagerEvents` statement is declaring an interface named
`ShardManagerEvents` that defines the structure of events that can be emitted by a `ShardManager`
class or component. */
export declare interface ShardManagerEvents {
    debug: (message: string) => void
    raw: (message: string) => void
    ready: () => void
}
/* The `export declare type Dictionary<V = any, K extends string | symbol = string> = Record<K, V>;`
statement is defining a TypeScript type alias named `Dictionary`. */
export declare type Dictionary<V = any, K extends string | symbol = string> = Record<K, V>;