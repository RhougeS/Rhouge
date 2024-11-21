module.exports = {
  config: {
    name: "chance",
    aliases: ["joie"],
    version: "1.0",
    author: "Loid Butter",
    countDown: 10,
    role: 0,
    shortDescription: "Play Sicbo, the oldest gambling game",
    longDescription: "Play Chance, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <Small/Big> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["min", "max"].includes(betType)) {
      return message.reply("⚜🌹........................................ \n \n😠 | 𝑻𝒐𝒊 𝒍𝒂̀ 𝒎𝒆̂𝒎𝒆 𝒉𝒊𝒏 !!  𝑻𝒖 𝒂𝒔 𝑴𝒊𝒔  '𝒎𝒊𝒏'  𝒐𝒖  '𝒎𝒂𝒙'  𝒐𝒖̀ ? 😾\n \n  ⚜🌹......................................");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("⚜🌹........................................ \n \n ❌ |  𝑳𝒐𝒍.. 𝑻𝒖 𝑴𝒊𝒔𝒆𝒔 𝑸𝒖𝒐𝒊 𝒍𝒂̀ !? 🧐 𝑴𝒆𝒕𝒔 𝒖𝒏𝒆 𝑺𝒐𝒎𝒎𝒆 𝑺𝒖𝒑𝒆́𝒓𝒊𝒆𝒖𝒓𝒆 𝒐𝒖 𝑬́𝒈𝒂𝒍𝒆 𝒂̀ 50 😒 \n \n ⚜🌹......................................");
    }

    if (betAmount > userData.money) {
      return message.reply("⚜🌹........................................ \n \n ❌ |  𝑯𝒆𝒚, 𝑻𝒐𝒊 𝒍𝒂̀, 𝑻𝒖 𝑹𝒆̂𝒗𝒆𝒔 ? 𝑹𝒆𝒅𝒆𝒔𝒄𝒆𝒏𝒅𝒔 𝒔𝒖𝒓 𝑻𝒆𝒓𝒓𝒆 !! 😂 𝑻'𝒂𝒔 𝑷𝒂𝒔 𝑨𝒔𝒔𝒆𝒛 𝒅𝒆 𝑭𝒓𝒊𝒄 𝒑𝒐𝒖𝒓 𝒄𝒆 𝑷𝒂𝒓𝒊 🤣🤣. \n \n ⚜🌹......................................");
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
      const winAmount = 2 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(` ⚜🌹........................................ \n \n    ಢ‸ಢ  \n [ ${resultString} ] \n \n😾 | 𝐀𝐡 𝐓'𝐚𝐬 𝐆𝐚𝐠𝐧𝐞́  ${winAmount} $  🤦‍♂ \n 𝐅𝐞́𝐥𝐢𝐜𝐢𝐭𝐚𝐭𝐢𝐨𝐧𝐬 😒 \n \n ⚜🌹........................................`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(` ⚜🌹........................................ \n \n  ◎[▪‿▪]◎ \n    [ ${resultString} ]\n\n 𝒀𝑬𝑺..!! 😈  𝑻'𝒂𝒔 𝑷𝒆𝒓𝒅𝒖 ${betAmount} $. 🤣 \n 𝑪'𝒆𝒔𝒕 𝒕𝒓𝒆̀𝒔 𝑪𝒐𝒐𝒍 🤣🤣 \n \n ⚜🌹........................................ `);
    }
  }
};
