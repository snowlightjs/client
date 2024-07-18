import { EventBuilder } from "../../../types/Types";
import { Interaction } from "../../interface/Interaction";
import { GatewayInteractionCreateDispatch } from "discord-api-types/v10";

export default new EventBuilder({
    name: "INTERACTION_CREATE",
    async run(payload: GatewayInteractionCreateDispatch, ws, client): Promise<void> {
        const interaction = new Interaction(client);
        ws.debug(`Received INTERACTION_CREATE Gateway with integration id (${payload.d.id})`);
        interaction.id = payload.d.id;
        interaction.token = payload.d.token;
        interaction.data = payload.d.data as { type: number; name: string; id: string; options: [] };
        client.emit("InteractionCreate", interaction);
    },
});