var express = require("express")
var router = express.Router();
var user = require('./userService')
var Author = require('../models/author');


router.post('/add', (request, response) => {
    var author = new Author(request.body)
    author.save((err, result) => {
        if (err) {
            console.log(err)
            return response.sendStatus(500).send({ message: err })
        }
        return response.status(201)
    });
});
router.get('/list', user.checkAuthenticated, async (request, response) => {
    var authors = await Author.find({}, '-__v');
    response.send(authors)
});

var author = {router}

module.exports = author;