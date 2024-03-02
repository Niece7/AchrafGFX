// Import necessary modules
const { Client, Intents, SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Create a new Discord client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Define the command data
const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    new SlashCommandBuilder().setName('hello').setDescription('Replies with Hello, world!'),
];

// Set up the interaction event listener
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'hello') {
        await interaction.reply('Hello, world!');
    }
});

// Set up the ready event listener
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Register the slash commands
    try {
        console.log('Started refreshing application (/) commands.');

        const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

// Log in to Discord with your app's token
client.login('token');
