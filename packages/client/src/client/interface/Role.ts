export class Role {
    version: number;
    unicode_emoji: string | null;
    tags: Record<string, unknown>;
    position: number;
    permissions: string;
    name: string;
    mentionable: boolean;
    managed: boolean;
    id: string;
    icon: string | null;
    hoist: boolean;
    flags: number;
    color: number;
    public cache = new Map();
    constructor() {
        this.version = 0;
        this.unicode_emoji = null;
        this.tags = {};
        this.position = 0;
        this.permissions = "";
        this.name = "";
        this.mentionable = false;
        this.managed = false;
        this.id = "";
        this.icon = null;
        this.hoist = false;
        this.flags = 0;
        this.color = 0;
    }
    public async fetch(id: string): Promise<Role> {
        return this.cache.get(id);
    }
}