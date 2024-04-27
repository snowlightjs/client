# BlueLight.JS
A simple way to make your discord bot with bluelight.js
# Features
- Low Memory Usage
- Custom Cache System
- Fast Connect to Gateway
## Description
It's a raw connect gateway discord.
Docs: https://docs.faystarnext.studio/
# How to use
- Discord Developer Portal: https://discord.com/developers/applications
1. Install the package
```bash
npm install bluelight.js | yarn add bluelight.js
```
2. Create a new file and paste the following code
```ts
import { Client } from "bluelight.js"
const client = new Client({
    intents: 1,
    token: "YOUR_BOT_TOKEN"
})
client.login();
client.on("ready", () => {
    console.log("Bot is ready!")
})
```