export interface DiscordClientEvents {
    ready: (payload: any) => void;
    raw: (payload: any) => void;
    guildCreate: (payload: any) => void;
    guildDelete: (payload: any) => void;
    channelCreate: (payload: any) => void;
    channelDelete: (payload: any) => void;
    guildUpdate: (payload: any) => void;
    messageCreate: (payload: any) => void;
    channelUpdate: (payload: any) => void;
}