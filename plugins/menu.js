const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "menu",
    react: "😂",
    desc: "Interactive Menu with Alive jump",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, pushname, reply}) => {
try{
    let menuMsg = `හලෝ ${pushname}! 👋 මෙන්න මගේ Menu එක...\n\n*OSHIYA MD SPEED SYSTEM* 🚀`

    // Buttons ටික මෙතන තියෙන්නේ
    const buttons = [
        {buttonId: '.alive', buttonText: {displayText: 'Go to Alive ⚡'}, type: 1},
        {buttonId: '.download', buttonText: {displayText: 'Downloads 📂'}, type: 1},
        {buttonId: '.media', buttonText: {displayText: 'Media Tools 🎬'}, type: 1},
        {buttonId: '.settings', buttonText: {displayText: 'Settings ⚙️'}, type: 1}
    ]

    const buttonMessage = {
        text: menuMsg,
        footer: "Select an option from below",
        buttons: buttons,
        headerType: 1
    }

    return await conn.sendMessage(from, buttonMessage, { quoted: mek })

}catch(e){
    console.log(e)
    reply(`අයියෝ වැඩේ අවුල් ගියා බං: ${e}`)
}
})
