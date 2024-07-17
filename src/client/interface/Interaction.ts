import axios from "axios";
import { Client } from "../Client";

export class Interaction {
    id: string;
    token: string;
    data: {
        type: number,
        name: string,
        id: string
        options: []
    };
    members: {
        id: string,
        user: {
            id: string,
            username: string,
            discriminator: string,
            avatar: string,
            bot: boolean,
            system: boolean,
            mfa_enabled: boolean,
            locale: string,
            verified: boolean,
            email: string,
            flags: number,
            premium_type: number,
            public_flags: number
        },
        roles: string[],
        premium_since: string,
        deaf: boolean,
        mute: boolean,
        pending: boolean,
        permissions: string
    }
    public client: Client;
    public cache = new Map();
    constructor(client: Client) {
        this.id = "";
        this.token = "";
        this.data = {
            type: 1,
            name: "",
            id: "",
            options: []
        };
        this.members = {
            id: "",
            user: {
                id: "",
                username: "",
                discriminator: "",
                avatar: "",
                bot: false,
                system: false,
                mfa_enabled: false,
                locale: "",
                verified: false,
                email: "",
                flags: 0,
                premium_type: 0,
                public_flags: 0
            },
            roles: [],
            premium_since: "",
            deaf: false,
            mute: false,
            pending: false,
            permissions: ""
        }
        this.client = client;
    }
    public async reply(content: {
        type: number,
        data: {
            content: string,
            allowed_mentions: Record<string, unknown>,
            embeds: [],
            tts: boolean,
        }
    }) {
        return await axios(`https://discord.com/api/v10/interactions/${this.id}/${this.token}/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${this.client.options.token}`
            },
            data: JSON.stringify(content)
        });
    }

    public async fetch(id: string): Promise<Interaction> {
        return this.cache.get(id);
    }
}