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
            var mimeType = (await checkMimeType(fileUrl));
            if (!mimeType) {
                mimeType = attachment.contentType;
                const index = mimeType.indexOf(';');
                if (index != -1) {
                    mimeType = mimeType.substring(0, index);
                }
            }

            fs.readFile('./config.json', function(err, data) {
                if (err) throw err;

                const config = JSON.parse(data);
                const blacklistedMimes = config[message.guildId].blacklist;
                const logChannel = config[message.guildId].logChannel;
                const uploadableMimes = config[message.guildId].uploadableMimes;

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
                }

                for (const blacklistedMime of blacklistedMimes) {
                    if (mimeType === blacklistedMime) {
                        message.delete()
                            .then(msg => {
                                client.channels.cache.get(logChannel).send(`Deleted file \`${fileName}\` of type \`${mimeType}\` from user <@${message.author.id}> in <#${message.channel.id}>.`)
                            })
                            .catch(console.error);
                    }
                }
            });
        }
    }
}