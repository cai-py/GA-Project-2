//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes => controllers

const mainController = require('./controllers/main_controller.js') 
app.use('/', mainController)

//////////////
// home
// app.get('/home', (req,res) => {
//   res.render('site/home.ejs')
// })

///////////////
// new user
app.get('/user/new', (req,res) => {
  res.render('users/new_user.ejs')
})

// /////////////////
// // library
// app.get('/home/library', (req,res) => {
//   res.render('site/library.ejs')
// })

// // new sheet
// app.get('/home/library/new', (req,res) => {
//   res.render('sheets/new_sheet.ejs')
// })

// // create
// app.post('/home/library', (req,res) => {
  
// })

////////////////
// log in
app.get('/session/new', (req,res) => {
  res.render('sessions/new_session.ejs')
})
app.post('/', (req,res) => {
  res.redirect('/home/library')
})

app.get('/home/library', (req,res) => {
  res.render('/site/library.ejs')
})


//___________________
// localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));