const { cmd } = require("../command");
const ytdl = require('ytdl-core');
const { yts } = require('yt-search');

module.exports = {
  name: 'song',
  react: "😎",
  description: 'Download song from YouTube',
  async execute(m, { args, sendAudio }) {
    const query = args.join(' ');
    if (!query) return m.reply('🎧 ගීතයේ නමක් හෝ YouTube link එකක් දෙන්න.');

    let url = '';
    if (query.startsWith('http')) {
      url = query;
    } else {
      const res = await yts(query);
      url = res.all[0].url;
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    m.reply(`⬇️ ගීතය බාගත වෙමින් පවතී: *${title}*`);
    const stream = ytdl(url, { filter: 'audioonly' });

    return await sendAudio(m.chat, stream, title + '.mp3', m);
  }
};
