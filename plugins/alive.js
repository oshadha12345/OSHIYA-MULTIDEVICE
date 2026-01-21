const { cmd } = require("../command");
const config = require("../config");
const os = require("os");
const { sendButtons } = require("gifted-btns");

cmd({
    pattern: 'alive',
    react: "⚡",
    desc: 'Shows alive message with buttons.',
    category: 'main'
}, async (message, match) => {
    const templateButtons = [
        {index: 1, urlButton: {displayText: 'Join Support Group', url: 'https://chat.whatsapp.com/example'}},
        {index: 2, urlButton: {displayText: 'Get Bot Code', url: 'https://github.com/asitha-md'}},
        {index: 3, quickReplyButton: {displayText: 'PING', id: '.ping'}},
        {index: 4, quickReplyButton: {displayText: 'MENU', id: '.menu'}},
    ]

    const buttonMessage = {
        text: "Hey Oshadha, I am Asitha MD and I am alive! ⚡",
        footer: 'Powered by Asitha MD',
        templateButtons: templateButtons,
        image: {url: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiyaping.jpg"}
    }

    return await message.client.sendMessage(message.jid, buttonMessage)
})
