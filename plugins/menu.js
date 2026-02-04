const { cmd, commands } = require("../command");
const config = require("../config");
const pkg = require("../package.json");
const { sendButtons } = require("gifted-btns");

cmd(
  {
    pattern: "menu",
    react: "📜",
    desc: "Stylish menu with gifted buttons",
    category: "main",
    filename: __filename,
  },
  async (danuwa, mek, m, { from, reply, pushname }) => {
    try {
      const start = Date.now();

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

      const ping = Date.now() - start;

      // 📜 Menu Text
      let menuText = `━❮❮ 『 *OSHIYA MD* 』 ❯❯━

👤 User : ${pushname}
👨‍💻 Owner : ${config.OWNER_NAME}
🗓️ Date : ${date}
⌚ Time : ${time}
🧬 Version : ${pkg.version}
🛡️ Mode : ${config.MODE}
📡 Ping : ${ping} ms

━❮❮ COMMAND LIST ❯❯━`;

      for (const [cat, cmds] of Object.entries(categories)) {
        menuText += `\n\n━━━❮ ${cat.toUpperCase()} ❯━━━\n`;
        cmds.forEach((pattern) => {
          menuText += `➤ .${pattern}\n`;
        });
      }

      // 🎁 Gifted Buttons
      await sendButtons(danuwa, from, {
        title: "🤖 OSHIYA MD MENU",
        text: menuText,
        footer: "´´´Select option below´´´",
        buttons: [
          {
            id: ".ping",
            text: "📡 Ping",
          },
          {
            id: ".alive",
            text: "🤖 Alive",
          },
          {
            id: ".help",
            text: "👨‍💻 Owner",
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "🌐 GitHub Repo",
              url: "https://github.com/oshadha12345/OSHIYA-MULTIDEVICE"
            })
          }
        ]
      });

    } catch (err) {
      console.log(err);
      reply("❌ Menu error");
    }
  }
);