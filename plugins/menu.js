const { cmd, commands } = require("../command");
const fs = require("fs");
const os = require("os");
const moment = require("moment-timezone");
const pkg = require("../package.json");
const { sendInteractiveMessage } = require("gifted-btns");

const pendingMenu = {};
const prefix = ".";

const headerImage = "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg";


// system info function
function getInfo(sender) {
  return {
    user: sender.split("@")[0],
    platform: os.platform(),
    host: os.hostname(),
    date: moment().tz("Asia/Colombo").format("YYYY-MM-DD"),
    time: moment().tz("Asia/Colombo").format("HH:mm:ss"),
    version: pkg.version || "1.0.0"
  };
}



//////////////////////////////
// MAIN MENU
//////////////////////////////

cmd({
  pattern: "menu",
  react: "📋",
  desc: "Show interactive menu",
  category: "main",
  filename: __filename
}, async (sock, m, msg, { from, sender }) => {

  const info = getInfo(sender);

  const commandMap = {};

  // group commands by category
  commands.forEach(command => {

    if (command.dontAddCommandList) return;

    const cat = (command.category || "misc").toUpperCase();

    if (!commandMap[cat]) commandMap[cat] = [];

    commandMap[cat].push(command);

  });

  const categories = Object.keys(commandMap);


  // menu text
  let text = `
╭━━━〔 *BOT MENU* 〕━━━┈⊷
┃ 👤 User     : ${info.user}
┃ ⚙ Prefix   : ${prefix}
┃ 💻 Platform : ${info.platform}
┃ 🖥 Host     : ${info.host}
┃ 📅 Date     : ${info.date}
┃ ⏰ Time     : ${info.time}
┃ 🚀 Version  : v${info.version}
╰━━━━━━━━━━━━━━━┈⊷

📂 *Select a Category Below*
`;


  await sock.sendMessage(from, {
    image: { url: headerImage },
    caption: text
  }, { quoted: m });


  // create category rows
  const rows = categories.map(cat => ({
    id: `cat_${cat}`,
    title: cat,
    description: `${commandMap[cat].length} commands`
  }));


  await sendInteractiveMessage(sock, from, {

    text: "Choose Category",

    interactiveButtons: [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify({

          title: "BOT MENU",

          sections: [
            {
              title: "CATEGORIES",
              rows: rows
            }
          ]

        })
      }
    ]

  });


  pendingMenu[sender] = { commandMap };

});



//////////////////////////////
// CATEGORY SELECT
//////////////////////////////

cmd({

  filter: text => text.startsWith("cat_")

}, async (sock, m, msg, { from, sender, body }) => {


  if (!pendingMenu[sender]) return;


  const category = body.replace("cat_", "");

  const cmds = pendingMenu[sender].commandMap[category];

  if (!cmds) return;


  let text = `
╭━━━〔 *${category} MENU* 〕━━━┈⊷
`;


  const rows = [];


  cmds.forEach(command => {

    const patterns = [command.pattern, ...(command.alias || [])]
      .filter(Boolean)
      .map(p => `${prefix}${p}`);

    text += `┃ ${patterns.join(", ")}\n`;
    text += `┃ ┗ ${command.desc || "No description"}\n`;

    rows.push({

      id: `${prefix}${command.pattern}`,
      title: `${prefix}${command.pattern}`,
      description: command.desc || "Command"

    });

  });


  text += `╰━━━━━━━━━━━━━━━┈⊷
📦 Total Commands : ${cmds.length}
`;


  await sock.sendMessage(from, {

    image: { url: headerImage },
    caption: text

  }, { quoted: m });



  await sendInteractiveMessage(sock, from, {

    text: "Choose Command",

    interactiveButtons: [
      {
        name: "single_select",

        buttonParamsJson: JSON.stringify({

          title: category,

          sections: [
            {
              title: "COMMANDS",
              rows: rows
            }
          ]

        })

      }
    ]

  });


});



//////////////////////////////
// COMMAND SELECT EXECUTE
//////////////////////////////

cmd({

  filter: text => text.startsWith(prefix)

}, async (sock, m, msg, { body }) => {


  const commandName = body.slice(prefix.length).split(" ")[0].toLowerCase();


  const command = commands.find(cmd =>
    cmd.pattern === commandName ||
    (cmd.alias && cmd.alias.includes(commandName))
  );


  if (!command) return;


  // execute command
  try {

    await command.function(sock, m, msg, {
      from: m.key.remoteJid,
      sender: m.key.participant || m.key.remoteJid,
      body: body
    });

  } catch (e) {

    console.log("Command execute error:", e);

  }


});
