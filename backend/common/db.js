const mongoose = require('mongoose');
console.log('now load')
mongoose.connect('mongodb://localhost/myblog').connection;
mongoose.Promise = require('bluebird');
const db = mongoose.connection;
db.on('error',(err)=>{
    console.log('error occured : '+err)
})

db.on('open',()=>{
    console.log('conn establised successful!')
})

module.exports.db = mongoose;
