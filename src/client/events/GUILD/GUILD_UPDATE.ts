import { GatewayDispatchEvents } from "discord-api-types/v10";
import { EventBuilder } from "../../../types/Types";
import { Guild } from "../../interface/Guilds";

export default new EventBuilder({
    name: GatewayDispatchEvents.GuildUpdate,
    async run(payload: { d: Guild }, ws, client): Promise<void> {
        // Start fetching guild information in parallel
        const fetchGuildPromise = client.guild.fetch(payload.d.id);
        // Update guild cache
        client.guild.cache.set(payload.d.id, payload.d);
        // Await the previously started fetch operation
        const guild = await fetchGuildPromise;
        ws.debug(`Received GUILD_UPDATE Gateway with guild id (${guild.id})`);

        // Emit events after all updates are done
        client.emit("guildCreate", client.guild.cache.get(payload.d.id));
        client.emit("raw", String(payload));
    },
});