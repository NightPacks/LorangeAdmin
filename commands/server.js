const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("Server Info")
    .setDescription("Info over de minecraft server")
    .setColor("#377530")
    .addFields(
        {name: "Minecraft", value:"IP mc01.egghosting.com:25589"},
        {name: "Hosting", value:"Egghosting"}
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/699914075483799624/859822511113240606/Lorange.png")
    .setFooter("copyright 2021", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1024px-Copyright.svg.png")
    .setTimestamp();  

return message.channel.send(botEmbed);
}




module.exports.help = {
    name: "server"
}