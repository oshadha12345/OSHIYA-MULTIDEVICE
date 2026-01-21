const { cmd } = require("../command");
const fs = require("fs");
const { sendButtons } = require("gifted-btns");


cmd(
  {
    pattern: "alive",
    react: "🧬",
    desc: "Alive check",
    category: "main",
    filename: __filename,
  },
  async (oshiya, mek, m, { from, pushname }) => {
    try {

      // Date & Time
      const now = new Date();
      const date = now.toLocaleDateString("en-GB");
      const time = now.toLocaleTimeString("en-GB");

      // 🎤 1. VOICE MESSAGE (FIRST)
      await oshiya.sendMessage(from, {
        audio: {
          url: "https://github.com/oshadha12345/images/raw/refs/heads/main/Voice/Funk%20criminal%20(slowed)%20-%20icedmane_%20dysmane%20%5Bedit%20audio%5D(MP3_160K).mp3"
        },
        mimetype: "audio/mpeg",
        ptt: true
      });

      // Alive Text
      const aliveMsg = `
╭━━━〔 🤖 ALIVE STATUS 〕━━━╮
┃ 👤 User : ${pushname}
┃ 📅 Date : ${date}
┃ ⏰ Time : ${time}
┃ ⚡ Status : ONLINE
╰━━━━━━━━━━━━━━━━━━━━╯
`;

      // 🖼️ 2. IMAGE + WHATSAPP BUTTONS
      await oshiya.sendMessage(from, {
        image: {
          url: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiyaping.jpg"
        },
        caption: aliveMsg,
        buttons: [
          {
            buttonId: "menu",
            buttonText: { displayText: "📜 MENU" },
            type: 1
          },
          {
            buttonId: "ping",
            buttonText: { displayText: "📡 PING" },
            type: 1
          }
        ],
        headerType: 4
      });

    } catch (e) {
      console.log(e);
      await oshiya.sendMessage(from, { text: "❌ Alive plugin error!" });
    }
  }
);