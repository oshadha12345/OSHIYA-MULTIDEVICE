const {cmd , commands} = require('../command')
const config = require('../config');

cmd({
    pattern: "alive",
    react: "🔥",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(robin, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await robin.sendPresenceUpdate('recording', from);
    await robin.sendMessage(from, { audio: { url: "https://github.com/oshadha12345/images/raw/refs/heads/main/Voice/Coolzone%20(nasty_)%20-%20impxstr%20%5Bedit%20audio%20like%20_fictic_editz%20%5D(MP3_160K).mp3" }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
    await robin.sendMessage(from,{sticker: { url : "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/sticker/STK-20251107-WA0012.webp"},package: 'OSHADHA'},{ quoted: mek })   
return await robin.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: config.ALIVE_MSG},{quoted: mek})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

