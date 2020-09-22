const express = require('express')
const main = express.Router()
const Sheet = require('../models/sheets.js')
////////////////////////////////
////////////
// home
main.get('/home', (req,res) => {
    res.render('site/home.ejs')
})

////////
// seed
main.get('/setup/seed', (req,res) => {
    Sheet.create(
        [
            {
              title: 'Moonlight Sonata seed',
              img: 'https://musescore.com/static/musescore/scoredata/gen/2/5/3/55352/3996e6977725669bc884bf2b18dffa0df2d24609/score_0.svg?no-cache=1571570640',
              comp: 'Beethoven'  
            }
        ],
        (error, data) => {
            res.redirect('/home/library')
        }
    )
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

///////////////////
// new sheet
main.get('/home/library/new', (req,res) => {
    res.render('sheets/new_sheet.ejs')
})

// create
main.post('/home/library', (req,res) => {
    Sheet.create(req.body, (error, createdSheet) => {
        res.redirect('/home/library')
        // res.send(req.body)
    })
})

///////////
// show
main.get('/home/library/:id', (req,res) => {
    Sheet.findById(req.params.id, (error, foundSheet) => {
        res.render(
            'sheets/show_sheet.ejs', 
            {
                sheet: foundSheet
            }
        )
    })
})

/////////
// edit
main.get('/home/library/:id/edit', (req,res) => {
    Sheet.findById(req.params.id, (error, foundSheet) => {
        res.render(
            'sheets/edit_sheet.ejs',
            {
                sheet: foundSheet
            }
        )
    })
})

// update
main.put('/home/library/:id', (req,res) => {
    Sheet.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedModel) => {
            res.redirect('/home/library/')
        }
    )
})

////////////
// delete
main.delete('/home/library/:id', (req,res) => {
    Sheet.findByIdAndRemove(req.params.id, (err, deletedSheet) => {
        res.redirect('/home/library')
    })
})

////////////////////////////////
module.exports = main