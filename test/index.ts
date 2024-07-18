import { Client, DiscordClientStatus } from '../src/'

const client = new Client({
    token: process.env.TOKEN,
    api_version: "v10",
    intents: 513,
    presence: {
        activities: {
            name: "discord",
            type: 0,
            url: "https://discord.com"
        },
        status: DiscordClientStatus.idle
    },
    shard: {
        shardCount: 1,
        totalShards: 0
    }
});

client.on("ready", (d) => {
    console.log(client.user.username + " " + (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "MB");
});
// client.on("debug", console.log);
// client.ws.on("debug", console.log);
// client.ws.on("raw", console.log);

client.login();
