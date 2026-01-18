const { cmd } = require("../command");

// බොට්ගේ typing status එක store කරන්න variable එකක්
let alwaysTyping = false;

cmd(
  {
    pattern: "typing",
    react: "💬",
    desc: "Enable or disable always typing status.",
    category: "settings",
    use: "on/off",
    filename: __filename,
  },
  async (oshiya, mek, m, { from, q, reply, isCreator }) => {
    try {
      // Owner නෙවෙයි නම් කරන්න දෙන්න එපා 🔒
      if (!isCreator) return reply("❌ *Sorry User Command Avilable Owner Only*");

      if (q === "on") {
        alwaysTyping = true;
        reply("✅ *Always Typing Enabled!*");
      } else if (q === "off") {
        alwaysTyping = false;
        reply("👤 *Always Typing Disabled!*");
      } else {
        reply("*Use : .typing on/off*");
      }

    } catch (err) {
      console.error(err);
      reply("❌ Error එකක් ආවා!");
    }
  }
);

// මේක main logic එකට ඇඩ් කරන්න ඕන කෑල්ල (Events වලදී run වෙන්න)
// හැම මැසේජ් එකක්ම එනකොට බොට් 'composing' පෙන්වන්න:
oshiya.ev.on('messages.upsert', async (chatUpdate) => {
    if (alwaysTyping) {
        await oshiya.sendPresenceUpdate('composing', from);
    }
});
