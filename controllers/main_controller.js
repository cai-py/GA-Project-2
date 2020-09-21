const express = require('express')
const main = express.Router()
const Sheet = require('../models/sheets.js')
////////////////////////////////

// home
main.get('/home', (req,res) => {
    res.render('site/home.ejs')
})

/////////////////
// library
main.get('/home/library', (req,res) => {
    Sheet.find({}, (error, allSheets) => {
        res.render('site/library.ejs',
        {
            sheets: allSheets
            // ,currentUser: req.ression.currentUser
        })
    })
    
})

// new sheet
main.get('/home/library/new', (req,res) => {
    res.render('sheets/new_sheet.ejs')
})

// create
main.post('/home/library', (req,res) => {
    Sheet.create(req.body, (error, createdSheet) => {
        res.redirect('/home/library')
    })
})

////////////////////////////////
module.exports = main