const axios = require('axios');

module.exports.config = {
  name: "xiyu",
  version: "9",
  role: 0,
  hasPrefix: false,
  credits: "shiki",
  description: "AI powered by xiyu",
  aliases: ["ai"],
  cooldowns: 0,
};

module.exports.run = async function ({api, event, args}) {
  if (!args[0]) {
    api.sendMessage("Please provide a question.", event.threadID, event.messageID);
    return;
  }

  const text = encodeURIComponent(args.join(" "));
  const apiUrl = `https://xiyu.onrender.com/xiyu?question=${text}`;

  try {
    const response = await axios.get(apiUrl);
    const content = response.data; // Directly access the JSON response
    const answer = content.answer; // Access the "answer" property in the JSON

    api.sendMessage(answer, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
  }
};
