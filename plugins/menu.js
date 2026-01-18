const { cmd, commands } = require("../command");
const config = require("../config"); // Config එකෙන් OWNER_NUMBER ගන්නවා
const pkg = require("../package.json"); // package.json එකෙන් version එක ගන්නවා

cmd(
  {
    pattern: "menu",
    react: "📜",
    desc: "Stylish menu with auto voice, image and channel link.",
    category: "main",
    filename: __filename,
  },
  async (danuwa, mek, m, { from, reply, pushname }) => {
    try {
      // 1. කලින්ම Voice Message එකක් යවනවා 🎙️
      await danuwa.sendMessage(from, { 
        audio: { url: 'https://github.com/oshadha12345/images/raw/refs/heads/main/Voice/Voce%20na%20mira%20(slowed_tiktok%20vers.)%20-%20hwungii_%20dj%20vjk1%20%5Bedit%20audio%5D(MP3_160K).mp3' }, 
        mimetype: 'audio/mp4', 
        ptt: false
      }, { quoted: mek });

      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      const categories = {};

      for (let cmdName in commands) {
        const cmdData = commands[cmdName];
        const cat = cmdData.category?.toLowerCase() || "other";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmdData.pattern);
      }

      // 2. Stylish ━ Menu Design
      let menuText = `━❮❮ 『 *OSHIYA MD* 』 ❯❯━\n`;
      menuText += `┃ 👤 *User:* ${pushname}\n`;
      menuText += `┃ 👨‍💻 *Owner:* ${config.OWNER_NAME}\n`;
      menuText += `┃ 🗓️ *Date:* ${date}\n`;
      menuText += `┃ ⌚ *Time:* ${time}\n`;
      menuText += `┃ 🧬 *Version:* ${pkg.version}\n`;
      menuText += `┃ 🛡️ *MODE:* ${config.MODE}\n`;
      menuText += `━❮❮ 『 *COMMAND LIST* 』 ❯❯━\n\n`;

      for (const [cat, cmds] of Object.entries(categories)) {
        menuText += `━━━❮ *${cat.toUpperCase()}* ❯━━━\n`;
        cmds.forEach(pattern => {
          menuText += `┃ ┃━ .${pattern}\n`;
        });
        menuText += `━━━━━━━━━━━━━━━\n\n`;
      }

      // 3. Image එකත් එක්ක Menu එක Channel එකට Link කරලා යවනවා 🖼️
      await danuwa.sendMessage(from, {
        image: { url: 'https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiya_md.png' }, // ඔයාගේ ලස්සන image එකක් මෙතනට දාන්න
        caption: menuText.trim(),
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363424190990486@newsletter', // ඔයා දුන්න චැනල් එකේ ID එක
            newsletter: 'OSHIYA MD Channel',
            serverMessageId: 143
          }
        }
      }, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error generating stylish menu.");
    }
  }
);
