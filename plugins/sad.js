const { cmd } = require('../command')

cmd({
    pattern: "sad",
    desc: "Sad emoji animation with user name.",
    category: "fun",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply }) => {
try {
    // මුලින්ම emoji එකක් යවනවා
    const { key } = await conn.sendMessage(from, { text: "😔" })
    
    // Edit වෙන්න ඕනේ emoji සෙට් එක
    const emojis = ["💔", "😢", "😭", "🫂", "🥀", "🖤"]
    
    for (let emoji of emojis) {
        await new Promise(resolve => setTimeout(resolve, 600)) // පොඩි වෙලාවක් නවත්තනවා
        await conn.sendMessage(from, { text: emoji, edit: key })
    }
    
    // අන්තිමට ඔෂධගේ නමයි සෑඩ් කියලා වැටෙන කෑල්ල
    await new Promise(resolve => setTimeout(resolve, 600))
    return await conn.sendMessage(from, { text: `*💔 ${pushname} is feeling sad*...`, edit: key })

} catch (e) {
    console.log(e)
}
})
