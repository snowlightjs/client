# BlueLight.JS
## Description
It's a raw connect gateway discord.
# How to use
```js
import websocket from "bluelight.js"
const client = new websocket({
    intents: 1,
    token: ""
})
client.connect();
client.on("raw", console.log)
```
