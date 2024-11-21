module.exports = {
	config: {
			name: "bonjour",
			version: "1.0",
			author: "𝐍𝐨𝐫𝐚'𝐬 𝐋𝐨𝐫𝐝",
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
	if (event.body && event.body.toLowerCase() == "bonjour") return message.reply("𝐁𝐨𝐧𝐣𝐨𝐮𝐫 ⚜️");
}
};
