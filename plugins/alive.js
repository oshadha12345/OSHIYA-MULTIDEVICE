const { cmd } = require("../command");
const config = require("../config");
const os = require("os");
const { sendButtons } = require("gifted-btns");


cmd(
  {
    pattern: "alive",
    react: "🧬",
    desc: "Check if the bot is active.",
    category: "main",
    filename: __filename,
  },
  async (oshiya, mek, m, { from, pushname }) => {
    try {
      // 1. කලින්ම Voice Message එකක් යවනවා 🎙️
      await oshiya.sendMessage(from, { 
        audio: { url: 'https://github.com/oshadha12345/images/raw/refs/heads/main/Voice/Funk%20criminal%20(slowed)%20-%20icedmane_%20dysmane%20%5Bedit%20audio%5D(MP3_160K).mp3' }, 
        mimetype: 'audio/mp4', 
        ptt: false
      }, { quoted: mek });

      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      const host = os.hostname(); // Host එක ගන්නවා (Heroku/Koyeb/VPS)

      // 2. ━━ Style Alive Design
      let aliveText = `━━❮❮ 『 *OSHIYA ALIVE* 』 ❯❯━━\n\n`;
      aliveText += `┃ 👤 *User:* ${pushname}\n`;
      aliveText += `┃ 👨‍💻 *Owner:* ${config.OWNER_NAME}\n`;
      aliveText += `┃ 🗓️ *Date:* ${date}\n`;
      aliveText += `┃ ⌚ *Time:* ${time}\n`;
      aliveText += `┃ 🖥️ *Host:* ${host}\n\n`;
      aliveText += `┃ *Status:* ✅ Active\n`;
      aliveText += `━━━━━━━━━━━━━━━━━━━━`;

      const aliveImage = 'https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg'; // ඔයාගේ Image Link එක මෙතනට දාන්න

      // 3. Image එකත් එක්ක Alive Message එක යවනවා 🖼️
      await oshiya.sendMessage(from, {
        image: { url: aliveImage },
        caption: aliveText,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363424190990486@newsletter', 
            newsletterName: 'Oshiya MD Alive Status',
            serverMessageId: 143
          }
        }
      }, { quoted: mek });

// 3. Buttons යැවීම
            const buttons = [
                { id: prefix + "ping", text: "⚡ PING" },
                { id: prefix + "menu", text: "📜 MENU" },
                { id: prefix + "settings", text: "⚙️ SETTINGS" },
                { id: prefix + "help", text: "📞 HELP" },
            ];


    } catch (err) {
      console.error(err);
    }
  }
);