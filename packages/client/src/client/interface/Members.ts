import { Role } from "./Role";

export class Members {
    id: string;
    user: string;
    nick: string;
    joined_at: string;
    premium_since: string;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    permissions: string;
    roles: Role[];
    
    public cache = new Map();
    constructor() {
        this.id = "";
        this.user = "";
        this.nick = "";
        this.roles = [];
        this.joined_at = "";
        this.premium_since = "";
        this.deaf = false;
        this.mute = false;
        this.pending = false;
        this.permissions = "";
    }
    public async fetch(id: string): Promise<Members> {
        return this.cache.get(id);
    }
}