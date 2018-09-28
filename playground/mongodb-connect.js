// const MongoClient = require('mongodb').MongoClient;
//alternative of the above
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://user:password@172.17.0.2:27017/admin', (error, client) => {
    if (error){
        return console.log('Unable to connect to MongoDB server.\n', error);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    

    db.collection('Todos').insertOne({
        text: 'Eat lunch',
        completed: false
    }, (error, result) => {
        if (error){
            return console.log('Unable to insert todo', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // db.collection('Users').insertOne({
    //     name: 'Luiz',
    //     age: 24,
    //     location: 'São Paulo'
    // }, (error, result) => {
    //     if (error){
    //         return console.log('Unable to insert user', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    client.close();
});