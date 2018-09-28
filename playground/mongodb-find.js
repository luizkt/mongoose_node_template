const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://user:password@172.17.0.2:27017/admin', (error, client) => {
    if (error){
        return console.log('Unable to connect to MongoDB server.\n', error);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //Query incompleted todos
    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch todos', error);
    // });

    //Counting how many todos
    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos count: ', count);
    // }, (error) => {
    //     console.log('Unable to fetch todos', error);
    // });

    db.collection('Users').find({name: 'Mike'}).toArray().then((users) => {
        console.log('Users')
        console.log(JSON.stringify(users, undefined, 2));
    }, (error) => {
        console.log('Unable to fetch users', error);
    });

    client.close();
});