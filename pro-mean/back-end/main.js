var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
// Models
var Author = require('./models/author');
var User = require('./models/user');
// Services
var author = require('./services/authorService');
var user = require('./services/userService');

var app = express();

app.use(cors())
app.use(bodyparser.json())



mongoose.connect('mongodb+srv://alibey:alibey123@cluster0-eymfu.mongodb.net/test?retryWrites=true&w=majority', (err) => {
    if (!err) {
        console.log('Connected to db')
    }
})

app.use('/author',author.router)
app.use('/user',user.router)

app.listen(8080)