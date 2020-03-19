var express = require('express');
var jwt = require('jwt-simple')
var router = express.Router();


var User = require('../models/user');

router.post('/register', (request, response) => {
    var userData = request.body;
    var user = new User(userData);

    user.save((error, result) => {
        if (error) {
            console.log('Error saving the user')
        }
        response.status(201).send({ message: 'Created' });
    })
})

router.post('/login', async (request, response) => {
    var userData = request.body;
    var user = await User.findOne({ email: userData.email })
    if (!user) {
        return response.status(401).send({ message: "Email or password invalid" })
    }
    if (userData.password != user.password) {
        return response.status(401).send({ message: "Email or password invalid" })
    }
    var payload = {}
    var token = jwt.encode(payload, '123')
    return response.status(200).send({ token })
})

var user = {
    router, checkAuthenticated: (request, response, next) => {
        console.log("...");
        if(!request.header('authorization')){
            return response.status(401).send({message:"Unauthorized. No Authorization Header"})
        }

        var token = request.header("authorization").split(' ')[1]


        var payload = jwt.decode(token,'123')

        if(!payload){
            return response.status(401).send({message:"Unauthorized, Token is not Valid"})
        }


        next()
    }
}

module.exports = user;