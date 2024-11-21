module.exports = {
	config: {
			name: "bonsoir",
			version: "1.0",
			author: "messie OSANGO",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "bonsoir") return message.reply("𝐁𝐨𝐧𝐬𝐨𝐢𝐫 ⚜️");
}
};
