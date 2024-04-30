# SnowLight.js
A simple way to make your discord bot with bluelight.js
Docs: https://docs.faystarnext.studio/bluelight/home
# Features
- Low Memory Usage
- Custom Cache System
- Fast Connect to Gateway
## Table of Contents
- [How to use](#how-to-use)
## Description
It's a raw connect gateway discord.
# How to use
- Discord Developer Portal: https://discord.com/developers/applications
1. Install the package
```bash
npm i snowlight.js | yarn add snowlight.js
```
2. Create a new file and paste the following code
```ts
import { Client } from "bluelight.js"
const client = new Client({
    intents: 1, // Intents: discord.com/developers/docs/topics/gateway#gateway-intents | https://discord-intents-calculator.vercel.app/
    token: "YOUR_BOT_TOKEN" // Your bot token
})
client.login(); // Connect to gateway
```
