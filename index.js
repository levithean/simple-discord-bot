
// récupère les var d'environnement (fichier .env)
require('dotenv').config();
const { Client, REST, Routes, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const {createEmbed} = require('./commands/infos_serv.js');

// liste des commandes (apparaît dans le menu de commandes de Discord)
const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Répond avec 'pong!'"),

    new SlashCommandBuilder()
        .setName('beep')
        .setDescription("Répond avec 'boop!'"),

    new SlashCommandBuilder()
        .setName('server')
        .setDescription('Renvoie des informations sur le serveur'),
].map(command => command.toJSON());

// créer l'instance REST avec le token
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// intents utilisés par le bot
const all_intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences
];

// créer une instance du bot
const client = new Client({
    intents: all_intents
});

// vérifie que les commandes sont bien affichées sur Discord
(async () => {
    try {
        console.log('Déploiement en cours...');

        // Enregistrer les commandes slash globales
        await rest.put(
            Routes.applicationCommands(process.env.ID), // Utilisation de l'ID de l'application
            {
                body: commands
            }
        );

        console.log('Commandes slash enregistrées avec succès!');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des commandes:', error);
    }
})();

// lorsque le bot est prêt
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);

    // activité du bot
    client.user.setPresence({

        activities: [
            {
                name: "J'aime regarder des animes 📺", // activité choisie
                type: 4 // 0 = jouer, 1 = streamer, 2 = écouter, 3 = regarder, 4 = personnalisé
            },
        ],
        status: 'online' // dnd = ne pas déranger, online = en ligne, idle = inactif, invisible = invisible
    });
});

// event lors de l'envoi d'une commande
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'beep') {
        await interaction.reply('Boop!');
    } else if (commandName === 'server') {
        const embed = createEmbed(interaction.guild); // paramètre serveur
        await interaction.reply({ embeds: [embed] }); // envoie l'embed
    }
});

// connexion du bot à Discord
client.login(process.env.TOKEN).catch(error => {
    console.error('Erreur lors de la connexion du bot:', error);
});