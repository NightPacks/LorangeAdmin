const discord = require("discord.js");
const botConfig = require("./botconfig.json");

// Command handler
const fs = require("fs")

const client = new discord.Client();

// Command handler
client.commands = new discord.Collection();


// Command handler
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("kon geen files vinden.");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`de file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);

    });

});


client.on("ready", async () => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity(";help", { type: "PLAYING" });

});

client.on('guildMemberAdd', member => {
    console.log('User @' + member.user.tag + ' has joined the server!');
    var role = member.guild.roles.cache.find(role => role.name == "Member");
    member.roles.add(role);
});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" "); 

    var command = messageArray[0];

// Command handler
    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);

});


client.login(process.env.token);
