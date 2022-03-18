import {Command} from "@sapphire/framework";
import {MessageEmbed} from 'discord.js';
import {intervalToDuration} from "date-fns";
import {client} from './../index.js';

export class Status extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'status',
            aliases: ['status'],
            description: 'Status of the bot'
        });
    }

    async messageRun(message) {
        const uptimeUnits = intervalToDuration({
            start: new Date().getTime() - client.uptime,
            end: new Date().getTime()
        });

        const developer = await client.users.fetch('448143136494190592');
        const repo = 'https://github.com/DracTheDino/Mimey';

        const embed = new MessageEmbed()
            .setColor('AQUA')
            .setTitle('Mimey')
            .setURL(repo)
            .setAuthor({
                name: developer.tag,
                iconURL: developer.avatarURL(),
                url: repo
            })
            .setDescription('File listener bot.')
            .setFields(
                {
                    name: 'Info',
                    value: `Repository: ${repo}
                    WebSocket Latency: ${client.ws.ping}ms`,
                    inline: false
                },
                {
                    name: 'Uptime',
                    value: `${uptimeUnits.months} months, ${uptimeUnits.days} days, ${uptimeUnits.hours} hours, ${uptimeUnits.minutes} minutes, ${uptimeUnits.seconds} seconds`,
                    inline: false,
                }
            );

        message.reply({embeds: [embed]});
    }
}