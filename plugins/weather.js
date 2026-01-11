const { cmd } = require('../command')
const axios = require('axios')

cmd({
    pattern: "weather",
    react: "🌏",
    desc: "Check the weather of a city.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
try {
    if (!q) return reply("කරුණාකර නගරයක නමක් දාන්න! උදා: .weather Colombo")

    const apiKey = '8866063334c69838f5351d4285848574' // OpenWeather API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${apiKey}`
    
    const response = await axios.get(url)
    const res = response.data

    const weatherMsg = `🌡️ *WEATHER REPORT: ${res.name}* 🌡️

🌍 *Country:* ${res.sys.country}
🌡️ *Temperature:* ${res.main.temp}°C
☁️ *Condition:* ${res.weather[0].description}
💧 *Humidity:* ${res.main.humidity}%
💨 *Wind Speed:* ${res.wind.speed} m/s

✨ *Oshiya MD Weather Service*`

    return reply(weatherMsg)

} catch (e) {
    console.log(e)
    reply("අයියෝ නගරය හොයාගන්න බැරි වුණා. නම හරියට ගැහුවද බලන්න! ❌")
}
})
