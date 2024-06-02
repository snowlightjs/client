import { GatewayDispatchEvents } from "discord-api-types/v10";
import { EventBuilder } from "../../../types/Types";

export default new EventBuilder({
    name: GatewayDispatchEvents.MessageCreate,
    async run(payload, ws, client) {
        ws.debug(`Received MESSAGE_CREATE Gateway with message id (${payload.d.id})`);
        return client.emit("MessageCreate", payload.d);
    },
})