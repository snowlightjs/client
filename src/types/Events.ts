/* This code snippet is defining an interface in TypeScript called `DiscordClientEvents`. Interfaces in
TypeScript are used to define the structure of an object. In this case, the `DiscordClientEvents`
interface is specifying the structure of an object that should have properties corresponding to
various Discord client events. */
export interface DiscordClientEvents {
    ready: (payload: ReadyEvent) => void;
    raw: (payload: any) => void;
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