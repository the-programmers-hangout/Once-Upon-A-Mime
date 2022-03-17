import {Listener} from '@sapphire/framework';
import {client} from '../index.js';
import {checkMimeType} from '../services/mimeChecker.js';
import {uploadFile} from '../services/fileUploader.js';
import request from 'request';
import fs from 'fs';

export class MessageListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            once: false,
            event: 'messageCreate'
        })
    }

    async run(message) {
        // message.attachments is Collection<Snowflake, MessageAttachment>
        const attachments = Array.from(message.attachments.values());
        
        for (const attachment of attachments) {
            const fileName = attachment.name;
            const fileUrl = attachment.url;
            console.log(fileUrl);
            // var mimeType = await (await checkMimeType(fileUrl)) === 'undefined' ? attachment.contentType.substring(0, mimeType.indexOf(';')) : (await checkMimeType(fileUrl)).mime;

            console.log(await checkMimeType(fileUrl))
            if (!(await checkMimeType(fileUrl))) {
                var mimeType = attachment.contentType.substring(0, attachment.contentType.indexOf(';'));
            } else {
                var mimeType = (await checkMimeType(fileUrl)).mime;
            }

            console.log(mimeType);

            fs.readFile('./config.json', function(err, data) {
                if (err) throw err;

                const config = JSON.parse(data);
                if (!config[message.guildId]) {
                    message.channel.send("Bot not setup. Refer to: <https://github.com/DracTheDino/Mimey#readme>");
                    return;
                }

                const logChannel = config[message.guildId].logChannel;
                const whitelistedMimes = config[message.guildId].whitelist;
                const uploadableMimes = config[message.guildId].uploadableMimes;
                console.log(whitelistedMimes);

                if (uploadableMimes.includes(mimeType)) {
                    const msgChannel = message.channel;
                    const author = message.author.id;
                    message.delete();

                    request.get(fileUrl, function(error, response, body) {
                        if (error) throw error;

                        const uploadedUrl = uploadFile(body).then(url => {
                            msgChannel.send(`Uploaded to Pastecord: ${url}`);
                            client.channels.cache.get(logChannel).send(`Deleted file \`${fileName}\` of type \`${mimeType}\` from user <@${author}> in <#${msgChannel.id}>. File uploaded to Pastecord: ${url}`);
                        });
                    })

                    return;
                }

                if (!whitelistedMimes.includes(mimeType)) {
                    const msgChannel = message.channel;
                    const author = message.author.id;
                    msgChannel.send(`Please don't upload that file type here. <@${author}>`)
                    message.delete().then(() => {
                        client.channels.cache.get(logChannel).send(`Deleted file \`${fileName}\` of type \`${mimeType}\` from user <@${author}> in <#${msgChannel.id}>.`)
                    });
                    return;
                }

                // if (whitelistedMimes.includes(mimeType) !== true) {
                //     message.delete()
                //         .then(msg => {
                //             client.channels.cache.get(logChannel).send(`Deleted file \`${fileName}\` of type \`${mimeType}\` from user <@${message.author.id}> in <#${message.channel.id}>.`)
                //         })
                //        .catch(console.error);
                // }

                // for (const whitelistedMime of whitelistedMimes) {
                //     if (mimeType !== whitelistedMime) {
                //         message.delete()
                //             .then(msg => {
                //                 client.channels.cache.get(logChannel).send(`Deleted file \`${fileName}\` of type \`${mimeType}\` from user <@${message.author.id}> in <#${message.channel.id}>.`)
                //             })
                //             .catch(console.error);
                //     }
                // }
            });
        }
    }
}