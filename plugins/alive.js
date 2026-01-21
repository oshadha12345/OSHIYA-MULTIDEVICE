const { cmd } = require("../command");
const config = require("../config");
const { sendButtons } = require("gifted-btns");

cmd(
  {
    pattern: "alive",
    react: "🧬",
    desc: "Check if the bot is active",
    category: "main",
    filename: __filename,
  },
  async (oshiya, mek, m, { from, pushname }) => {
    try {
      // User info
      const userName = pushname || "User";
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();

      // Message content
      const messageText = `💡 Hello ${userName}!\n🗓 Date: ${date}\n⏰ Time: ${time}\nBot is active ✅`;

      // Buttons
      const buttons = [
        { id: "menu", text: "Menu" },
        { id: "ping", text: "Ping" }
      ];

      // Send image with buttons
      await sendButtons(from, messageText, "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiyaping.jpg", buttons);

    } catch (err) {
      console.error(err);
      oshiya.sendMessage(from, { text: "❌ Error while sending alive message" });
    }
  }
);