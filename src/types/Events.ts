/* This code snippet is defining an interface in TypeScript called `DiscordClientEvents`. Interfaces in
TypeScript are used to define the structure of an object. In this case, the `DiscordClientEvents`
interface is specifying the structure of an object that should have properties corresponding to
various Discord client events. */
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
    messageDelete: (payload: any) => void;
    InteractionCreate: (payload: any) => void;
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