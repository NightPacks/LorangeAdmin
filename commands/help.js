const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    try {
        
        var text = "**Lorange Admin** \n\n **__Commands__** \n !server - laat info over de minecraft server zien. \n !info - laat info over de discord server zien.";

        message.author.send(text);

        message.reply("Alle commands kan je vinden in je dm.");

    } catch (error) {
        message.reply("Er is iets fout gegaan!");
    }



}

module.exports.help = {
    name: "help"
}