import { SapphireClient } from "@sapphire/framework";
import dotenv from "dotenv";
dotenv.config();

export const client = new SapphireClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  defaultPrefix: null,
});

client.login(process.env.TOKEN);
