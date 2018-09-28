const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://user:password@172.17.0.2:27017/admin', (error, client) => {
    if (error){
        return console.log('Unable to connect to MongoDB server.\n', error);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //Delete many
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //Delete one
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result.result);
    // });

    //Find one and delete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5ab8f0af625a0426fcf93f1a')}).then((result) => {
        console.log(result);
    });

    client.close();
});