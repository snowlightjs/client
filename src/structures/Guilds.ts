export class Guilds {
    cache: Map<string, any>;
    override: boolean = false;
    constructor() {
        if (this.override === false) {
            this.cache = new Map<string, any>();
        } else {
            this.cache.clear();
        }
    }
} 