import { Listener } from "@sapphire/framework";
import { client } from "../index.js";
import { checkMimeType } from "../services/mimeChecker.js";
import { uploadFile } from "../services/fileUploader.js";
import fs from "fs";
import fetch from "node-fetch";

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
    const content = message.content;

    // read configuration file
    const configFile = fs.readFileSync("./config.json", "utf-8");
    const config = JSON.parse(configFile);
    const logChannel = config[message.guildId].logChannel;
    const whitelistedMimes = config[message.guildId].whitelist;
    const uploadableMimes = config[message.guildId].uploadableMimes;

    // handle guild which has not been setup
    if (!config[message.guildId]) {
      message.channel.send(
        "Bot not setup. Refer to: <https://github.com/DracTheDino/Mimey#readme>"
      );
      return;
    }

    // helpful for multiple attachments
    var canDeleteMessage = false;

    const codeBlocks = content.match(/```[a-z0-9\s]{0,10}\n([\s\S]*?)```/gm);

    // loop through every attachment in message if there are any
    if (attachments.length >= 1) {
      let finalReplyMessage = [
        `Hey <@${author}>, your file(s) have been uploaded to Pastecord.`,
      ];
      // Check FIRST, before we loop through any files if message includes any code blocks at all.
      if (codeBlocks !== null) {
        let codeblocksToBeRemoved = [];
        for (const [index, block] of codeBlocks.entries()) {
          let codeArray = block.split("\n");
          codeblocksToBeRemoved.push(block);

          if (codeArray.length >= 20) {
            codeArray.splice(0, 1);
            const formattedCode = codeArray.join("\n");
            const url = await uploadFile(formattedCode);
            //const url = "Fake Upload"; //For dev purposes
            finalReplyMessage.push(`**Code snippet [${index + 1}]:** ${url}`);

            client.channels.cache
              .get(logChannel)
              .send(
                `Deleted large code block from user <@${author}> in <#${msgChannel.id}>. Uploaded to Pastecord: ${url}`
              );
          } else {
            const formattedCode = codeArray.join("\n");
            finalReplyMessage.push(
              `**Code snippet [${index + 1}]:** ${formattedCode}`
            );
          }
        }

        //if content before or after code block
        let finalMessageContent = content;
        for (const snippet of codeblocksToBeRemoved) {
          finalMessageContent = finalMessageContent.replace(snippet, "");
        }

        if (finalMessageContent.length > 1) {
          finalReplyMessage.push(
            `**Message text content:** \`\`\`\n${finalMessageContent}\`\`\``
          );
        }
      }

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

        // check if mimeType is on the uploadableMimes list
        if (uploadableMimes.includes(mimeType)) {
          canDeleteMessage = true;

          const response = await fetch(fileUrl);
          const body = await response.text();
          const url = await uploadFile(body);
          //const url = `${fileName}.uploaded`; //For dev purposes
          finalReplyMessage.push(`**${fileName}:** ${url}`);

          client.channels.cache
            .get(logChannel)
            .send(
              `Deleted file \`${fileName}\` of type \`${mimeType}\` from user <@${author}> in <#${msgChannel.id}>. Pastecord: ${url}`
            );
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

      if (finalReplyMessage.length > 1) {
        const fullReplyMessage = finalReplyMessage.join("\n");
        msgChannel.send({
          content: fullReplyMessage,
          allowedMentions: {
            users: [author],
          },
        });
      }
    }

    //Upload Code Snippet if the block is larger than 20 lines.
    if (attachments.length < 1 && codeBlocks !== null) {
      const logChannel = config[message.guildId].logChannel;
      let shouldSendMessage = false;
      let finalReplyMessage = [
        `Hey <@${author}>, your file(s) have been uploaded to Pastecord.`,
      ];

      let codeblocksToBeRemoved = [];
      for (const [index, block] of codeBlocks.entries()) {
        let codeArray = block.split("\n");
        codeblocksToBeRemoved.push(block);

        if (codeArray.length >= 20) {
          shouldSendMessage = true;
          codeArray.splice(0, 1);
          const formattedCode = codeArray.join("\n");
          const url = await uploadFile(formattedCode);
          //const url = "Fake Upload";  //For Dev purposes
          finalReplyMessage.push(`**Code snippet [${index + 1}]:** ${url}`);

          client.channels.cache
            .get(logChannel)
            .send(
              `Deleted large code block from user <@${author}> in <#${msgChannel.id}>. Uploaded to Pastecord: ${url}`
            );
          canDeleteMessage = true;
        } else {
          finalReplyMessage.push(`**Code snippet [${index + 1}]:**\n${block}`);
        }
      }

      //grab any other content than code blocks
      let finalMessageContent = content;
      for (const snippet of codeblocksToBeRemoved) {
        finalMessageContent = finalMessageContent.replace(snippet, "");
      }

      //Check there is anything other than code blocks to send back.
      if (finalMessageContent.length > 1) {
        finalReplyMessage.push(
          `**Message text content:** \`\`\`\n${finalMessageContent}\`\`\`\n`
        );
      }

      //If anything has been uploaded, this should be true and will reply.
      if (shouldSendMessage) {
        const fullReplyMessage = finalReplyMessage.join("\n");
        msgChannel.send({
          content: fullReplyMessage,
          allowedMentions: {
            users: [author],
          },
        });
      }
    }

    // you had two chances, attachment, and if you failed both chances... forever begone!
    if (canDeleteMessage == true || codeBlocks !== null) {
      message.delete();
    }
  }
}
