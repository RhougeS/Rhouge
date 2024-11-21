const { createReadStream, unlinkSync, createWriteStream } = require("fs-extra");
const { resolve } = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "say",
    aliases: ["tts"],
    version: "1.1",
    author: "JVB",
    countDown: 5,
    role: 0,
    shortDescription: {
      fr: "Conversion de texte en discours avec choix de la langue",
    },
    longDescription: {
      fr: "𝑪𝒐𝒏𝒗𝒆𝒓𝒕𝒊𝒓 𝒖𝒏 𝑻𝒆𝒙𝒕𝒆 𝒖𝒏 𝑴𝒆𝒔𝒔𝒂𝒈𝒆 𝑨𝒖𝒅𝒊𝒐.",
    },
    category: "chat vocal",
    guide: {
      fr: "#say [texte] : 𝑷𝒐𝒖𝒓 𝑪𝒐𝒏𝒗𝒆𝒓𝒕𝒊𝒓 𝒖𝒏 𝑻𝒆𝒙𝒕𝒆 𝒆𝒏 𝑴𝒆𝒔𝒔𝒂𝒈𝒆 𝑨𝒖𝒅𝒊𝒐.",
    },
  },

  onStart: async function ({ api, event, args, getLang }) {
    try {
      const msg = event.type === "message_reply" ? event.messageReply.body : args.join(" ");
      const path = resolve(__dirname, "cache", `${event.threadID}_${event.senderID}.mp3`);

      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=fr&client=tw-ob`;
      const response = await axios({
        method: "GET",
        url,
        responseType: "stream",
      });

      const writer = response.data.pipe(createWriteStream(path));
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      api.sendMessage(
        { attachment: createReadStream(path) },
        event.threadID,
        () => unlinkSync(path)
      );
    } catch (error) {
      console.error("Une erreur s'est produite lors de la conversion en discours :", error);
      // Gérer la réponse d'erreur ici, par exemple, envoyer un message d'erreur à l'utilisateur
    }
  },
};
