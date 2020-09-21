const mongoose = require('mongoose')

const sheetSchema = new mongoose.Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    comp: {type: String}
})

const Sheet = mongoose.model('Sheet', sheetSchema)

module.exports = Sheet