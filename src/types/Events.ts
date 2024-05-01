/* This code snippet is defining an interface in TypeScript called `DiscordClientEvents`. Interfaces in
TypeScript are used to define the structure of an object. In this case, the `DiscordClientEvents`
interface is specifying the structure of an object that should have properties corresponding to
various Discord client events. */
export interface DiscordClientEvents {
    raw: (payload: any) => void;
}