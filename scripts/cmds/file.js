 const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["61567641756782" ,"61556662494233"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("💢|• T'as Pas le Droit d'utiliser cette cmd", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("𝚕𝚎 𝚏𝚒𝚌𝚑𝚒𝚎𝚛 ?? ಠωಠ.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`✯ 𝑗𝑒 𝑛𝑒 𝑡𝑟𝑜𝑢𝑣𝑒 𝑝𝑎𝑠 𝑐𝑒𝑡𝑡𝑒 𝑐𝑚𝑑 [✖]: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
