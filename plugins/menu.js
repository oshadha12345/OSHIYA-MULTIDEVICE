const { cmd, commands } = require("../command");
const config = require('../config');

cmd(
  {
    pattern: "menu",
    react: "📂",
    alise: ["getmenu"],
    desc: "get cmd list",
    category: "main",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
          menu[
            commands[i].category
          ] += `${config.PREFIX}${commands[i].pattern}\n`;
        }
      }

      let madeMenu = `🔥 *𝐇𝐄𝐋𝐋𝐎 𝐔𝐒𝐄𝐑  ${pushname}*
╔═════𝙾𝚂𝙷𝙸𝚈𝙰-𝙼𝙳═════╮
║
║       𝐌𝐀𝐈𝐍  𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒  📂
║                                                      
║╞ 🛡️ .𝚊𝚕𝚒𝚟𝚎
║
║╞ 🛡️ .𝚖𝚎𝚗𝚞
║
║╞ 🛡️ .𝙰𝙸  [ 𝚃𝙴𝚇𝚃 ]
║
║╞ 🛡️ .𝚜𝚢𝚜𝚝𝚎𝚖
║
║╞ 🛡️ .𝚘𝚠𝚗𝚎𝚛
║
╠════════════════════╯
║     𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃  𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 🌐
║
║╞ 🛡️ .𝚜𝚘𝚗𝚐  [ 𝚃𝙴𝚇𝚃 ]
║
║╞ 🛡️ .𝚟𝚒𝚍𝚎𝚘 [ 𝚃𝙴𝚇𝚃 ]
║
║╞ 🛡️ .𝚏𝚋 [ 𝚃𝙴𝚇𝚃 ]
║
╠════════════════════╮
║     𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 👑
║
║╞ 🛡️ .𝚛𝚎𝚜𝚝𝚊𝚛𝚝
║
║╞ 🛡️ .𝚞𝚙𝚍𝚊𝚝𝚎
║
╠═════════════════════╯
║     𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ♻️
║
║╞ 🛡️ .𝚜𝚝𝚒𝚌𝚔𝚎𝚛 [ 𝚁𝙴𝙿𝙻𝚈 𝚈𝙾𝚄 𝙸𝙼𝙰𝙶𝙴 ]
║
║╞ 🛡️ .𝚒𝚖𝚐 [ 𝚁𝙴𝙿𝙻𝚈 𝚈𝙾𝚄𝚁 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 ]
║
║╞ 🛡️ .𝚝𝚛 [ 𝚕𝚊𝚗𝚐 ] [ 𝚃𝙴𝚇𝚃 ]
║
║╞ 🛡️ .𝚝𝚝𝚜 [ 𝚃𝙴𝚇𝚃 ]
║
╠═════════════════╯
║   𝐎𝐓𝐇𝐄𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 📚
╚═════════════════╯
`;
      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/bot_menu.png",
          },
          caption: madeMenu,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);
