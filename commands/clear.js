const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Je hebt geen perms om dit te doen!");

    if (!args[0]) return message.reply("Geef een aantal op!");

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] <= 0) {
                message.reply("Leuk geprobeert, maar ik kan geen 0 berichten verwijderen.").then(msg => msg.delete({ timeout: 3000 }));
            } else if (args[0] == 1) {
                message.reply("Ik heb 1 bericht verwijdert.").then(msg => msg.delete({ timeout: 3000 }));
            } else {
                message.reply(`Ik heb ${args[0]} berichten verwijdert.`).then(msg => msg.delete({ timeout: 3000 }));
            }

        })

    } else {
        return message.reply("Geef een aantal op!");
    }

}


module.exports.help = {
    name: "clear"
}