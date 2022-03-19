import { Events, Listener } from "@sapphire/framework";
import { client } from "./../index.js";

export class MentionListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: false,
      event: "messageCreate",
    });
  }

  async run(message) {
    if (message.author.bot) return;
    if (message.content.trim() === `<@!${client.user.id}>`) {
      // magically does the @bot embed
      const command = client.stores.get("commands").get("status");
      client.emit(Events.PreCommandRun, {
        message,
        command,
        parameters: "",
        context: { commandName: "status, commandPrefix, prefix" },
      });
    }
  }
}
