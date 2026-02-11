const { cmd, commands } = require("../command");
const config = require("../config");
const pkg = require("../package.json");
const { sendInteractiveMessage } = require("gifted-btns");

cmd(
{
pattern: "menu",
react: "📜",
desc: "Interactive menu",
category: "main",
filename: __filename,
},
async (danuwa, mek, m, { from, reply, pushname }) => {

try {


// 🎙️ Voice Message
await danuwa.sendMessage(
from,
{
audio: {
url: "https://github.com/oshadha12345/images/raw/refs/heads/main/Voice/Voce%20na%20mira%20(slowed_tiktok%20vers.)%20-%20hwungii_%20dj%20vjk1%20%5Bedit%20audio%5D(MP3_160K).mp3",
},
mimetype: "audio/mp4",
ptt: false,
},
{ quoted: mek }
);


// 📅 Date & Time
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();


// 📂 Category system
const categories = {};

for (let cmdName in commands) {

const cmdData = commands[cmdName];
const cat = cmdData.category?.toLowerCase() || "other";

if (!categories[cat]) categories[cat] = [];

categories[cat].push(cmdData.pattern);

}


// 📋 Emoji list
const emojis = ["🌚","💐","🔥","⚡","🎯","📌","💎","🚀","🧬","🎵"];

let i = 0;


// 📋 Build interactive sections
const sections = [];

for (const [cat, cmds] of Object.entries(categories)) {

sections.push({

title: `━❖ ${cat.toUpperCase()} ❖━`,

rows: cmds.map((pattern) => {

const emoji = emojis[i++ % emojis.length];

return {

id: `.${pattern}`,
title: `${emoji} .${pattern}`,
description: `Run .${pattern} command`

};

})

});

}


// 🤖 META ━ STYLE MENU TEXT
const menuText = `
╭━━━〔 🤖 OSHIYA MD MENU 〕━━━⬣
┃👤 User : ${pushname}
┃👨‍💻 Owner : ${config.OWNER_NAME}
┃🗓️ Date : ${date}
┃⌚ Time : ${time}
┃🧬 Version : ${pkg.version}
┃🛡️ Mode : ${config.MODE}
╰━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 📂 COMMAND LIST 〕━━━⬣
┃ Choose one item from below
╰━━━━━━━━━━━━━━━━━━⬣
`;


// 🎁 Interactive Menu (example format used)
await sendInteractiveMessage(danuwa, from, {
  text: 'Choose one item',
  interactiveButtons: [
    { name: 'single_select', buttonParamsJson: JSON.stringify({
        title: 'Menu',
        sections: [{
          title: 'Main',
          rows: [
            { id: '.ping', title: '💐', description: 'First choice' },
            { id: '.help, title: 'Second', description: 'Second choice' }
          ]
        }]
    }) }
  ]
});
} catch (err) {

console.log(err);

reply("❌ Menu error");

}

});
