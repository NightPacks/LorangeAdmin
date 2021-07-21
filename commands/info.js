const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("Server Info")
    .setDescription("Info over de discord server")
    .setColor("#e36817")
    .addFields(
        {name: "Bot Name", value:client.user.username},
        {name: "Joined op", value: message.member.joinedAt},
        {name: "Members", value:message.guild.memberCount}
    )
    .setFooter("copyright 2021", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1024px-Copyright.svg.png")
    .setTimestamp(); 

return message.channel.send(botEmbed);
}


module.exports.help = {
    name: "info"
}