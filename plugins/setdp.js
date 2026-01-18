const { cmd } = require("../command");

cmd(
  {
    pattern: "setdp",
    react: "👤",
    desc: "Change bot's Profile Picture.",
    category: "owner",
    use: "<reply to image>",
    filename: __filename,
  },
  async (oshiya, mek, m, { from, reply, isCreator }) => {
    try {
      // Owner නෙවෙයි නම් කරන්න දෙන්න එපා 🔒
      if (!isCreator) return reply("❌ *Sorry User Owner Command Only*");

      // Image එකකට reply කරලා තියෙනවද බලනවා
      if (!m.quoted || !m.quoted.message.imageMessage) return reply("*Piz Reply Picture .setdp* 📸");

      const media = await oshiya.downloadAndSaveMediaMessage(m.quoted);

      // WhatsApp DP එක update කරනවා
      await oshiya.updateProfilePicture(oshiya.user.id, { url: media });

      return reply("✅ *Profile Picture Updated Successfully!* 🖼️✨");

    } catch (err) {
      console.error(err);
      reply("❌ DP එක වෙනස් කරන්න ගිය වෙලාවේ පොඩි අවුලක් ආවා!");
    }
  }
);
