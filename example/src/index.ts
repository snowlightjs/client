import { Client } from "@snowlightjs/client";
import "dotenv/config";

console.log(process.env.TOKEN);
const client = new Client({
    token: process.env.TOKEN,
    api_version: "v10",
    intents: 513,
});

client.on("ready", () => {
    console.log(`${client.user.username} ${process.memoryUsage().heapTotal / 1024 / 1024}MB`);
});
client.ws.on("debug", console.log);
client.login();