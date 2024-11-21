module.exports = {
	config: {
		name: "balance",
		aliases: ["bal"],
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "xem số tiền hiện có của bạn hoặc người được tag",
			en: "𝑪𝒐𝒏𝒔𝒖𝒍𝒆𝒓 𝒍𝒆 𝑷𝒐𝒓𝒕𝒆𝒇𝒆𝒖𝒊𝒍𝒍𝒆 :  𝑽𝒐𝒊𝒓 𝒍𝒂 𝑺𝒐𝒎𝒎𝒆 𝒅𝒊𝒔𝒑𝒐𝒏𝒊𝒃𝒍𝒆."
		},
		category: "economy",
		guide: {
			vi: "   {pn}: xem số tiền của bạn"
				+ "\n   {pn} <@tag>: xem số tiền của người được tag",
			en: "  𝑻𝒂𝒑𝒆:  \n    {pn}:  𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 𝒄𝒐𝒎𝒃𝒊𝒆𝒏 𝑻𝒖 𝑫𝒊𝒔𝒑𝒐𝒔𝒆𝒔 𝒅𝒂𝒏𝒔 𝒕𝒐𝒏 𝑷𝒐𝒓𝒕𝒆𝒇𝒆𝒖𝒊𝒍𝒍𝒆."
				+ "\n    {pn} <@𝑵𝒐𝒎 𝒅'𝒖𝒏 𝒖𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒆𝒖𝒓>:  𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 𝒍𝒂 𝑺𝒐𝒎𝒎𝒆 𝒒𝒖'𝒊𝒍 𝑫𝒊𝒔𝒑𝒐𝒔𝒆 𝒅𝒂𝒏𝒔 𝒔𝒐𝒏 𝑷𝒐𝒓𝒕𝒆𝒇𝒆𝒖𝒊𝒍𝒍𝒆."
		}
	},

	langs: {
		vi: {
			money: "Bạn đang có %1$",
			moneyOf: "%1 đang có %2$"
		},
		en: {
			money: "𝑻𝒖 𝒂𝒔  %1$  𝒅𝒂𝒏𝒔 𝑻𝒐𝒏 𝑷𝒐𝒓𝒕𝒆𝒇𝒆𝒖𝒊𝒍𝒍𝒆. 🙂",
			moneyOf: "%1 𝒂  %2$  𝒅𝒂𝒏𝒔 𝒔𝒐𝒏 𝑷𝒐𝒓𝒕𝒆𝒇𝒆𝒖𝒊𝒍𝒍𝒆.  🙃"
		}
	},

	onStart: async function ({ message, usersData, event, getLang }) {
		if (Object.keys(event.mentions).length > 0) {
			const uids = Object.keys(event.mentions);
			let msg = "";
			for (const uid of uids) {
				const userMoney = await usersData.get(uid, "money");
				msg += getLang("moneyOf", event.mentions[uid].replace("@", ""), userMoney) + '\n';
			}
			return message.reply(msg);
		}
		const userData = await usersData.get(event.senderID);
		message.reply(getLang("money", userData.money));
	}
};
