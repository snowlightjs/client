# BlueLight.JS
## Description
It's a raw connect gateway discord.
# How to use
```ts
import { Client } from "bluelight.js"
const client = new Client({
    intents: 1,
    token: "YOUR_BOT_TOKEN"
})
client.log();
client.on("ready", () => {
    console.log("Bot is ready!")
})
```
