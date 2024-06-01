import { GatewayDispatchEvents } from "discord-api-types/v10";
import { EventBuilder } from "../../../types/Types";

export default new EventBuilder({
    name: GatewayDispatchEvents.Ready,
    async run(payload, ws, client) {
        Promise.resolve([
            client.user.username = payload.d.user.username + "#" + payload.d.user.discriminator,
            client.user.id = payload.d.user.id,
            client.user.discriminator = payload.d.user.discriminator,
            client.user.avatar = payload.d.user.avatar,
            client.user.bot = payload.d.user.bot,
            client.user.system = payload.d.user.system,
            client.user.mfaEnabled = payload.d.user.mfa_enabled,
            client.user.locale = payload.d.user.locale,
            client.user.verified = payload.d.user.verified,
            client.user.email = payload.d.user.email,
            ws.sessionId = payload.d.session_id,
            ws.debug(`Received READY Gateway with session id (${ws.sessionId})`),
            ws.isReady = true
        ])

        client.cache.set(payload.t, payload);
        client.emit("ready", payload);
    },
});