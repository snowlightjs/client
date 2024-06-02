import { GatewayDispatchEvents } from "discord-api-types/v10";
import { EventBuilder } from "../../../types/Types";
import { Role } from "../../interface/Role";
import { Members } from "../../interface/Members";

export default new EventBuilder({
    name: GatewayDispatchEvents.GuildUpdate,
    async run(payload, ws, client) {
        Promise.resolve([
            client.guild.cache.set(payload.d.id, {
                id: payload.d.id,
                name: payload.d.name,
                icon: payload.d.icon,
                owner: payload.d.owner,
                permissions: payload.d.permissions,
                features: payload.d.features,
                permissions_new: payload.d.permissions_new,
            }),
            payload.d.members.forEach((member: Members) => {
                client.guild.members.cache.set(member.id, member);
            }),
            payload.d.roles.forEach((role: Role) => {
                client.guild.roles.cache.set(role.id, role);
            })
        ]);
        ws.debug(`Received GUILD_UPDATE Gateway with guild id (${(await client.guild.fetch(payload.d.id)).id})`);
        client.emit("guildCreate", client.guild.cache.get(payload.d.id));
        client.emit("raw", payload);
    },
});