// 'library' is used instead of 'app' in server.js
const express = require('express')
const home = express.Router()

// INDEX
home.get('/home', (req,res) => {
    res.render('home/home.ejs')
})

module.exports = home