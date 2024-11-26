const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "spygc",
    version: "1.0",
    author: "Kshitiz",
    countDown: 5,
    role: 2,
    shortDescription: "Spy the group chats that bot is in.",
    longDescription: "",
    category: "box",
    guide: {
      en: "{p}{n} reply by number",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const a = await api.getThreadList(200, null, ['INBOX']);

      const b = a.filter(group => group.threadName !== null);

      if (b.length === 0) {
        api.sendMessage('No group chats found.', event.threadID);
      } else {
        const c = b.map((group, index) =>
          `│${index + 1}. ${group.threadName}\n│𝐓𝐈𝐃: ${group.threadID}`
        );
        const d = `⚜️...........❣𝐒𝐀𝐈𝐃𝐘𝐋❣............. \n \n╭─╮\n│𝐋𝐈𝐒𝐓𝐄 𝐃𝐄𝐒 𝐆𝐑𝐎𝐔𝐏𝐄𝐒\n${c.map(line => `✳️${line}`).join("\n")}\n╰───────────ꔪ`;

        const e = await api.sendMessage(d, event.threadID);
        global.GoatBot.onReply.set(e.messageID, {
          commandName: 'spygc',
          messageID: e.messageID,
          author: event.senderID,
          groupList: b,
        });
      }
    } catch (f) {
      console.error("𝑰𝒍 𝒚 𝒂 𝑬𝒓𝒓𝒆𝒖𝒓..", f);
    }
  },

  onReply: async function ({ api, event, Reply, args }) {
    const { author, commandName, groupList } = Reply;

    if (event.senderID !== author) {
      return;
    }

    const a = parseInt(args[0], 10);

    if (isNaN(a) || a <= 0) {
      api.sendMessage('𝑴𝒆𝒕𝒔 𝒖𝒏 𝑵𝒐𝒎𝒃𝒓𝒆 𝑽𝒂𝒍𝒊𝒅𝒆..!!.', event.threadID, event.messageID);
      return;
    }

    try {
      if (a > groupList.length) {
        api.sendMessage('𝑪𝒉𝒐𝒊𝒔𝒊𝒔 𝒖𝒏 𝑮𝒓𝒐𝒖𝒑𝒆 𝒑𝒂𝒓 𝒔𝒐𝒏 𝑵𝒐𝒎𝒃𝒓𝒆 𝒂̀ 𝑪𝒐̂𝒕𝒆́ 𝒅𝒆 𝑳𝒖𝒊 𝒔𝒖𝒓 𝒍𝒂 𝑳𝒊𝒔𝒕𝒆.', event.threadID, event.messageID);
        return;
      }

      const b = groupList[a - 1];
      const c = await api.getThreadInfo(b.threadID);

      let d = c.participantIDs.length;
      let e = 0;
      let f = 0;
      let g = '';
      let h = c.adminIDs;
      let i = c.adminIDs.length;
      let j = c.messageCount;
      let k = c.emoji;
      let l = c.threadName;
      let m = c.threadID;

      for (let n = 0; n < h.length; n++) {
        const o = (await api.getUserInfo(h[n].id));
        const p = o[h[n].id].name;
        g += '•' + p + '\n';
      }

      let q = c.approvalMode;
      let r = q == false ? '𝑫𝒆́𝒔𝒂𝒄𝒕𝒊𝒗𝒆́𝒆 ' : q == true ? '𝑨𝒄𝒕𝒊𝒗𝒊𝒕𝒆́𝒆 ' : 'Kh';

      const s = await this.getMemberNames(api, c.participantIDs);
      let t = s.join(" │ ");

      const u = `⚜️...........❣𝐒𝐀𝐈𝐃𝐘𝐋❣............. \n \n𝐍𝐎𝐌 𝐃𝐔 𝐆𝐑𝐎𝐔𝐏𝐄: ${l}\n𝐓𝐈𝐃 𝐃𝐔 𝐆𝐑𝐎𝐔𝐏𝐄: ${m}\n𝐀𝐏𝐏𝐑𝐎𝐁𝐀𝐓𝐈𝐎𝐍: ${r}\n 𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍 𝐑𝐀𝐏𝐈𝐃𝐄: ${k} \n𝐀𝐃𝐌𝐈𝐍𝐒: ${g}\n𝐇𝐎𝐌𝐌𝐄𝐒 : ${e}\n𝐅𝐄𝐌𝐌𝐄𝐒: ${f} \n𝐍𝐎𝐌𝐁𝐑𝐄 𝐃𝐄 𝐌𝐄𝐒𝐒𝐀𝐆𝐄: ${j} msgs.\n\n 𝐌𝐄𝐌𝐁𝐑𝐄𝐒\n${t}\n\n`;

      api.sendMessage(u, event.threadID, event.messageID);
    } catch (v) {
      console.error("Error", v);
      api.sendMessage('error', event.threadID, event.messageID);
    } finally {
      global.GoatBot.onReply.delete(event.messageID);
    }
  },

  getMemberNames: async function (api, participantIDs) {
    const a = [];
    for (const b of participantIDs) {
      try {
        const c = await api.getUserInfo(b);
        const d = c[b].name;
        a.push(d);
      } catch (e) {
        console.error(`Error fetching user info for participant ID: ${b}`, e);
        a.push(`[Error fetching user info for participant ID: ${b}]`);
      }
    }
    return a;
  },
};
