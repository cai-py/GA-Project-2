const express = require('express')
const users = express.Router()

users.get('/users/new', (req,res) => {
    res.render('users/new_user.ejs')
})