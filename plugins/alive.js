const { cmd } = require("../command");
const { default: makeWASocket } = require("@adiwajshing/baileys");
const { sendButton } = require("gifted-btns"); // gifted-btns import
const moment = require("moment");

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
      // 1️⃣ Date & Time
      const date = moment().format("YYYY-MM-DD");
      const time = moment().format("HH:mm:ss");

      // 2️⃣ Voice message
      const voiceUrl = "https://github.com/oshadha12345/images/raw/refs/heads/main/Voice/Funk%20criminal%20(slowed)%20-%20icedmane_%20dysmane%20%5Bedit%20audio%5D(MP3_160K).mp3";
      await oshiya.sendMessage(
        from,
        { audio: { url: voiceUrl }, mimetype: "audio/mp3" },
        { quoted: m }
      );

      // 3️⃣ Text message with image
      const textMsg = `👋 Hello ${pushname}!\n📅 Date: ${date}\n⏰ Time: ${time}\nBot is active ✅`;
      const imageUrl = "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiyaping.jpg";

      // 4️⃣ Gifted button
      const buttons = [
        {
          buttonId: "menu",
          buttonText: { displayText: "Menu" },
          type: 1,
        },
      ];

      await sendButton(oshiya, from, textMsg, imageUrl, buttons, m);

    } catch (err) {
      console.log("Alive plugin error:", err);
      await oshiya.sendMessage(from, { text: "❌ Something went wrong!" }, { quoted: m });
    }
  }
);