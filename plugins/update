const { cmd } = require("../command");

cmd(
  {
    pattern: "update",
    react: "💬",
    desc: "Announce upcoming updates.",
    category: "main",
    filename: __filename,
  },
  async (oshiya, mek, m, { from, reply }) => {
    try {
      // ලස්සනට හදපු Announcement එක
      const updateMsg = `
🚀 *OSHIYA MD WHATSAPP BOT* 🚀

📢 *ALL UPDATE COMING SOON...*

━━━━━━━━━━━━━━━━━━━━━
✨ *Stay Tuned for More Features!*
⚙️ *Better Speed & Performance*
🛡️ *New Security Tools*
━━━━━━━━━━━━━━━━━━━━━

*Powered by Oshadha Manuppriya* 👨‍💻`;

      // මැසේජ් එක යවනවා
      await oshiya.sendMessage(from, { 
        text: updateMsg,
        contextInfo: {
          externalAdReply: {
            title: "OSHIYA MD UPDATE CENTER",
            body: "The Future of WhatsApp Bots",
            thumbnailUrl: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiyaping.jpg", // මෙතනට ඔයාගේ Photo එකක ලින්ක් එකක් දාන්න
            sourceUrl: "https://whatsapp.com/channel/0029Vb7LPVyGk1FlVN1bPz43",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error showing update message.");
    }
  }
);
