import { ActivityType, GatewayDispatchEvents, GatewayGuildCreateDispatchData, GatewayMessageCreateDispatchData, GatewayVoiceStateUpdateDispatch } from "discord-api-types/v10";
import { Client } from "../client/Client";
import { Interaction } from "../client/interface/Interaction";
import { DiscordWebSocket } from "../client/DiscordWebSocket";
import { Guild } from "../client/interface/Guilds";

export interface DiscordClientRestOptions {
    version: "v10" | "v9"
}
export interface DiscordClientOptions {
    token?: string;
    intents: number;
    shard?: {
        totalShards: number;
        shardCount: number;
    }
    api_version: "v10" | "v9";
    presence?: {
        activities: {
            name: string;
            type: number;
            url: string;
        },
        status: DiscordClientStatus;
    };
}
export interface DiscordEvents {
    'ready': (payload: DiscordGatewayPayloadReady) => void;
    'debug': (message: string) => void;
    'message': (message: string) => void;
    'guildCreate': (guild: Guild | GatewayGuildCreateDispatchData) => void;
    'MessageCreate': (payload: GatewayMessageCreateDispatchData) => void;
    'InteractionCreate': (interaction: Interaction) => void;
    'voiceStateUpdate': (voiceState: GatewayVoiceStateUpdateDispatch) => void;
    'raw': (payload: string) => void;

}
export interface InteractionCreatePayload {
    version: number;
    type: number;
    token: string;
    member: {
        user: {
            username: string;
            public_flags: number;
            id: string;
            global_name: string;
            discriminator: string;
            clan: null;
            avatar_decoration_data: null;
            avatar: string;
        };
        unusual_dm_activity_until: null;
        roles: [];
        premium_since: null;
        permissions: string;
        pending: false;
        nick: null;
        mute: false;
        joined_at: string;
        flags: 0;
        deaf: false;
        communication_disabled_until: null;
        avatar: null;
    };
    locale: string;
    id: string;
    guild_locale: string;
    guild_id: string;
    guild: {
        locale: string;
        id: string;
        features: string[];
    };
    entitlements: [];
    entitlement_sku_ids: [];
    data: {
        type: 1;
        name: "ping";
        id: string;
        options: [];
    };
    channel_id: string;
    channel: {
        type: number;
        topic: null;
        theme_color: null;
        rate_limit_per_user: number;
        position: number;
        permissions: string;
        parent_id: string;
        nsfw: boolean;
        name: string;
        last_message_id: string;
        id: string;
        icon_emoji: {
            name: string;
            id: string;
        };
        guild_id: string;
        flags: number;
    };
    application_id: string;
    app_permissions: string;
}
export enum DiscordGatewayOpCodes {
    Dispatch = 0,
    Heartbeat = 1,
    Identify = 2,
    PresenceUpdate = 3,
    VoiceStateUpdate = 4,
    Resume = 6,
    Reconnect = 7,
    RequestGuildMembers = 8,
    InvalidSession = 9,
    Hello = 10,
    HeartbeatAck = 11
}
export enum DiscordClientStatus {
    online = "online",
    idle = "idle",
    dnd = "dnd",
    invisible = "invisible",
    offline = "offline"
}
export interface DiscordSetPresence {
    name: string;
    type: ActivityType;
    url: string;
    status: DiscordClientStatus;
}
export interface DiscordGatewayPayload {
    op: DiscordGatewayOpCodes;
    d: {
        token: string;
        intents: number;
        properties: {
            os: string;
            browser: string;
            device: string;
        },
        presence: {
            activities:
            {
                name: string;
                type: number;
                url: string;
            }
            status: DiscordClientStatus;
        };
    };
}
export interface DiscordGatewayPayloadResume {
    token: string;
    session_id: string;
    seq: number;
}
export interface DiscordGatewayPayloadReady {
    op: DiscordGatewayOpCodes;
    t: "READY",
    s: 1,
    d: {
        v: number,
        user_settings: Record<string, unknown>,
        user: {
            verified: boolean,
            username: string,
            mfa_enabled: true,
            id: string,
            global_name: null,
            flags: 0,
            email: null,
            discriminator: string,
            clan: null,
            bot: true,
            avatar: string
        },
        session_type: string,
        session_id: string,
        resume_gateway_url: string,
        relationships: [],
        private_channels: [],
        presences: [],
    }
}
interface EventInterface<TPayload> {
    name: GatewayDispatchEvents | string;
    run: (
        payload: TPayload,
        ws: DiscordWebSocket,
        client: Client
    ) => Promise<void>;
}

export class EventBuilder<TPayload> {
    name: GatewayDispatchEvents | string;
    run: (payload: TPayload, ws: DiscordWebSocket, client: Client) => Promise<void>;

    constructor(option: EventInterface<TPayload>) {
        this.name = option.name;
        this.run = option.run;
    }
}