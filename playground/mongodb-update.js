const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://user:password@172.17.0.2:27017/admin', (error, client) => {
    if (error){
        return console.log('Unable to connect to MongoDB server.\n', error);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate( {
    //     _id: new ObjectID('5ab8ecf4625a0426fcf93f18')
    // }, { 
    //     $set: { completed: true}
    // }, {
    //     returnOriginal: false
    // }).then ((result) => {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndUpdate( {
        _id: new ObjectID('5ab5467b9d2bfe2cf52b7cf1')
    }, {
        $set: { name: 'Jonas'},
        $inc: { age: 1}
    }, {
        returnOriginal: false
    }).then ((result) => {
        console.log(result);
    });

    client.close();
});