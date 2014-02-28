/**
 * New node file
 */

//local mongoDB URL
/**  // external Mongodb url
 *  mongodb://username:password@hostname:port/database
 */
//var mgURL ='mongodb://192.168.0.120/song';
var mgURL ='mongodb://song:hbilap@ds033459.mongolab.com:33459/project';
// connect file
var mongoose = require("mongoose").connect(mgURL,function(err,db){
	if(err){
		console.log(" error!: unable to connect to database");
	}
});



//connect log test
module.exports.conLog = function(){
	
	var db = mongoose.connection;
	db.once("open",function(err){
			console.log("DB connect !");
	});
};













