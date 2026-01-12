const { ytdl } = require('@bochilteam/scraper');

module.exports = {
  pattern: 'ytmp3',
  alias: ['song', 'youtubeaudio'],
  react: "🎵",
  category: 'downloader',
  desc: 'Download YouTube audio by URL or search',
  use: '<url or search>',
  async exec(m, conn, { text }) {
    if (!text) return m.reply('🔍 උදාහරණයක්: .ytmp3 Despacito');
    try {
      const result = await ytdl(text);
      const { title, audio, thumbnail } = result;

      await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: `🎶 *Title:* ${title}` );
      await conn.sendMessage(m.chat, 
        audio:  url: audio.url ,
        mimetype: 'audio/mp4',
        fileName: `{title}.mp3`
      }, { quoted: m });
    } catch (e) {
      m.reply('❌ Download එකේදී දෝෂයක් ඇතිවුණා.');
    }
  }
};
