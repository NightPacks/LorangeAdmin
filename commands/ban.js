const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, u heeft de juiste permissie niet!!!");

    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, u heeft de juiste permissie niet!!!");

    if(!args[1]) return message.reply("Geen gebruiker opgegeven!!!");

    if(!args[2]) return message.reply("Geen reden opgegeven!!!");

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var reason = args.slice(2, 3); 

    var days = args.slice(3);

    if(!banUser) return message.reply("Gebruiker niet gevonden!!!");

    var embedPrompt = new discord.MessageEmbed()
    .setColor("#282cad")
    .setTitle("Gelieve binnen 30 seconden antwoorden")
    .setDescription(`Wil je ${banUser} bannen?`);

    var embed = new discord.MessageEmbed()
        .setColor("#ba0404")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Gebanned: ** ${banUser} (${banUser.id})
        **Gebanned door:** ${message.author}
        **redenen:  ** ${reason} 
        **days:  ** ${days}`);

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if(emoji === "✅") {

            msg.delete();

            banUser.ban({reason, days: 5 }).catch(err => {
                if (err) return message.reply("Er is iets fout gegaan");
            });

            message.reply(embed);
            
        } else if(emoji === "❌"){

            msg.delete();
            
            message.reply("Ban geanuleerd!!!").then(m => m.delete(5000));

             }
        }); 
    }

async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, {max:1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
 }








module.exports.help = {
    name: "ban"
}