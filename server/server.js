var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//Add some user to DB
app.post('/user', (request, response) => {
    var user = new User({
        username: request.body.username,
        password: request.body.password
    });
    
    user.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    });
});

//Retrieve all users from DB
app.get('/user', (request, response) => {
    User.find().then((user) => {
        response.send({user});
    }, (error) => {
        response.status(400).send(error);
    });

});

//Retrieve specific user from DB
app.get('/user/:id', (request, response) => {
    var id = request.params.id;

    if (!ObjectID.isValid(id)){;
        return response.status(404).send();
    }

    User.findById(id).then((user) => {
        if (!user){
            return response.status(404).send();
        }
        response.send({user});
    }).catch((error) => {
        response.status(400).send(error);
    });

});

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});

module.exports = { app };