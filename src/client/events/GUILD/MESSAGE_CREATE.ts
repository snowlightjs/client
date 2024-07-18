import { GatewayDispatchEvents, GatewayMessageCreateDispatchData, GatewayMessageCreateDispatch } from "discord-api-types/v10";
import { EventBuilder } from "../../../types/Types";

export default new EventBuilder({
    name: GatewayDispatchEvents.MessageCreate,
    async run(payload: GatewayMessageCreateDispatch, ws, client): Promise<void> {
        ws.debug(`Received MESSAGE_CREATE Gateway with message id (${payload.d.id})`);
        client.emit("MessageCreate", (payload.d) as GatewayMessageCreateDispatchData);
    },
})