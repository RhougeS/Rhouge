const fs = require('fs');
const moment = require('moment-timezone');

// Liste des administrateurs du bot (ajustez cette liste selon vos besoins)
const botAdmins = ["61567641756782", "61555651722610", "61567674898453"]; // Remplacez par les vrais IDs des administrateurs

module.exports = {
  config: {
    name: "lord",
    aliases: ["aa"],
    version: "1.1",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "manage group admins or view group admin info"
    },
    longDescription: {
      vi: "",
      en: "add/remove a bot admin to/from the group or view information about group admins"
    },
    category: "admin",
    guide: {
      en: "{pn} <add|remove|info> <userID>"
    }
  },

  onStart: async function ({ api, event, args }) {
    // Vérifier si l'utilisateur est un administrateur du bot
    if (!botAdmins.includes(event.senderID)) {
      return api.sendMessage("❌ | You are not authorized to use this command.", event.threadID);
    }

    if (args.length === 0) {
      return api.sendMessage("⚠ | Please provide an action (add/remove/info) and optionally a userID.", event.threadID);
    }

    const action = args[0];
    const userID = args[1];
    const threadID = event.threadID;

    try {
      // Fetch thread info
      const threadInfo = await api.getThreadInfo(threadID);

      // Action: Add admin
      if (action === "add") {
        const adminIDs = threadInfo.adminIDs.map(admin => admin.id);

        if (!adminIDs.includes(api.getCurrentUserID())) {
          return api.sendMessage("❌ | The bot is not an admin of this group.", threadID);
        }

        await api.changeAdminStatus(threadID, userID, true);
        api.sendMessage("✅ | User has been successfully added as an admin.", threadID);
        api.setMessageReaction("💜", event.messageID, (err) => {
          if (err) console.error(err);
        });
      }
      // Action: Remove admin
      else if (action === "remove") {
        await api.changeAdminStatus(threadID, userID, false);
        api.sendMessage("✅ | User has been successfully removed as an admin.", threadID);
        api.setMessageReaction("💜", event.messageID, (err) => {
          if (err) console.error(err);
        });
      }
      // Action: Info
      else if (action === "info") {
        const adminIDs = threadInfo.adminIDs.map(admin => admin.id);

        let message = "👑 Group Admin Information:\n\n";
        for (const adminID of adminIDs) {
          try {
            const userInfo = await api.getUserInfo(adminID);
            const user = userInfo[adminID];

            const adminStats = threadInfo.userInfo.find(u => u.id === adminID);

            message += `🆔 UID: ${adminID}\n`;
            message += `👤 Name: ${user.name || "N/A"}\n`;
            message += `✉ Messages Sent: ${adminStats ? adminStats.messageCount : "N/A"}\n`;
            message += `🤝 Friends: ${user.friendCount || "N/A"}\n\n`;
          } catch (e) {
            console.error(`Error fetching user info for ${adminID}:`, e);
          }
        }

        api.sendMessage(message, threadID);
      }
      // Invalid action
      else {
        api.sendMessage("⚠ | Invalid action. Use 'add', 'remove', or 'info'.", threadID);
      }
    } catch (error) {
      api.sendMessage("❌ | An error occurred while processing the request.", threadID);
      console.error(error);
    }
  }
};
