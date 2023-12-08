require('dotenv').config({});
const app = require('./app');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEBOT;
const bot = new TelegramBot(token, { polling: true });
var Url = require('./model/Url');
var crypto = require('crypto');
mongoose
    .connect(process.env.DB.replace('<PASSWORD>', process.env.DB_PASS))
    .then(() => {
        console.log(`DB Connected`);
    });
app.listen(5005, () => {
    console.log(`Listinging`);
});

function generateRandomString(length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

// messages.
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.text);

    if (msg.text.includes('https://')) {
        const shortUrl = `${generateRandomString(8)}`;
        await Url.create({
            url: msg.text,
            alias: `mk_${shortUrl}`,
        });

        const theUrl = await Url.findOne({
            url: msg.text,
        });
        console.log(`The Url : `, theUrl.alias);

        bot.sendMessage(chatId, theUrl.alias);
    }
});
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Hi I am Tammy');
});
