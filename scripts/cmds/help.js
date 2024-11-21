const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "𝐒𝐀𝐈𝐃𝐘𝐋 \n╭───────╯•╰────────\n https://www.facebook.com/profile.php?id=61567641756782 \n╰───────╮•╭──────────\n";
/** 
* @author NTKhang
* @author: do not delete it
* @message if you delete or edit it you will get a global ban
*/

module.exports = {
	config: {
		name: "help",
		version: "1.17",
		author: "𝐍𝐨𝐫𝐚'𝐬 𝐋𝐨𝐫𝐝",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem cách dùng lệnh",
			en: "View command usage"
		},
		longDescription: {
			vi: "Xem cách sử dụng của các lệnh",
			en: "𝑽𝒐𝒊𝒓 𝒍𝒆𝒔 𝑪𝒎𝒅𝒔 𝒆𝒕 𝒍𝒆𝒖𝒓 𝑭𝒐𝒏𝒄𝒕𝒊𝒐𝒏𝒏𝒆𝒎𝒆𝒏𝒕"
		},
		category: "info",
		guide: {
			vi: "   {pn} [để trống | <số trang> | <tên lệnh>]"
				+ "\n   {pn} <command name> [-u | usage | -g | guide]: chỉ hiển thị phần hướng dẫn sử dụng lệnh"
				+ "\n   {pn} <command name> [-i | info]: chỉ hiển thị phần thông tin về lệnh"
				+ "\n   {pn} <command name> [-r | role]: chỉ hiển thị phần quyền hạn của lệnh"
				+ "\n   {pn} <command name> [-a | alias]: chỉ hiển thị phần tên viết tắt của lệnh",
			en: "{pn}: 𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 𝒍𝒆𝒔 𝑪𝒎𝒅𝒔."
				+ "\n   {pn} <𝑵𝒐𝒎 𝒅𝒆 𝒍𝒂 𝑪𝒎𝒅> [-u | usage | -g | guide]: 𝑨𝒇𝒇𝒊𝒄𝒉𝒆 𝒍𝒆 𝑴𝒐𝒅𝒆 𝒅'𝑼𝒔𝒂𝒈𝒆."
				+ "\n   {pn} <𝑵𝒐𝒎 𝒅𝒆 𝒍𝒂 𝑪𝒎𝒅> [-i | info]: 𝑨𝒇𝒇𝒊𝒄𝒉𝒆 𝒍𝒆𝒔 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏𝒔 𝒄𝒐𝒏𝒄𝒆𝒓𝒏𝒂𝒏𝒕 𝒍𝒂 𝑪𝒎𝒅."
				+ "\n   {pn} <𝑵𝒐𝒎 𝒅𝒆 𝒍𝒂 𝑪𝒎𝒅> [-r | role]: 𝑨𝒇𝒇𝒊𝒄𝒉𝒆 𝒍𝒆 𝑷𝒐𝒖𝒗𝒐𝒊𝒓 (0, 1, 2, .) [𝑺𝒊 𝒄'𝒆𝒔𝒕 𝑶𝒖𝒗𝒆𝒓𝒕 𝒂̀ 𝑻𝒐𝒖𝒕 𝒍𝒆 𝒎𝒐𝒏𝒅𝒆(0) 𝒐𝒖 𝒔𝒊 𝒄'𝒆𝒔𝒕 𝑹𝒆́𝒔𝒆𝒓𝒗𝒆́ 𝒂𝒖𝒙 𝑨𝒅𝒎𝒊𝒏𝒔(1 𝒆𝒕 2)."
				+ "\n   {pn} <𝑵𝒐𝒎 𝒅𝒆 𝒍𝒂 𝑪𝒎𝒅> [-a | alias]: 𝑨𝒇𝒇𝒊𝒄𝒉𝒆 𝒍𝒆𝒔 𝑨𝒖𝒕𝒓𝒆𝒔 𝑵𝒐𝒎𝒔."
		},
		priority: 1
	},

	langs: {
		vi: {
			help: " |I{•------» ✰...𝐒𝐀𝐈𝐃𝐘𝐋....✰ «------•}I| \n%1\n |I{•------» ✰...𝐒𝐀𝐈𝐃𝐘𝐋....✰ «------•}I| \n│ Trang [ %2/%3 ]\n│ Hiện tại bot có %4 lệnh có thể sử dụng\n│ » Gõ %5help <số trang> để xem danh sách các lệnh\n│ » Gõ %5help để xem chi tiết cách sử dụng lệnh đó\n |I{•------» ✰...𝐒𝐀𝐈𝐃𝐘𝐋....✰ «------•}I| \n│ %6\n |I{•------» ✰...𝐒𝐀𝐈𝐃𝐘𝐋....✰ «------•}I| ",
			help2: "%1├───────⭔\n➬❦....... » Hiện tại bot có %2 lệnh có thể sử dụng\n│ » Gõ %3help <tên lệnh> để xem chi tiết cách sử dụng lệnh đó\n│ %4\n╰─────────────⭓",
			commandNotFound: "Lệnh \"%1\" không tồn tại",
			getInfoCommand: "╭── NAME ────⭓\n│ %1\n❏❖❏❖❏❖ - ❖❏❖❏❖❏ INFO\n│ Mô tả: %2\n│ Các tên gọi khác: %3\n│ Các tên gọi khác trong nhóm bạn: %4\n│ Version: %5\n│ Role: %6\n│ Thời gian mỗi lần dùng lệnh: %7s\n│ Author: %8\n❏❖❏❖❏❖ - ❖❏❖❏❖❏ Usage\n│%9\n❏❖❏❖❏❖ - ❖❏❖❏❖❏ Notes\n│ Nội dung bên trong <XXXXX> là có thể thay đổi\n│ Nội dung bên trong [a|b|c] là a hoặc b hoặc c\n╰──────⭔",
			onlyInfo: "╭── INFO ────⭓\n│ Tên lệnh: %1\n│ Mô tả: %2\n│ Các tên gọi khác: %3\n│ Các tên gọi khác trong nhóm bạn: %4\n│ Version: %5\n│ Role: %6\n│ Thời gian mỗi lần dùng lệnh: %7s\n│ Author: %8\n╰─────────────⭓",
			onlyUsage: "╭── USAGE ────⭓\n│%1\n╰─────────────⭓",
			onlyAlias: "╭── ALIAS ────⭓\n│ Các tên gọi khác: %1\n│ Các tên gọi khác trong nhóm bạn: %2\n╰─────────────⭓",
			onlyRole: "╭── ROLE ────⭓\n│%1\n╰─────────────⭓",
			doNotHave: "Không có",
			roleText0: "0 (Tất cả người dùng)",
			roleText1: "1 (Quản trị viên nhóm)",
			roleText2: "2 (Admin bot)",
			roleText0setRole: "0 (set role, tất cả người dùng)",
			roleText1setRole: "1 (set role, quản trị viên nhóm)",
			pageNotFound: "Trang %1 không tồn tại"
		},
		en: {
			help: "╔═❃• 𝑺𝑨𝑰𝑫𝒀𝑳 •❃═╗\n──────────────────────\n \n %1\n \n──────────────────────\n ╚═❃• 𝑺𝑨𝑰𝑫𝒀𝑳 •❃═╝\n➳ 𝑷𝒂𝒈𝒆: [ %2/%3 ]\n➳𝑬𝑪𝑹𝑰𝑺  %5help <page> 𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 𝒍𝒆𝒔 𝑪𝒎𝒅𝒔 𝒔𝒖𝒓 𝒄𝒆𝒕𝒕𝒆 𝑷𝒂𝒈𝒆..💖\n➳𝑬𝑪𝑹𝑰𝑺  %5help <𝑵𝒐𝒎 𝒅𝒆 𝒍𝒂 𝑪𝒎𝒅>  𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 𝒔𝒐𝒏 𝑭𝒐𝒏𝒄𝒕𝒊𝒐𝒏𝒏𝒆𝒎𝒆𝒏𝒕..💖\n├────────⭔\n│ %6\n╰─────────────⭓",
			help2: "%1├───────⭔\n➳ 𝑬𝑪𝑹𝑰𝑺 %3help <𝑵𝒐𝒎 𝒅𝒆 𝒍𝒂 𝑪𝒎𝒅 >  𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 𝒄𝒐𝒎𝒎𝒆𝒏𝒕 𝑬𝒍𝒍𝒆 𝑭𝒐𝒏𝒄𝒕𝒊𝒐𝒏𝒏𝒆..💖│ %4\n╰─────────────⭓",
			commandNotFound: "𝑳𝒂 𝑪𝒎𝒅 \"%1\" 𝒏'𝑬𝒙𝒊𝒔𝒕𝒆 𝑷𝒂𝒔 😾",
			getInfoCommand: "╭── 𝑵𝑶𝑴 𝑫𝑬 𝑳𝑨 𝑪𝑴𝑫 ────⭓\n│ %1\n❏❖❏❖❏❖ - ❖❏❖❏❖❏ 𝑰𝑵𝑭𝑶\n│ 𝑫𝑬𝑺𝑪𝑹𝑰𝑷𝑻𝑰𝑶𝑵: %2\n│ 𝑫'𝑨𝑼𝑻𝑹𝑬𝑺 𝑵𝑶𝑴𝑺: %3\n│ 𝑫'𝑨𝑼𝑻𝑹𝑬𝑺 𝑵𝑶𝑴𝑺 𝑫𝑨𝑵𝑺 𝑪𝑬 𝑮𝑹𝑶𝑼𝑷𝑬: %4\n│ 𝑽𝑬𝑹𝑺𝑰𝑶𝑵: %5\n│ 𝑷𝑶𝑼𝑽𝑶𝑰𝑹 𝑫'𝑼𝑻𝑰𝑳𝑰𝑺𝑨𝑻𝑰𝑶𝑵: %6\n│ 𝑻𝒆𝒎𝒑𝒔 𝒅𝒆 𝒍𝒂 𝒓𝒆́𝒂𝒄𝒕𝒊𝒐𝒏 𝒅𝒆 𝒍𝒂 𝑪𝒎𝒅: %7𝒔\n│ 𝑪𝑹𝑬𝑨𝑻𝑬𝑼𝑹: %8\n \n𝑴𝑶𝑫𝑬 𝑫'𝑼𝑺𝑨𝑮𝑬: \n%9\n𝑹𝑬𝑴𝑨𝑹𝑸𝑼𝑬: \n🍁│ 𝑳𝒆 𝑪𝒐𝒏𝒕𝒆𝒏𝒖 𝒅𝒂𝒏𝒔 𝒍𝒆𝒔  <<XXXXX>> (𝑮𝒖𝒊𝒍𝒍𝒆𝒎𝒆𝒕𝒔) 𝒑𝒆𝒖𝒕 𝒆̂𝒕𝒓𝒆 𝑪𝒉𝒂𝒏𝒈𝒆́. 𝑬𝒕 𝒏𝒆 𝑴𝒆𝒕𝒕𝒆𝒛 𝑷𝒂𝒔 𝒍𝒆𝒔 𝑮𝒖𝒊𝒍𝒍𝒆𝒎𝒆𝒕𝒔 !!\n│ 𝑨𝒖 𝒏𝒊𝒗𝒆𝒂𝒖 𝒅𝒆 [[-|-|-]], 𝒄'𝒆𝒔𝒕 𝒖𝒏 𝑪𝒉𝒐𝒊𝒙 𝒂̀ 𝒇𝒂𝒊𝒓𝒆 𝒑𝒂𝒓𝒎𝒊 𝒍𝒆𝒔 𝑬́𝒍𝒆́𝒎𝒆𝒏𝒕𝒔 𝒒𝒖𝒊 𝒔𝒐𝒏𝒕 𝒅𝒂𝒏𝒔 𝒍𝒆𝒔 𝑪𝒓𝒐𝒄𝒉𝒆𝒕𝒔. 𝑬𝒕 𝒏𝒆 𝑴𝒆𝒕𝒕𝒆𝒛 𝒏𝒊 𝒍𝒆𝒔 𝑪𝒓𝒐𝒄𝒉𝒆𝒕𝒔 𝒏𝒊 𝒍𝒆𝒔 𝑩𝒂𝒓𝒓𝒆𝒔..!! \n╰──────⭔",
			onlyInfo: "╭── INFO ────⭓\n│ 𝑵𝑶𝑴 𝑫𝑬 𝑳𝑨 𝑪𝑴𝑫: %1\n│ 𝑫𝑬𝑺𝑪𝑹𝑰𝑷𝑻𝑰𝑶𝑵: %2\n│ 𝑫'𝑨𝑼𝑻𝑹𝑬𝑺 𝑵𝑶𝑴𝑺: %3\n│ 𝑫'𝑨𝑼𝑻𝑹𝑬𝑺 𝑵𝑶𝑴𝑺 𝑫𝑨𝑵𝑺 𝑳𝑬 𝑮𝑹𝑶𝑼𝑷𝑬: %4\n│ 𝑽𝑬𝑹𝑺𝑰𝑶𝑵: %5\n│ 𝑷𝑶𝑼𝑽𝑶𝑰𝑹 𝑫'𝑼𝑻𝑰𝑳𝑰𝑺𝑨𝑻𝑰𝑶𝑵: %6\n│ 𝑻𝒆𝒎𝒑𝒔 𝒅𝒆 𝑹𝒆́𝒂𝒄𝒕𝒊𝒐𝒏 𝒅𝒆 𝒍𝒂 𝑪𝒎𝒅: %7𝒔\n│ 𝑪𝑹𝑬𝑨𝑻𝑬𝑼𝑹: %8\n╰─────────────⭓",
			onlyUsage: "╭── USAGE ────⭓\n│%1\n╰─────────────⭓",
			onlyAlias: "╭── ALIAS ────⭓\n│ 𝑫'𝑨𝒖𝒕𝒓𝒆𝒔 𝑵𝒐𝒎𝒔: %1\n│ 𝑫'𝑨𝒖𝒕𝒓𝒆𝒔 𝑵𝒐𝒎𝒔 𝒅𝒂𝒏𝒔 𝒄𝒆 𝑮𝒓𝒐𝒖𝒑𝒆:  %2\n╰─────────────⭓",
			onlyRole: "╭── 𝑷𝑶𝑼𝑽𝑶𝑰𝑹 𝑫'𝑼𝑻𝑰𝑳𝑰𝑺𝑨𝑻𝑰𝑶𝑵 ────⭓\n│%1\n╰─────────────⭓",
			doNotHave: "𝑰𝒍 𝒏'𝒚 𝒆𝒏 𝒂 𝑷𝒂𝒔.",
			roleText0: "0 (𝑻𝒐𝒖𝒔 𝒍𝒆𝒔 𝑼𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒆𝒖𝒓𝒔)",
			roleText1: "1 (𝑳𝒆𝒔 𝑨𝒅𝒎𝒊𝒏𝒔 𝒅𝒖 𝑮𝒓𝒐𝒖𝒑𝒆)",
			roleText2: "2 (𝑳𝒆𝒔 𝑨𝒅𝒎𝒊𝒏𝒔 𝒅𝒖 𝑩𝒐𝒕)",
			roleText0setRole: "0 (set role, all users)",
			roleText1setRole: "1 (set role, group administrators)",
			pageNotFound: "𝑳𝒂 𝑷𝒂𝒈𝒆 『%1』 𝒒𝒖𝒆 𝑻𝒖 𝒗𝒆𝒖𝒙 𝒏'𝑬𝒙𝒊𝒔𝒕𝒆 𝑷𝒂𝒔 😾 "
		}
	},

	onStart: async function ({ message, args, event, threadsData, getLang, role }) {
		const langCode = await threadsData.get(event.threadID, "data.lang") || global.GoatBot.config.language;
		let customLang = {};
		const pathCustomLang = path.normalize(`${process.cwd()}/languages/cmds/${langCode}.js`);
		if (fs.existsSync(pathCustomLang))
			customLang = require(pathCustomLang);

		const { threadID } = event;
		const threadData = await threadsData.get(threadID);
		const prefix = getPrefix(threadID);
		let sortHelp = threadData.settings.sortHelp || "name";
		if (!["category", "name"].includes(sortHelp))
			sortHelp = "name";
		const commandName = (args[0] || "").toLowerCase();
		const command = commands.get(commandName) || commands.get(aliases.get(commandName));

		// ———————————————— LIST ALL COMMAND ——————————————— //
		if (!command && !args[0] || !isNaN(args[0])) {
			const arrayInfo = [];
			let msg = "";
			if (sortHelp == "name") {
				const page = parseInt(args[0]) || 1;
				const numberOfOnePage = 30;
				for (const [name, value] of commands) {
					if (value.config.role > 1 && role < value.config.role)
						continue;
					let describe = name;
					let shortDescription;
					const shortDescriptionCustomLang = customLang[name]?.shortDescription;
					if (shortDescriptionCustomLang != undefined)
						shortDescription = checkLangObject(shortDescriptionCustomLang, langCode);
					else if (value.config.shortDescription)
						shortDescription = checkLangObject(value.config.shortDescription, langCode);
					if (shortDescription)
						describe += `: ${cropContent(shortDescription.charAt(0).toUpperCase() + shortDescription.slice(1))}`;
					arrayInfo.push({
						data: describe,
						priority: value.priority || 0
					});
				}

				arrayInfo.sort((a, b) => a.data - b.data); // sort by name
				arrayInfo.sort((a, b) => a.priority > b.priority ? -1 : 1); // sort by priority
				const { allPage, totalPage } = global.utils.splitPage(arrayInfo, numberOfOnePage);
				if (page < 1 || page > totalPage)
					return message.reply(getLang("pageNotFound", page));

				const returnArray = allPage[page - 1] || [];
				const startNumber = (page - 1) * numberOfOnePage + 1;
				msg += (returnArray || []).reduce((text, item, index) => text += `☛...🌸${index + startNumber}${index + startNumber < 10 ? " " : ""}. ${item.data}\n`, '').slice(0, -1);
				await message.reply(getLang("help", msg, page, totalPage, commands.size, prefix, doNotDelete));
			}
			else if (sortHelp == "category") {
				for (const [, value] of commands) {
					if (value.config.role > 1 && role < value.config.role)
						continue; // if role of command > role of user => skip
					const indexCategory = arrayInfo.findIndex(item => (item.category || "NO CATEGORY") == (value.config.category?.toLowerCase() || "NO CATEGORY"));

					if (indexCategory != -1)
						arrayInfo[indexCategory].names.push(value.config.name);
					else
						arrayInfo.push({
							category: value.config.category.toLowerCase(),
							names: [value.config.name]
						});
				}
				arrayInfo.sort((a, b) => (a.category < b.category ? -1 : 1));
				arrayInfo.forEach((data, index) => {
					const categoryUpcase = `${index == 0 ? `╭` : ``}🌟 𝐓𝐘𝐏𝐄 𝐃𝐄 𝐂𝐌𝐃 ➮${data.category.toUpperCase()} ${index == 0 ? "⭓" : "...🌟"}`;
					data.names = data.names.sort().map(item => item = `✘...💝 ${item}`);
					msg += `${categoryUpcase}\n${data.names.join("\n")}\n`;
				});
				message.reply(getLang("help2", msg, commands.size, prefix, doNotDelete));
			}
		}
		// ———————————— COMMAND DOES NOT EXIST ———————————— //
		else if (!command && args[0]) {
			return message.reply(getLang("commandNotFound", args[0]));
		}
		// ————————————————— INFO COMMAND ————————————————— //
		else {
			const formSendMessage = {};
			const configCommand = command.config;

			let guide = configCommand.guide?.[langCode] || configCommand.guide?.["fr"];
			if (guide == undefined)
				guide = customLang[configCommand.name]?.guide?.[langCode] || customLang[configCommand.name]?.guide?.["en"];

			guide = guide || {
				body: ""
			};
			if (typeof guide == "string")
				guide = { body: guide };
			const guideBody = guide.body
				.replace(/\{prefix\}|\{p\}/g, prefix)
				.replace(/\{name\}|\{n\}/g, configCommand.name)
				.replace(/\{pn\}/g, prefix + configCommand.name);

			const aliasesString = configCommand.aliases ? configCommand.aliases.join(", ") : getLang("doNotHave");
			const aliasesThisGroup = threadData.data.aliases ? (threadData.data.aliases[configCommand.name] || []).join(", ") : getLang("doNotHave");

			let roleOfCommand = configCommand.role;
			let roleIsSet = false;
			if (threadData.data.setRole?.[configCommand.name]) {
				roleOfCommand = threadData.data.setRole[configCommand.name];
				roleIsSet = true;
			}

			const roleText = roleOfCommand == 0 ?
				(roleIsSet ? getLang("roleText0setRole") : getLang("roleText0")) :
				roleOfCommand == 1 ?
					(roleIsSet ? getLang("roleText1setRole") : getLang("roleText1")) :
					getLang("roleText2");

			const author = configCommand.author;
			const descriptionCustomLang = customLang[configCommand.name]?.longDescription;
			let description = checkLangObject(configCommand.longDescription, langCode);
			if (description == undefined)
				if (descriptionCustomLang != undefined)
					description = checkLangObject(descriptionCustomLang, langCode);
				else
					description = getLang("doNotHave");

			let sendWithAttachment = false; // check subcommand need send with attachment or not

			if (args[1]?.match(/^-g|guide|-u|usage$/)) {
				formSendMessage.body = getLang("onlyUsage", guideBody.split("\n").join("\n│"));
				sendWithAttachment = true;
			}
			else if (args[1]?.match(/^-a|alias|aliase|aliases$/))
				formSendMessage.body = getLang("onlyAlias", aliasesString, aliasesThisGroup);
			else if (args[1]?.match(/^-r|role$/))
				formSendMessage.body = getLang("onlyRole", roleText);
			else if (args[1]?.match(/^-i|info$/))
				formSendMessage.body = getLang("onlyInfo", configCommand.name, description, aliasesString, aliasesThisGroup, configCommand.version, roleText, configCommand.countDown || 1, author || "");
			else {
				formSendMessage.body = getLang("getInfoCommand", configCommand.name, description, aliasesString, aliasesThisGroup, configCommand.version, roleText, configCommand.countDown || 1, author || "", `${guideBody.split("\n").join("\n│")}`);
				sendWithAttachment = true;
			}

			if (sendWithAttachment && guide.attachment) {
				if (typeof guide.attachment == "object" && !Array.isArray(guide.attachment)) {
					const promises = [];
					formSendMessage.attachment = [];

					for (const keyPathFile in guide.attachment) {
						const pathFile = path.normalize(keyPathFile);

						if (!fs.existsSync(pathFile)) {
							const cutDirPath = path.dirname(pathFile).split(path.sep);
							for (let i = 0; i < cutDirPath.length; i++) {
								const pathCheck = `${cutDirPath.slice(0, i + 1).join(path.sep)}${path.sep}`; // create path
								if (!fs.existsSync(pathCheck))
									fs.mkdirSync(pathCheck); // create folder
							}
							const getFilePromise = axios.get(guide.attachment[keyPathFile], { responseType: 'arraybuffer' })
								.then(response => {
									fs.writeFileSync(pathFile, Buffer.from(response.data));
								});

							promises.push({
								pathFile,
								getFilePromise
							});
						}
						else {
							promises.push({
								pathFile,
								getFilePromise: Promise.resolve()
							});
						}
					}

					await Promise.all(promises.map(item => item.getFilePromise));
					for (const item of promises)
						formSendMessage.attachment.push(fs.createReadStream(item.pathFile));
				}
			}

			return message.reply(formSendMessage);
		}
	}
};

function checkLangObject(data, langCode) {
	if (typeof data == "string")
		return data;
	if (typeof data == "object" && !Array.isArray(data))
		return data[langCode] || data.en || undefined;
	return undefined;
}

function cropContent(content, max) {
	if (content.length > max) {
		content = content.slice(0, max - 3);
		content = content + "...";
	}
	return content;
   }
