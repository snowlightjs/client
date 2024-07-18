import { GatewayDispatchEvents, GatewayVoiceStateUpdateDispatch } from "discord-api-types/v10";
import { EventBuilder } from "../../../types/Types";

export default new EventBuilder({
    name: GatewayDispatchEvents.VoiceStateUpdate,
    async run(payload: GatewayVoiceStateUpdateDispatch, ws, client): Promise<void> {
        ws.debug(`Received VOICE_STATE_UPDATE Gateway with voice state id (${payload.d.user_id})`);
        client.emit("voiceStateUpdate", payload);
    },
})