const mongoose = require('../common/db').db;
var Classify = mongoose.Schema({
    Classify_name: String,
    Classify_create_date:Number,
    Classify_count:Number
})

var classify = mongoose.model('Classify',Classify,'classifys');

module.exports = classify;