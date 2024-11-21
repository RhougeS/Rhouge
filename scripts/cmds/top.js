module.exports = {
 config: {
 name: "top",
 version: "1.0",
 author: "Loid Butter",
 role: 0,
 shortDescription: {
 en: " ༺ -𝕊𝔸𝕀𝔻𝕐𝕃 ༻ 𝑇𝑂𝑃 𝑅𝐼𝐶𝐻𝐸𝑆𝑇"
 },
 longDescription: {
 en: ""
 },
 category: "group",
 guide: {
 en: "{pn}"
 }
 },
 onStart: async function ({ api, args, message, event, usersData }) {
 const allUsers = await usersData.getAll();
 
 const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 50);
 
 const topUsersList = topUsers.map((user, index) => `🌹${index + 1}. ${user.name}: ${user.money}`);
 
 const messageText = ` ༺ -𝕊𝔸𝕀𝔻𝕐𝕃- ༻ 𝑇𝑂𝑃 𝑅𝐼𝐶𝐻𝐸𝑆𝑇 💰\n \n${topUsersList.join('\n')}`;
 
 message.reply(messageText);
 }
};
  
