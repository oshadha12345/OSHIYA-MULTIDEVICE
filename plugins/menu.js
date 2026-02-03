const { cmd, commands } = require("../command");
const config = require("../config");
const pkg = require("../package.json");

cmd(
  {
    pattern: "menu",
    react: "📜",
    desc: "Stylish menu with voice, image, buttons & ping",
    category: "main",
    filename: __filename,
  },
  async (danuwa, mek, m, { from, reply, pushname }) => {
    try {
      const start = Date.now(); // ping start

      // 🎙️ Voice message
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

      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();

      // 📂 Commands by category
      const categories = {};
      for (let cmdName in commands) {
        const cmdData = commands[cmdName];
        const cat = cmdData.category?.toLowerCase() || "other";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmdData.pattern);
      }

      const ping = Date.now() - start;

      // 📜 Menu text
      let menuText = `━❮❮ 『 *OSHIYA MD* 』 ❯❯━

👤 *User:* ${pushname}
👨‍💻 *Owner:* ${config.OWNER_NAME}
🗓️ *Date:* ${date}
⌚ *Time:* ${time}
🧬 *Version:* ${pkg.version}
🛡️ *Mode:* ${config.MODE}
📡 *Ping:* ${ping} ms

━❮❮ 『 *COMMAND LIST* 』 ❯❯━
`;

      for (const [cat, cmds] of Object.entries(categories)) {
        menuText += `\n━━━❮ *${cat.toUpperCase()}* ❯━━━\n`;
        cmds.forEach((pattern) => {
          menuText += `➤ .${pattern}\n`;
        });
      }

      // 🎁 Gifted / Native Buttons
      const buttons = [
        {
          buttonId: ".ping",
          buttonText: { displayText: "📡 PING" },
          type: 1,
        },
        {
          buttonId: ".alive",
          buttonText: { displayText: "🤖 ALIVE" },
          type: 1,
        },
        {
          buttonId: ".owner",
          buttonText: { displayText: "👨‍💻 OWNER" },
          type: 1,
        },
      ];

      // 🖼️ Image + Buttons menu
      await danuwa.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiya_md.png",
          },
          caption: menuText.trim(),
          buttons: buttons,
          headerType: 4,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363424190990486@newsletter",
              newsletter: "OSHIYA MD Channel",
              serverMessageId: 143,
            },
          },
        },
        { quoted: mek }
      );
    } catch (err) {
      console.error(err);
      reply("❌ Error generating menu.");
    }
  }
);