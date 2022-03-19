import { SubCommandPluginCommand } from "@sapphire/plugin-subcommands";
import fs from "fs";

export class Config extends SubCommandPluginCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      subCommands: [
        "addAdminRole",
        "removeAdminRole",
        "addMime",
        "removeMime",
        { input: "show", default: "true" },
      ],
    });
  }

  // This is low priority at the moment - please use config.json directly.
  // TODO: clean up this mess and generalize the logic
  /*
    async addAdminRole(message) {
        fs.readFile('./config.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                let config = JSON.parse(data);
                if (!config[message.guildId]) {
                    const obj = {
                        [`${message.guildId}`]: {
                            "adminRole": [],
                            "mimeBlacklist": []
                        }
                    }
                    
                }

                const adminRole = message.content.split(' ')[3];
                if (!adminRole) {
                    message.reply("No admin role provided.")
                    return;
                }
                config[message.guildId].adminRole.push(adminRole);
         
                const json = JSON.stringify(config);
         
                fs.writeFile('./config.json', json, 'utf8', function(err){
                    if(err){ 
                        console.log(err); 
                    } else {
                        message.reply("Admin role added.")
                    }
                });
            }
        });
    }

    async removeAdminRole(message) {
        fs.readFile('./config.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                const config = JSON.parse(data);
                const adminRoleArr = config[message.guildId].adminRole;
                const adminRoleToRemove = message.content.split(" ")[3];
                if (!adminRoleToRemove) {
                    message.reply("No admin role provided.");
                    return;
                }
                const index = adminRoleArr.indexOf(adminRoleToRemove);
                if (index > -1) {
                    adminRoleArr.splice(index, 1); 
                }
         
                const json = JSON.stringify(config);
         
                fs.writeFile('./config.json', json, 'utf8', function(err){
                    if(err){ 
                        console.log(err); 
                    } else {
                        message.reply("Admin role removed.")
                    }
                });
            }
        });
    }

    async addMime(message) {
        fs.readFile('./config.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                const config = JSON.parse(data);
                const mimeTypeToAdd = message.content.split(' ')[3];
                if (!mimeTypeToAdd) {
                    message.reply("No mime type provided.")
                    return;
                }
                config[message.guildId].mimeBlacklist.push(mimeTypeToAdd);
         
                const json = JSON.stringify(config);
         
                fs.writeFile('./config.json', json, 'utf8', function(err){
                    if(err){ 
                        console.log(err); 
                    } else {
                        message.reply("Mime type added.")
                    }
                });
            }
        });
    }

    async removeMime(message) {
        fs.readFile('./config.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                const config = JSON.parse(data);
                const mimeBlacklistArr = config[message.guildId].mimeBlacklist;
                const mimeTypeToRemove = message.content.split(" ")[3];
                if (!mimeTypeToRemove) {
                    message.reply("No mime type provided.");
                    return;
                }
                const index = mimeBlacklistArr.indexOf(mimeTypeToRemove);
                if (index > -1) {
                    mimeBlacklistArr.splice(index, 1); 
                }
         
                const json = JSON.stringify(config);
         
                fs.writeFile('./config.json', json, 'utf8', function(err){
                    if(err){ 
                        console.log(err); 
                    } else {
                        message.reply("Mime type removed.")
                    }
                });
            }
        });
    }

    async show(message) {
        fs.readFile('./config.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                const config = JSON.parse(data);

                const serverConfig = config[message.guildId];
                var adminString = "\n";
                var mimeString = "\n";

                for (const adminRoleItem of serverConfig.adminRole) {
                    adminString += `<@&${adminRoleItem}> `;
                }

                for (var i = 0; i < serverConfig.mimeBlacklist.length; i++) {
                    mimeString += `${serverConfig.mimeBlacklist[i]}\n`
                }
                
                message.reply(`**Admin roles:** ${adminString}\n**Blacklisted mimetypes:** \`\`\`${mimeString}\`\`\``);
            }
        });
    }
    */
}
