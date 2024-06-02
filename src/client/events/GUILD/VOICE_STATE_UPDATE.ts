import { GatewayDispatchEvents } from "discord-api-types/v10";
import { EventBuilder } from "../../../types/Types";

export default new EventBuilder({
    name: GatewayDispatchEvents.VoiceStateUpdate,
    async run(payload, ws, client) {
        ws.debug(`Received VOICE_STATE_UPDATE Gateway with voice state id (${payload.d.id})`);
        return client.emit("voiceStateUpdate", payload.d);
    },
})