import { Members } from "./Members";
import { Role } from "./Role";

export class Guild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
    features: string[];
    permissions_new: string;
    roles: Role;
    members: Members;
    public cache: Map<string, Guild | any> = new Map();
    constructor() {
        this.id = "";
        this.name = "";
        this.icon = "";
        this.owner = false;
        this.permissions = 0;
        this.features = [];
        this.permissions_new = ""
        this.roles = new Role();
        this.members = new Members();
    }
    async fetch(id: string): Promise<Guild> {
        // Fetch guild data
        return this.cache.get(id);
    }
}