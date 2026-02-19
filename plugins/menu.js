const { cmd, commands } = require("../command");
const { sendButtons } = require("gifted-btns");

const headerImage = "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg";

// Main menu command
cmd({
  pattern: "menu",
  react: "📋",
  desc: "Show command categories",
  category: "main",
  filename: __filename
}, async (test, m, msg, { from, sender, reply, sock }) => {
  await test.sendMessage(from, { react: { text: "📋", key: m.key } });

  const commandMap = {};

  for (const command of commands) {
    if (command.dontAddCommandList) continue;
    const category = (command.category || "MISC").toUpperCase();
    if (!commandMap[category]) commandMap[category] = [];
    commandMap[category].push(command);
  }

  const categories = Object.keys(commandMap);

  // Prepare buttons array
  const buttons = categories.slice(0, 3).map((cat, i) => ({
    id: `cat_${i}`,
    text: cat
  }));

  // Add a URL button at the end
  buttons.push({
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Website",
      url: "https://example.com"
    })
  });

  // Send menu as buttons
  await sendButtons(sock, from, {
    title: "MAIN MENU",
    text: "Select a category below:",
    footer: `Total Categories: ${categories.length}`,
    buttons
  });

  // Save pending menu state
  pendingMenu[sender] = { step: "category", commandMap, categories };
});

// Handle button replies
cmd({
  filter: (text, { sender }) => pendingMenu[sender] && pendingMenu[sender].step === "category",
}, async (test, m, msg, { from, body, sender, reply, sock }) => {
  const { commandMap, categories } = pendingMenu[sender];

  // Identify selected category
  let selectedIndex = null;

  // If user clicked a quick reply button, body = id like 'cat_0'
  if (/^cat_\d+$/.test(body)) {
    selectedIndex = parseInt(body.split("_")[1]);
  } else {
    return reply("❌ Invalid selection. Please use the buttons.");
  }

  if (selectedIndex < 0 || selectedIndex >= categories.length) return reply("❌ Invalid selection.");

  const selectedCategory = categories[selectedIndex];
  const cmdsInCategory = commandMap[selectedCategory];

  let cmdText = `*${selectedCategory} COMMANDS*\n`;
  cmdsInCategory.forEach(c => {
    const patterns = [c.pattern, ...(c.alias || [])].filter(Boolean).map(p => `.${p}`);
    cmdText += `${patterns.join(", ")} - ${c.desc || "No description"}\n`;
  });
  cmdText += `───────────────────────\n`;
  cmdText += `Total Commands: ${cmdsInCategory.length}\n`;

  // Send commands list as a simple image message
  await test.sendMessage(from, {
    image: { url: headerImage },
    caption: cmdText,
  }, { quoted: m });

  delete pendingMenu[sender];
});