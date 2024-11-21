const { Client, Intents } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
  config: {
    name: 'sing',
    aliases: ["play", "music"],
    author: 'Arn',
    role: 0,
    category: 'music',
    shortDescription: 'Télécharge et joue des chansons depuis Internet',
  },
  onStart: async function ({ api, event, args }) {
    if (!args[0]) {
      api.sendMessage('Veuillez fournir un lien YouTube pour la chanson.', event.threadID, event.messageID);
      return;
    }

    const url = args[0];

    if (!ytdl.validateURL(url)) {
      api.sendMessage('Le lien fourni n\'est pas une URL YouTube valide.', event.threadID, event.messageID);
      return;
    }

    const voiceChannel = event.member.voice.channel;

    if (!voiceChannel) {
      api.sendMessage('Vous devez être dans un canal vocal pour utiliser cette commande.', event.threadID, event.messageID);
      return;
    }

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      const stream = ytdl(url, { filter: 'audioonly' });
      const resource = createAudioResource(stream);
      const player = createAudioPlayer();

      player.play(resource);
      connection.subscribe(player);

      api.sendMessage('🎵 Lecture de la chanson commencée !', event.threadID, event.messageID);
      
      player.on('idle', () => {
        connection.destroy();
      });
      
    } catch (error) {
      console.error(error);
      api.sendMessage('Une erreur s\'est produite lors de la tentative de lecture de la chanson.', event.threadID, event.messageID);
    }
  }
};
