var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://172.17.0.2:27017/Users').then(() => {
    console.log('Successfully connected to database.');
}, (error) => {
    console.log('Unable to set connection to database.\n', error);
});

module.exports = { mongoose };