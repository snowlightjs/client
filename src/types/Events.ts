/* This code snippet is defining an interface in TypeScript called `DiscordClientEvents`. Interfaces in
TypeScript are used to define the structure of an object. In this case, the `DiscordClientEvents`
interface is specifying the structure of an object that should have properties corresponding to
various Discord client events. */
export interface DiscordClientEvents {
    ready: (payload: ReadyEvent) => void;
    raw: (payload: any) => void;
    guildCreate: (payload: any) => void;
    guildDelete: (payload: any) => void;
    channelCreate: (payload: any) => void;
    channelDelete: (payload: any) => void;
    guildUpdate: (payload: GuildCreateEvent) => void;
    messageCreate: (payload: any) => void;
    channelUpdate: (payload: any) => void;
    messageDelete: (payload: any) => void;
    InteractionCreate: (payload: InteractionCreateEvent) => void;
    voiceStateUpdate: (payload: any) => void;
    messageUpdate: (payload: any) => void;
    messageDeleteBulk: (payload: any) => void;
    guildBanRemove: (payload: any) => void;
    guildMemberAdd: (payload: any) => void;
    guildMemberRemove: (payload: any) => void;
    guildMemberUpdate: (payload: any) => void;
    guildEmojisUpdate: (payload: any) => void;
    guildBanAdd: (payload: any) => void;
    guildMembersChunk: (payload: any) => void;
    presenceUpdate: (payload: any) => void;
    webhooksUpdate: (payload: any) => void;
}
export interface InteractionCreateEvent {
    t: 'INTERACTION_CREATE',
    s: 5,
    op: 0,
    d: {
        version: 1,
        type: 2,
        token: string,
        member: {
            user: {
                username: string,
                public_flags: number,
                id: string,
                global_name: string,
                discriminator: string,
                clan: null,
                avatar_decoration_data: null,
                avatar: string
            }
            unusual_dm_activity_until: null,
            roles: [],
            premium_since: null,
            permissions: string,
            pending: boolean,
            nick: null,
            mute: boolean,
            joined_at: string,
            flags: 0,
            deaf: false,
            communication_disabled_until: null,
            avatar: null
        },
        locale: string,
        id: string,
        guild_locale: string,
        guild_id: string,
        guild: { locale: string, id: string, features: [] },
        entitlements: [],
        entitlement_sku_ids: [],
        data: { type: number, name: string, id: string },
        channel_id: string,
        channel: {
            type: number,
            topic: null,
            theme_color: null,
            rate_limit_per_user: number,
            position: number,
            permissions: string,
            parent_id: string,
            nsfw: boolean,
            name: string,
            last_message_id: string,
            id: string,
            icon_emoji: [],
            guild_id: string,
            flags: number
        },
        application_id: string,
        app_permissions: string
    }
}
export interface GuildCreateEvent {
    t: 'GUILD_CREATE',
    s: 4,
    op: 0,
    d: {
        default_message_notifications: number,
        vanity_url_code: null,
        stickers: [],
        application_id: null,
        preferred_locale: string,
        stage_instances: [],
        banner: null,
        premium_tier: number,
        max_members: number,
        nsfw_level: number,
        member_count: number,
        incidents_data: null,
        id: string,
        guild_scheduled_events: [],
        afk_channel_id: string,
        emojis: [],
        name: string,
        safety_alerts_channel_id: null,
        soundboard_sounds: [],
        max_stage_video_channel_users: number,
        clan: null,
        max_video_channel_users: number,
        region: string,
        voice_states: [],
        icon: null,
        explicit_content_filter: number,
        threads: [],
        home_header: null,
        afk_timeout: number,
        system_channel_id: null,
        roles: [],
        activity_instances: {},
        description: null,
        lazy: boolean,
        joined_at: string,
        inventory_settings: null,
        hub_type: null,
        splash: null,
        premium_subscription_count: number,
        public_updates_channel_id: null,
        channels: [],
        presences: [],
        system_channel_flags: number,
        features: [],
        members: [],
        verification_level: 1,
        owner_id: string,
        premium_progress_bar_enabled: boolean,
        unavailable: boolean,
        rules_channel_id: null,
        discovery_splash: null,
        version: number,
        latest_onboarding_question_id: null,
        embedded_activities: [],
        application_command_counts: {},
        large: boolean,
        nsfw: boolean,
        mfa_level: 0
    }
}
export interface ReadyEvent {
    t: 'READY',
    s: 1,
    op: 0,
    d: {
        v: 10,
        user_settings: {},
        user: {
            verified: boolean,
            username: string,
            mfa_enabled: boolean,
            id: string,
            global_name: null,
            flags: number,
            email: null,
            discriminator: string,
            clan: null,
            bot: boolean,
            avatar: string
        },
        shard: number[],
        session_type: string,
        session_id: string,
        resume_gateway_url: string,
        relationships: [],
        private_channels: [],
        presences: [],
        guilds: [],
        guild_join_requests: [],
        geo_ordered_rtc_regions: string[],
        auth: {},
        application: { id: string, flags: number },
        _trace: []
    }
}