

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


function dateFormat(val){
	if(!val) {
		return val;
	}
	var str = val.getFullYear()+"."+(val.getMonth()+1)+"."+
	val.getDate()+" "+val.getHours()+":"+val.getMinutes();
	return str;
}


var FileSchema = new Schema({
	
	"mgIdx" : Number,
	"file":Buffer,
	"regdate":{type:Date, default:Date.now,get: dateFormat}
});

module.exports = FileSchema;