const TIMEOUT_SECONDS = 120; // Game timeout duration in seconds, change as per need



// Initialize a Map to track ongoing fights by threadID

const ongoingFights = new Map();

// Initialize a Map to store game instances for each pair

const gameInstances = new Map();



module.exports = {

  config: {

    name: "combat",

    version: "1.0",

    author: "Shikaki",

    countDown: 10,

    role: 0,

    shortDescription: {

      vi: "",

      en: "𝐂𝐨𝐦𝐛𝐚𝐭𝐞𝐳 𝐚𝐯𝐞𝐜 𝐯𝐨𝐬 𝐚𝐦𝐢𝐬!",

    },

    longDescription: {

      vi: "",

      en: "𝐃𝐞𝐟𝐢𝐞𝐳 𝐯𝐨𝐬 𝐚𝐦𝐢𝐬 𝐝𝐚𝐧𝐬 𝐮𝐧 𝐜𝐨𝐦𝐛𝐚𝐭 𝐥𝐨𝐲𝐚𝐥 𝐞𝐭 𝐯𝐨𝐲𝐞𝐳 𝐪𝐮𝐢 𝐠𝐚𝐠𝐧𝐞!",

    },

    category: "fun",

    guide: "{prefix}fight @mention",

  },



  onStart: async function ({ event, message, api, usersData, args }) {

    const threadID = event.threadID;



    // Check if there's already an ongoing fight in this thread

    if (ongoingFights.has(threadID)) {

      return message.send("⚔ 𝐔𝐧 𝐜𝐨𝐦𝐛𝐚𝐭 𝐞𝐬𝐭 𝐝𝐞́𝐣𝐚̀t 𝐞𝐧 𝐜𝐨𝐮𝐫𝐬 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞.");

    }



    const mention = Object.keys(event.mentions);



    if (mention.length !== 1) {

      return message.send("🤔 𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐦𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐞𝐫 𝐮𝐧𝐞 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞 𝐚𝐯𝐞𝐜 𝐪𝐮𝐢 𝐜𝐨𝐦𝐦𝐞𝐧𝐜𝐞𝐫 𝐮𝐧 𝐜𝐨𝐦𝐛𝐚𝐭 ⚔ 🎮.");

    }



    const challengerID = event.senderID;

    const opponentID = mention[0];



    const challenger = await usersData.getName(challengerID);

    const opponent = await usersData.getName(opponentID);



    // Create a new fight instance for this pair

    const fight = {

      participants: [],

      currentPlayer: null,

      threadID: threadID,

      startTime: null, // Store the start time

    };



    fight.participants.push({

      id: challengerID,

      name: challenger,

      hp: 100, // Starting HP

    });

    fight.participants.push({

      id: opponentID,

      name: opponent,

      hp: 100, // Starting HP

    });



    // Create a new game instance for this pair

    const gameInstance = {

      fight: fight,

      lastAttack: null,

      lastPlayer: null,

      timeoutID: null, // Store the timeout ID

      turnMessageSent: false, // Keep track of whether the turn message was sent

    };



    // Randomly determine the starting player within the pair

    gameInstance.fight.currentPlayer = Math.random() < 0.5 ? challengerID : opponentID;



    // Add the game instance to the Map

    gameInstances.set(threadID, gameInstance);



    // Start the fight for this pair

    startFight(message, fight);



    // Start the timeout for this game

    startTimeout(threadID, message);

  },



  // Modify the onChat function as follows:

  onChat: async function ({ event, message }) {

    const threadID = event.threadID;



    // Find the ongoing fight for this thread

    const gameInstance = gameInstances.get(threadID);



    if (!gameInstance) return;



    const currentPlayerID = gameInstance.fight.currentPlayer;

    const currentPlayer = gameInstance.fight.participants.find(

      (p) => p.id === currentPlayerID

    );



    const attack = event.body.trim().toLowerCase();



    // Check if the message sender is one of the current players

    const isCurrentPlayer = event.senderID === currentPlayerID;



    // Check if the opponent has attacked already

    if (gameInstance.lastAttack !== null && !isCurrentPlayer) {

      // Inform the current player that it's their opponent's turn

      message.reply(`😒 𝐂'𝐞𝐬𝐭 𝐚𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐥𝐞 𝐭𝐨𝐮𝐫 𝐝𝐞 ${currentPlayer.name}'s 𝐕𝐨𝐮𝐬 𝐧𝐞 𝐩𝐨𝐮𝐯𝐞𝐳 𝐩𝐚𝐬 𝐚𝐭𝐭𝐚𝐪𝐮𝐞𝐫 𝐭𝐚𝐧𝐭 𝐪𝐮'𝐢𝐥𝐬 𝐧'𝐨𝐧𝐭 𝐩𝐚𝐬 𝐛𝐨𝐮𝐠é.`);

      return;

    }



    // Check if the opponent is trying to attack when it's not their turn

    if (!isCurrentPlayer && gameInstance.lastPlayer.id === event.senderID) {

      message.send(`👎 𝐂'𝐞𝐬𝐭 𝐚𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐥𝐞 𝐭𝐨𝐮𝐫 𝐝𝐞 ${currentPlayer.name}'s 𝐕𝐨𝐮𝐬 𝐧𝐞 𝐩𝐨𝐮𝐯𝐞𝐳 𝐩𝐚𝐬 𝐚𝐭𝐭𝐚𝐪𝐮𝐞𝐫 𝐭𝐚𝐧𝐭 𝐪𝐮'𝐢𝐥𝐬 𝐧'𝐨𝐧𝐭 𝐩𝐚𝐬 𝐟𝐚𝐢𝐭 𝐝𝐞 𝐦𝐨𝐮𝐯𝐞𝐦𝐞𝐧𝐭`);

      return;

    }



    // Check if the message sender is NOT one of the current players

    if (!isCurrentPlayer) {

      // If it's not the current player's turn, prepare the message for the opponent

      if (!gameInstance.turnMessageSent) {

        // Prepare the message, but don't send it yet

        const opponentName = gameInstance.fight.participants.find(p => p.id !== event.senderID).name;

        const turnMessage = `It's ${currentPlayer.name}'s turn.`;

        message.prepare(turnMessage, event.senderID);



        // Remember that the turn message has been sent

        gameInstance.turnMessageSent = true;

      }

      return;

    }



    // Check if the opponent dodged the attack

    if (attack === "forfait") {

      const forfeiter = currentPlayer.name;

      const opponent = gameInstance.fight.participants.find(

        (p) => p.id !== currentPlayerID

      ).name;

      message.send(`🏃𝐨𝐡𝐡  ${forfeiter} 𝐝𝐞́𝐜𝐥𝐚𝐫𝐞 𝐟𝐨𝐫𝐟𝐚𝐢𝐭! 𝐰𝐚𝐰𝐞  ${opponent} 𝐚̀ 𝐠𝐚𝐠𝐧𝐞́!`);

      endFight(threadID);

    } else if (["dégagé", "boxé", "giflé"].includes(attack)) {

      // Calculate damage (with 10% chance to miss)

      const damage = Math.random() < 0.1 ? 0 : Math.floor(Math.random() * 20 + 10);



      // Apply damage to the opponent

      const opponent = gameInstance.fight.participants.find((p) => p.id !== currentPlayerID);

      opponent.hp -= damage;



      // Display damage dealt message

      message.send(

        `🥊 ${currentPlayer.name} 𝐚𝐭𝐭𝐚𝐪𝐮𝐞 ${opponent.name} 𝐚𝐯𝐞𝐜 ${attack} 𝐞𝐭 𝐢𝐧𝐟𝐥𝐢𝐠𝐞 ${damage} 𝐝é𝐠â𝐭𝐬.\n\n𝐌𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐭, ${opponent.name} 𝐚 ${opponent.hp}  𝐇𝐏 𝐞𝐭  ${currentPlayer.name} 𝐚 ${currentPlayer.hp} 𝐇𝐩.`

      );



      // Check if the game is over

      if (opponent.hp <= 0) {

        const winner = currentPlayer.name;

        const loser = opponent.name;

        message.send(`⏰𝐋𝐞 𝐭𝐞𝐦𝐩𝐬 𝐞𝐬𝐭 é𝐜𝐨𝐮𝐥é ! 𝐋𝐞 𝐣𝐞𝐮 𝐞𝐬𝐭 𝐭𝐞𝐫𝐦𝐢𝐧é. 𝐄𝐭 𝐜'𝐞𝐬𝐭  ${winner} 𝐪𝐮𝐢 𝐚̀ 𝐠𝐚𝐠𝐧𝐞́. 𝐟𝐞́𝐥𝐢𝐜𝐢𝐭𝐚𝐭𝐢𝐨𝐧𝐬 𝐚̀ 𝐭𝐨𝐢🥳𝐜𝐡𝐚𝐦𝐩𝐢𝐨𝐧!   𝐄𝐭  ${loser} 𝐚̀ 𝐩𝐞𝐫𝐝𝐮🤣𝐝𝐮 𝐜𝐨𝐮𝐫𝐚𝐠𝐞.`);

        endFight(threadID);

      } else {

        // Switch turns within the pair

        gameInstance.fight.currentPlayer =

          currentPlayerID === gameInstance.fight.participants[0].id

            ? gameInstance.fight.participants[1].id

            : gameInstance.fight.participants[0].id;

        const newCurrentPlayer = gameInstance.fight.participants.find(p => p.id === gameInstance.fight.currentPlayer);



        // Update last attack and player

        gameInstance.lastAttack = attack;

        gameInstance.lastPlayer = currentPlayer;



        // Reset the turn message status

        gameInstance.turnMessageSent = false;



        // Display whose turn it is now

        message.send(`𝐂'𝐞𝐬𝐭 𝐚𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐥𝐞 𝐭𝐨𝐮𝐫 𝐝𝐞 ${newCurrentPlayer.name}'.`);

      }

    } else {

      message.reply(

        "❌ 𝐀𝐭𝐭𝐚𝐪𝐮𝐞 𝐯𝐚𝐥𝐢𝐝𝐞! 𝐮𝐭𝐢𝐥𝐬𝐞 dégagé, 'boxé, 'giflé, or 'forfait."

      );

    }

  },



};



