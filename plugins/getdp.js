// Asitha MD Stealth DP Downloader
// Gets DP, sends to owner, and deletes the command message instantly!

module.exports = {
    name: 'getdp',
    react: '🎭'
    category: 'tools',
    async handle(client, message, args) {
        const { reply, from, sender, key } = message;

        try {
            // 1. කලින්ම command message එක delete කරනවා (Stealth mode)
            await client.sendMessage(from, { delete: key });

            // 2. Profile picture එක ගන්න බලනවා
            let ppUrl;
            try {
                ppUrl = await client.profilePictureUrl(from, 'image');
            } catch (e) {
                // DP එක නැත්නම් ඔයාට විතරක් message එකක් එවනවා
                return await client.sendMessage(sender, { text: 'එයා DP එකක් දාලා නැහැ මචං! 🚫' });
            }

            // 3. ඔයාගේම WhatsApp number එකට (Inbox) photo එක යවනවා
            await client.sendMessage(sender, { 
                image: { url: ppUrl }, 
                caption: `*OshiyaMD Stealth DP Agent* 🤫\n\n🎯 Target: ${from}\n✅ Command deleted for everyone!` 
            });

        } catch (err) {
            console.log(err);
        }
    }
};
