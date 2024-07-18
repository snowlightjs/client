import { APIGuildMember, APIUser } from "discord-api-types/v10";

export class Members implements APIGuildMember {
    flags: number;
    id: string;
    user: APIUser;
    nick: string;
    joined_at: string;
    premium_since: string;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    permissions: string;
    roles: string[];
    
    public cache = new Map();
    constructor() {
        this.id = "";
        this.user = {} as APIUser;
        this.nick = "";
        this.roles = [];
        this.joined_at = "";
        this.premium_since = "";
        this.deaf = false;
        this.mute = false;
        this.pending = false;
        this.permissions = "";
        this.flags = 0;
    }
    public async fetch(id: string): Promise<Members> {
        return this.cache.get(id);
    }
}