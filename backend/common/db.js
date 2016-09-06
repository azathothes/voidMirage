const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myblog').connection;
const db = mongoose.connection;
db.on('error',(err)=>{
    console.log('error occured : '+err)
})

db.on('open',()=>{
    console.log('conn establised successful!')
})

module.exports.db = mongoose;
