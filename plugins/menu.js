const { cmd, commands } = require("../command");

cmd(
  {
    pattern: "menu",
    react: "📜",
    desc: "Displays all available commands with style",
    category: "main",
    filename: __filename,
  },
  async (danuwa, mek, m, { from, reply, pushname }) => {
    try {
      // 1. කලින්ම Voice Note එකක් යවනවා 🎙️
      await danuwa.sendMessage(from, { 
        audio: { url: 'https://github.com/oshadha12345/images/raw/refs/heads/main/Voice/Voce%20na%20mira%20(slowed_tiktok%20vers.)%20-%20hwungii_%20dj%20vjk1%20%5Bedit%20audio%5D(MP3_160K).mp3' }, // ඔයාගේ ඕනම voice link එකක් මෙතනට දාන්න
        mimetype: 'audio/mp4', 
        ptt: false
      }, { quoted: mek });

      const categories = {};
      for (let cmdName in commands) {
        const cmdData = commands[cmdName];
        const cat = cmdData.category?.toLowerCase() || "other";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmdData.pattern);
      }

      // 2. Menu එකේ ලස්සන Design එක ┃╯╰
      let menuText = `╭━━━━━━━『 *OSHIYA MD* 』━━━━━━━╮\n┃ ⚡ *Hi ${pushname}* \n┃ 🤖 *User:* ${pushname}\n┃ 🧬 *Version:* 1.0.0\n╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;

      for (const [cat, cmds] of Object.entries(categories)) {
        menuText += `╭━━━━━『 *${cat.toUpperCase()}* 』━━━━━╮\n`;
        cmds.forEach(pattern => {
          menuText += `┃  ┃╯╰  .${pattern}\n`;
        });
        menuText += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
      }

      // 3. Image එකත් එක්ක Menu එක යවනවා 🖼️
      await danuwa.sendMessage(from, {
        image: { url: 'https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiya_md.png' }, // මෙතනට ඔයාගේ Menu Image එකේ Link එක දාන්න
        caption: menuText.trim()
      }, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error generating stylish menu.");
    }
  }
);
