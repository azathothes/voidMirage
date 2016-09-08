"use strict"
const encrypt = require('crypto');

 module.exports.encryptStr = function(str,encode){
     encode = encode || "sha256";
     return encrypt.createHash(encode).update(str).digest('hex');
 }
