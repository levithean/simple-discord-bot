// importe la classe embed de discord.js
const{EmbedBuilder} = require('discord.js');

function createEmbed(server) {
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Informations sur le serveur') // en-tête de l'embed
        .setDescription('Quelques infos sur le serveur')
        .addFields(
            { name: 'Nom du serveur', value: `${server.name}`, inline: false }, // inline = retour à la ligne pour chaque texte
            { name: 'Nombre de membres', value: `${server.memberCount}`, inline: false },
            {name: 'Nombre de salons', value: `${server.channels.cache.size}`, inline: false},
            {name: 'Nombre de rôles', value: `${server.roles.cache.size}`, inline: false},
        )
        .setTimestamp() // affiche la date et l'heure de l'envoi du message
        .setFooter({ text: 'Fait par levithean' }); // pied de l'embed

    return embed;
}

module.exports = { createEmbed };