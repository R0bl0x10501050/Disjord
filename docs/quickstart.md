!!! warning "Read Before Starting"
    If you do not have any experience with JavaScript/NodeJS, it is **recommended** that you learn the basic foundation of it before attempting to make a Discord bot.
    
=== "JavaScript"

    ``` js
    const Discord = require('disjord'); // Require the Disjord module
    const client = new Discord.Client(); // Create a new instance of the Disjord client
    
    client.on('ready', () => { // Listen for the bot to be ready
        console.log("Bot is ready!")
    })
    
    client.on('message_create', (message) => { // Listen for a new message
        if (message.content == "!ping") { // Check if the new message is "!ping"
            message.reply("pong") // If the new message is "!ping", then reply with "pong"
        }
    })
    
    client.login("TOKEN", () => { // Replace "TOKEN" with your bot token (found on https://discord.com/developers/applications)
        console.log("Bot is online!")
    })
    /*
    For those of you who know how to use ENVs, you can replace "TOKEN" with process.env.TOKEN
    and create an ENV named TOKEN with the bot token.
    */
    ```
    
And with that, you are all set to making your first bot! Have fun exploring the world of code and turning your bot ideas into a reality!
