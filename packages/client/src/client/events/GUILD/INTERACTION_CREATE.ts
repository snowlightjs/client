import { GatewayDispatchEvents } from "discord-api-types/v10";
import { EventBuilder } from "../../../types/Types";
import { Interaction } from "../../interface/Interaction";

export default new EventBuilder({
    name: "INTERACTION_CREATE",
    async run(payload, ws, client) {
        let interaction: Interaction = new Interaction(client);
        ws.debug(`Received INTERACTION_CREATE Gateway with integration id (${payload.d.id})`);
        Promise.resolve([
            interaction.id = payload.d.id,
            interaction.token = payload.d.token,
            interaction.data = payload.d.data,
        ]);
        return client.emit("InteractionCreate", interaction);
    },
});