const { cmd } = require("../command");

cmd(
  {
    pattern: "setname",
    react: "🍁",
    desc: "Change bot's WhatsApp profile name.",
    category: "owner",
    use: "<new name>",
    filename: __filename,
  },
  async (oshiya, mek, m, { from, q, reply, isCreator }) => {
    try {
      // Owner නෙවෙයි නම් වැඩේ කරන්න දෙන්න එපා 🔒
      if (!isCreator) return reply("❌ *Sorry Owner Only Use Command*");

      if (!q) return reply("Piz Send Apply Name  (E.x: .setname OSHIYA MD V1)");

      // WhatsApp Profile Name එක update කරන logic එක
      await oshiya.updateProfileName(q);

      return reply(`✅ *Profile Name Updated!*\nNew Name: ${q}`);
      
    } catch (err) {
      console.error(err);
      reply("❌ නම වෙනස් කරන්න ගිය වෙලාවේ පොඩි error එකක් ආවා!");
    }
  }
);
