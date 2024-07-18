import { GatewayDispatchEvents, GatewayGuildCreateDispatch } from "discord-api-types/v10";
import { EventBuilder } from "../../../types/Types";
import { Guild } from "../../interface/Guilds";

export default new EventBuilder({
    name: GatewayDispatchEvents.GuildCreate,
    async run(payload: GatewayGuildCreateDispatch, ws, client): Promise<void> {
        Promise.all([
            client.guild.cache.set(payload.d.id, {
                id: payload.d.id,
                name: payload.d.name,
                icon: payload.d.icon,
                owner: payload.d.owner,
                permissions: payload.d.permissions,
                features: payload.d.features,
            } as unknown as Guild),
        ]);
        ws.debug(`Received GUILD_CREATE Gateway with guild id (${(await client.guild.fetch(payload.d.id)).id})`);
        client.emit("guildCreate", payload.d);
    },
});