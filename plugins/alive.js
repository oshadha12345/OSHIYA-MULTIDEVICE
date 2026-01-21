const { cmd } = require("../command");
const { buttonsMessage } = require("gifted-btns");

cmd(
  {
    pattern: "alive",
    react: "🧬",
    desc: "Alive status",
    category: "main",
    filename: __filename,
  },
  async (client, mek, m, { from, pushname }) => {
    try {

      // Date & Time
      const now = new Date();
      const date = now.toLocaleDateString("en-US");
      const time = now.toLocaleTimeString("en-US");

      // Alive text
      const caption = `
🤖 *BOT IS ONLINE*

👤 *User* : ${pushname}
📅 *Date* : ${date}
⏰ *Time* : ${time}

⚡ Powered By Oshada
      `;

      // Image
      const image = {
        url: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiyaping.jpg"
      };

      // Buttons
      const buttons = [
        {
          index: 1,
          quickReplyButton: {
            displayText: "📋 MENU",
            id: "menu" // 👉 menu button eka click karama menu command eka yai
          }
        },
        {
          index: 2,
          urlButton: {
            displayText: "📲 WhatsApp",
            url: "https://wa.me/94756599952"
          }
        }
      ];

      // Send message
      await buttonsMessage(
        client,
        from,
        {
          image,
          caption,
          footer: "🧬 Alive Plugin",
          buttons,
          headerType: 4
        },
        mek
      );

    } catch (err) {
      console.log(err);
      await m.reply("❌ Alive plugin error");
    }
  }
);