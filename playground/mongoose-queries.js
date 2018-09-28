const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require ('./../server/models/todo');
const { User } = require('./../server/models/user');

var id = '15ac2b37b0883da15e7cad325';

// if (!ObjectID.isValid(id)){
//     return console.log('ID not valid.');
// }

// // Example to find all documents that match the query
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Find: \n', todos);
// });

// // Example to find one document that match the query
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Find one: \n', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Find by ID: \n',todo);
// }).catch((error) => console.log(error));

if (!ObjectID.isValid(id)){
    return console.log('Invalid ID');
}

User.findById(id).then((user) => {
    if(!user){
        return console.log('User not found.');
    }
    console.log('Find by ID: \n', user);
}).catch((error) => console.log(error));