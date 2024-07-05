const axios = require('axios');
const fs = require('fs');
//const deku = require('deku-ai');

let fontEnabled = true;

function formatFont(text) { 
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
  };

  let formattedText = "";
  for (const char of text) {
    if (fontEnabled && char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports.config = {
    name: "aiv2",
    version: "1.0.0",
    role: 0,
    credits: "Modified",
    info: "EDUCATIONAL",
    usages: "[question]",
    cd: 0
};

module.exports.run = async function ({ chat, api, event, args, botname, admin, prefix, fonts }) {
    const uid = event.senderID;
    const info = await api.getUserInfo(event.senderID);
    //const name = info[event.senderID].name;
    const name = formatFont(info[event.senderID].name);
    const info1 = await api.getUserInfo(admin[0]);
    const name1 = info1[admin[0]].name;
    const tin = txt => fonts.thin(txt);

    const typer = args[0];
    const question = args.slice(1, args.length).join(" "), id = event.senderID

    const types = [
        "gpt4","gpt3","gpt4o","blackbox","claude", "wiegine", "godwin", "mistral", "yi-large", "atom", "meta", "linerva", "bing", "custom-ai"
        ];

    if (!typer||!question)
      return chat.reply(tin(`Available model:\n\natom \nbing \nblackbox \nclaude \ncustom-ai \ngpt3 \ngpt4 \ngpt4o \ngodwin \nlinerva \nmeta \nmistral \nwiegine \nyi-large\n\nUsage: aiv2 <model> <prompt>`, event.threadID, event.messageID));

    try {
       api.setMessageReaction("⏳", event.messageID, () => {}, true);
          const info1 = await new Promise(resolve => {
            api.sendMessage(`⏳ Please bear with me while I ponder your request...`, event.threadID, (err, info1) => {
        resolve(info1);
       }, event.messageID);
      });
        const type = typer.toLowerCase();
        const apiUrl = `https://markdevs69-1efde24ed4ea.herokuapp.com/gpt4?prompt=${question}&uid=${id}`;

        if (type == types[0]){
        const response = await axios.get(apiUrl);
        const answer = response.data.gpt4;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        chat.edit(`📦 𝙶𝙿𝚃4+ 𝙲𝙾𝙽𝚃𝙸𝙽𝚄𝙴𝚂 𝙰𝙸\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
        return;
        } else if (type == types[1]){
            const gpt3 = `https://markdevs69-1efde24ed4ea.herokuapp.com/gpt3?prompt=${question}&uid=${id}`;
            const response = await axios.get(gpt3);          
            const answer = response.data.gpt3;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        chat.edit(`📦 𝙶𝙿𝚃3+ 𝙲𝙾𝙽𝚃𝙸𝙽𝚄𝙴𝚂 𝙰𝙸\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
        return;
        } else if (type == types[2]){
        const response = await axios.get(`https://markdevs69-1efde24ed4ea.herokuapp.com/api/gpt4o?q=${question}`);
        const answer = response.data.response;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      chat.edit(`📦 𝙶𝙿𝚃4𝚘8𝚔 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});

       return;
        } else if (type == types[3]){

        const response = await axios.get(`https://markdevs69-1efde24ed4ea.herokuapp.com/api/box?query=${question}`);
        const answer = response.data.response;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      chat.edit(`📦 𝙱𝙻𝙰𝙲𝙺𝙱𝙾𝚇 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
            return;
        }
        else if (type == types[4]){
            const apiUrl = `https://hiroshi-rest-api.replit.app/ai/claude?ask=${question}`;

            const respons = await axios.get(apiUrl);
            const answer = respons.data.response;    api.setMessageReaction("✅", event.messageID, () => {}, true);
        chat.edit(`📦 𝙲𝙻𝙰𝚄𝙳𝙴 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
            return;
        }
        else if (type == types[5]){
             const apiUrl = "https://liaspark.chatbotcommunity.ltd/@unregistered/api/wiegine";

        const response = await axios.get(apiUrl, {
            params: {
                key: "j86bwkwo-8hako-12C",
                query: question
              }
       });
        const answer = response.data.message;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      chat.edit(`🤖 𝚆𝙸𝙴𝙶𝙸𝙽𝙴 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
            return;
        }
         else if (type == types[6]){
             const apiUrl = "https://liaspark.chatbotcommunity.ltd/@unregistered/api/godwinai";

        const response = await axios.get(apiUrl, {
            params: {
                key: "j86bwkwo-8hako-12C",
                query: question
              }
       });
        const answer = response.data.message;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      chat.edit(`🤖 𝙶𝙾𝙳𝚆𝙸𝙽 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
            return;
        } else if (type == types[7]){
               const apiUrl = `https://hiroshi-rest-api.replit.app/ai/mistral8x7B?ask=${question}`;
                const response = await axios.get(apiUrl);          
                const answer = response.data.response;
            api.setMessageReaction("✅", event.messageID, () => {}, true);
chat.edit(`📦 𝙼𝙸𝚂𝚃𝚁𝙰𝙻8𝚡7𝙱 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
             return;
             } else if (type == types[8]){
               const apiUrl = `https://hiroshi-rest-api.replit.app/ai/yi?ask=${question}`;
                const response = await axios.get(apiUrl);          
                const answer = response.data.response;
            api.setMessageReaction("✅", event.messageID, () => {}, true);
chat.edit(`📦 𝚈𝙸-𝙻𝙰𝚁𝙶𝙴 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
             return;
             } else if (type == types[9]){
            const apiUrl = `https://hiroshi-rest-api.replit.app/ai/mistral8x7B?ask=${question}`;
            const response = await axios.get(apiUrl);        
            const answer = response.data.response;           api.setMessageReaction("✅", event.messageID, () => {}, true);
chat.edit(`📦 𝙰𝚃𝙾𝙼-7𝙱 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
            return;
             } else if (type == types[10]){
            const apiUrl = `https://hiroshi-rest-api.replit.app/ai/llama?ask=${question}`;
            const response = await axios.get(apiUrl);        
            const answer = response.data.response;            api.setMessageReaction("✅", event.messageID, () => {}, true);
   chat.edit(`📦 𝙼𝙴𝚃𝙰-𝙰𝙸 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
            return;
    } else if (type == types[11]){
            const apiUrl = `https://joshweb.click/api/liner?q=${question}`;
            const response = await axios.get(apiUrl);        
            const answer = response.data.result;
                 api.setMessageReaction("✅", event.messageID, () => {}, true);
             chat.edit(`📦 𝙻𝙸𝙽𝙴𝚁𝚅𝙰 𝙿𝚁𝙾 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
             return;
                 } else if (type == types[12]){
            const apiUrl = `https://joshweb.click/bing?prompt=${question}`;
            const res = await axios.get(apiUrl);        
            //const answer = response.data.result;
                 api.setMessageReaction("✅", event.messageID, () => {}, true);
             chat.edit(`📦 𝙱𝙸𝙽𝙶 𝙼𝙾𝙳𝙴𝙻\n━━━━━━━━━━━━━━━━━━\n[${res.data.style}]: ${res.data.bing}\n━━━━━━━━━━━━━━━━━━\n👤 𝙰𝚜𝚔𝚎𝚍 𝚋𝚢: ${name}`, info1.messageID, () => {});
             return;
        } else if (type == types[13]) {
           const sitt = ["gpt-4",
    "gpt-4-0613",
    "gpt-4-32k",
    "gpt-4-0314",
    "gpt-4-32k-0314",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-16k-0613",
    "gpt-3.5-turbo-0301",
    "text-davinci-003",
    "text-davinci-002",
    "code-davinci-002",
    "gpt-3",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
    "davinci",
    "curie",
    "babbage",
    "ada",
    "babbage-002",
    "davinci-002"
    ];
            const ques = question.split(' ');
            const quesp = ques[0];
            const quespp = ques.slice(1, ques.length).join(" ");
            if (ques.length <= 1){
                chat.edit(`Invalid usage ${types[13]}.\n\nusage: ai custom-ai <model>\n\n${sitt.join("\n")}`, info1.messageID);
                return;
            }
            if (!sitt.includes(quesp)){
                api.setMessageReaction("❌", event.messageID, () => {}, true);
        chat.edit(`${quesp} does not exist!! Available custom model:${sitt.join("\n")}`, info1.messageID);

                return;
                }
            const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(quespp)}&model=${quesp}`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.setMessageReaction("✅", event.messageID, () => {}, true);
            chat.edit(`📦 𝙲𝚄𝚂𝚃𝙾𝙼𝙸𝚉𝙴𝙳 𝙰𝙸\n━━━━━━━━━━━━━━━━\n${generatedText}\n━━━━━━━━━━━━━━━━\n🌐 𝙼𝙾𝙳𝙴𝙻: ${quesp.toUpperCase()}`, info1.messageID);
    } else {
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        chat.edit("Something Went Wrong.", info1.messageID);
    }     
    } else {
            api.sendMessage(` ${type} does not exist!!\n\nThese are the available model: \n\n ${types.join("\n ")}`, event.threadID, event.messageID);
            return;
        }
    } catch (error) {
        console.error(error);
 api.setMessageReaction("❌", event.messageID, () => {}, true);
        api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
    }
};