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
      const ping = Date.now() - start;

      // 📂 Category system
      const categories = {};
      for (let cmdName in commands) {
        const cmdData = commands[cmdName];
        const cat = cmdData.category?.toLowerCase() || "other";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmdData.pattern);
      }

      // 📋 Build rows for interactive menu
      const sections = [];

      for (const [cat, cmds] of Object.entries(categories)) {
        sections.push({
          title: cat.toUpperCase(),
          rows: cmds.map((pattern) => ({
            id: `.${pattern}`,
            title: pattern,
            description: `Run ${pattern} command`
          }))
        });
      }

      const menuText = `🤖 *OSHIYA MD MENU*

👤 User : ${pushname}
👨‍💻 Owner : ${config.OWNER_NAME}
🗓️ Date : ${date}
⌚ Time : ${time}
🧬 Version : ${pkg.version}
🛡️ Mode : ${config.MODE}
📡 Ping : ${ping} ms

📜 Select a command below`;

      // 🎁 Interactive Message
      await sendInteractiveMessage(danuwa, from, {
        text: menuText,
        interactiveButtons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "📂 Command Menu",
              sections: sections
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