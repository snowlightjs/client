export class User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
    system: boolean;
    mfaEnabled: boolean;
    locale: string;
    verified: boolean;
    email: string;

    public cache = new Map();
    constructor() {
        this.id = "";
        this.username = "";
        this.discriminator = "";
        this.avatar = "";
        this.bot = false;
        this.system = false;
        this.mfaEnabled = false;
        this.locale = "en-US";
        this.verified = false;
        this.email = ""
    }
}