 module.exports = {
  config: {
    name: "kings",
    aliases: ["kng"],
    version: "1.0",
    author: "Loid Butter | haitani du toman",
    countDown: 10,
    role: 0,
    shortDescription: "Play king, the oldest gambling game",
    longDescription: "Play king, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <saidyl> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["saidyl"].includes(betType)) {
      return message.reply("💥 | 𝐓𝐮 𝐚𝐬 𝐎𝐮𝐛𝐥𝐢𝐞́ 𝐝𝐞 𝐌𝐞𝐭𝐭𝐫𝐞   *𝐬𝐚𝐢𝐝𝐲𝐥*");
    }

    if (!Number.isInteger(betAmount) || betAmount < 1000) {
      return message.reply("💥 | 𝐌𝐢𝐬𝐞 𝐮𝐧𝐞 𝐒𝐨𝐦𝐦𝐞 ≥ 𝐚̀ 1000");
    }

    if (betAmount > userData.money) {
      return message.reply("💥 | 𝐓'𝐚𝐬 𝐏𝐚𝐬 𝐚𝐬𝐬𝐞𝐳 𝐝𝐞 𝐅𝐫𝐢𝐜. 𝐕𝐚𝐬 𝐞𝐧 𝐂𝐡𝐞𝐫𝐜𝐡𝐞𝐫.");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 4 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`🌊❄ 𝑪𝑶𝑪𝒀𝑻𝑼𝑺 ❄🌊\n_________________\n💙[ ${resultString} ]💙\n🎉 | 𝑭𝑬𝑳𝑰𝑪𝑰𝑻𝑨𝑻𝑰𝑶𝑵 𝑯𝑼𝑴𝑨𝑰𝑵🍷,𝑻𝑼 𝑹𝑬𝑴𝑷𝑶𝑹𝑻𝑬 🎀${winAmount}€🎀 😶`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`🌊❄ 𝑪𝑶𝑪𝒀𝑻𝑼𝑺 ❄🌊\n_____________________\n😈[ ${resultString} ]😈\n😷 | 𝑻𝑼 𝑷𝑬𝑹𝑫𝑺 𝑱𝑼𝑺𝑻𝑬 🌾${betAmount}€🌾 𝑹𝑰𝑬𝑵 𝑫𝑬 𝑮𝑹𝑨𝑽𝑬👌`);
    }
  }
};
