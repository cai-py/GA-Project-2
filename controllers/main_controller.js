// 'library' is used instead of 'app' in server.js
const express = require('express')
const main = express.Router()

// INDEX
main.get('/home', (req,res) => {
    res.render('site/home.ejs')
})

module.exports = main