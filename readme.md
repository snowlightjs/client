# SnowLight.JS
A simple way to make your discord bot with bluelight.js
# Features
- Low Memory Usage
- Custom Cache System
- Fast Connect to Gateway
# Table of Contents
- [SnowLight.JS](#snowlightjs)
- [Features](#features)
- [Table of Contents](#table-of-contents)
  - [Description](#description)
- [How to use](#how-to-use)
## Description
It's a raw connect gateway discord.
# How to use
- Discord Developer Portal: https://discord.com/developers/applications
1. Install the package
```bash
npm install @snowlightjs/client | yarn add @snowlightjs/client | bun install @snowlightjs/client
```
2. Create a new file and paste the following code
```ts
// index.ts
import { Client } from "@snowlightjs/client";
 
const client = new Client({
    token: "YOUR_BOT_TOKEN", // Your bot token,
    api_version: "v10",
    intents: 1, // Intents: discord.com/developers/docs/topics/gateway#gateway-intents | https://discord-intents-calculator.vercel.app/
})
client.login(); // Connect to gateway
client.ws.on("debug", console.log);
client.on("ready", () => {
    console.log(`Logged in as ${client.user.username}`);
});
```