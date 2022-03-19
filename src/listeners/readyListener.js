import { Listener } from "@sapphire/framework";

export class ReadyListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      event: "ready",
    });
  }

  run(client) {
    const { username, id } = client.user;
    this.container.logger.info(`Succesfully logged in as ${username} ${id}`);
  }
}
