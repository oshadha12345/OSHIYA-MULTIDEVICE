const { readEnv } = require("../lib/database");
const { cmd, commands } = require("../command");

cmd(
  {
    pattern: "menu",
    alise: ["getmenu"],
    react:"📂",
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
      const config = await readEnv();
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

      let madeMenu = `💐 *𝙃𝙀𝙇𝙇𝙊  ${pushname}*

▬▬▬▬▬▬▬▬▬▬▬▬▬
| *MAIN COMMANDS* |
    🚀.alive
    🚀.menu
    🚀.ai <text>
    🚀.system
    🚀.owner
| *DOWNLOAD COMMANDS* |
    🚀.song <text>
    🚀.video <text>
    🚀.fb <link>
| *GROUP COMMANDS* |
${menu.group}
| *OWNER COMMANDS* |
    🚀.restart
    🚀.update
| *CONVERT COMMANDS* |
    🚀.sticker <reply img>
    🚀.img <reply sticker>
    🚀.tr <lang><text>
    🚀.tts <text>
| *SEARCH COMMANDS* |
${menu.search}
▬▬▬▬▬▬▬▬▬▬▬▬▬
> *@𝙾𝚂𝙷𝙰𝙳𝙷𝙰 𝙼𝙰𝙽𝚄𝙿𝙿𝚁𝙸𝚈𝙰*
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
