const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    url: String,
    alias: String,
});

module.exports = mongoose.model('Url', UrlSchema);
