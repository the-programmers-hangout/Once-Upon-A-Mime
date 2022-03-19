import { Listener } from "@sapphire/framework";
import { client } from "../index.js";
import { checkMimeType } from "../services/mimeChecker.js";
import { uploadFile } from "../services/fileUploader.js";
import request from "request";
import fs from "fs";

export class MessageListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: false,
      event: "messageCreate",
    });
  }

  async run(message) {
    if (message.author.bot) return;

    // message.attachments is Collection<Snowflake, MessageAttachment>
    const attachments = Array.from(message.attachments.values());
    const msgChannel = message.channel;
    const author = message.author.id;

    // helpful for multiple attachments
    var canDeleteMessage = false;

    // loop through every attachment in message
    for (const attachment of attachments) {
      const fileName = attachment.name;
      const fileUrl = attachment.url;

      // check for mime type
      if (!(await checkMimeType(fileUrl))) {
        if (!attachment.contentType) {
          canDeleteMessage = true;
        } else {
          var mimeType = attachment.contentType.substring(
            0,
            attachment.contentType.indexOf(";")
          );
        }
      } else {
        var mimeType = (await checkMimeType(fileUrl)).mime;
      }

      // read configuration file
      const configFile = fs.readFileSync("./config.json", "utf-8");
      const config = JSON.parse(configFile);

      // handle guild which has not been setup
      if (!config[message.guildId]) {
        message.channel.send(
          "Bot not setup. Refer to: <https://github.com/DracTheDino/Mimey#readme>"
        );
        return;
      }

      const logChannel = config[message.guildId].logChannel;
      const whitelistedMimes = config[message.guildId].whitelist;
      const uploadableMimes = config[message.guildId].uploadableMimes;

      // check if mimeType is on the uploadableMimes list
      if (uploadableMimes.includes(mimeType)) {
        canDeleteMessage = true;

        request.get(fileUrl, function (error, response, body) {
          if (error) throw error;

          uploadFile(body).then((url) => {
            msgChannel.send(
              `Hey <@${author}>, your file \`${fileName}\` has been uploaded to Pastecord: ${url}`
            );
            client.channels.cache
              .get(logChannel)
              .send(
                `Deleted file \`${fileName}\` of type \`${mimeType}\` from user <@${author}> in <#${msgChannel.id}>. File uploaded to Pastecord: ${url}`
              );
          });
        });
      }
      // if that fails, check if its whitelisted
      else if (!whitelistedMimes.includes(mimeType)) {
        canDeleteMessage = true;

        msgChannel.send(
          `Hey <@${author}>, please don't upload \`${mimeType}\` files on this server.`
        );
        client.channels.cache
          .get(logChannel)
          .send(
            `Deleted file \`${fileName}\` of type \`${mimeType}\` from user <@${author}> in <#${msgChannel.id}>.`
          );
      }
    }

    // you had two chances, attachment, and if you failed both chances... forever begone!
    if (canDeleteMessage == true) {
      message.delete();
    }
  }
}
