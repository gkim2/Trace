

var mongoose = require('mongoose');
var contentsData = require('../schema/mgSKM');

var file = mongoose.model("data",contentsData.FileSchema);
console.log(contentsData);

//module.exports = file;