// Function to start a fight

function startFight(message, fight) {

  ongoingFights.set(fight.threadID, fight);



  const currentPlayer = fight.participants.find(p => p.id === fight.currentPlayer);

  const opponent = fight.participants.find(p => p.id !== fight.currentPlayer);



  // List of available attacks

  const attackList = ["dégagé", "boxé", "giflé","forfait"];

  

  message.send(

    `${currentPlayer.name}  𝐚 𝐝é𝐟𝐢é ${opponent.name} 𝐞𝐧 𝐝𝐮𝐞𝐥!\n\n${currentPlayer.name} 𝐚 ${currentPlayer.hp} 𝐇𝐩 𝐞𝐭 ${opponent.name} 𝐚 ${opponent.hp} 𝐇𝐏.\n\n 𝐂'𝐞𝐬𝐭 𝐚𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐥𝐞 𝐭𝐨𝐮𝐫 𝐝𝐞  ${currentPlayer.name}' 𝐝𝐞 𝐣𝐨𝐮𝐞́.\n\n𝐀𝐭𝐭𝐚𝐪𝐮𝐞𝐬 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞𝐬: ${attackList.join(', ')}`

  );

}



// Function to start a timeout for a game

function startTimeout(threadID, message) {

  const timeoutID = setTimeout(() => {

    const gameInstance = gameInstances.get(threadID);

    if (gameInstance) {

      const currentPlayer = gameInstance.fight.participants.find(

        (p) => p.id === gameInstance.fight.currentPlayer

      );

      const opponent = gameInstance.fight.participants.find(

        (p) => p.id !== gameInstance.fight.currentPlayer

      );

      const winner = currentPlayer.hp > opponent.hp ? currentPlayer : opponent;

      const loser = currentPlayer.hp > opponent.hp ? opponent : currentPlayer;



      message.send(

        `⏰𝐋𝐞 𝐭𝐞𝐦𝐩𝐬 𝐞𝐬𝐭 é𝐜𝐨𝐮𝐥é! 𝐋𝐞 𝐣𝐞𝐮 𝐞𝐬𝐭 𝐭𝐞𝐫𝐦𝐢𝐧é. ${winner.name} 𝐚̀ 𝐩𝐥𝐮𝐬 𝐝𝐮 HP, 𝐝𝐨𝐧𝐜 ${winner.name} 𝐠𝐚𝐠𝐧𝐞!   𝐄𝐭  ${loser.name} 𝐚̀ 𝐩𝐞𝐫𝐝𝐮.`

      );



      // End the fight

      endFight(threadID);

    }

  }, TIMEOUT_SECONDS * 100000); // Convert seconds to milliseconds



  // Store the timeout ID in the game instance

  gameInstances.get(threadID).timeoutID = timeoutID;

}



// Function to end a fight and clean up

function endFight(threadID) {

  ongoingFights.delete(threadID);

  // Clear the timeout for this game

  const gameInstance = gameInstances.get(threadID);

  if (gameInstance && gameInstance.timeoutID) {

    clearTimeout(gameInstance.timeoutID);

  }

  // Remove the game instance for this thread

  gameInstances.delete(threadID);

                            }
