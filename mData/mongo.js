
//local mongoDB URL
/**  // external Mongodb url
 *  mongodb://username:password@hostname:port/database
 */
//var mgURL ='mongodb://192.168.0.120/song';
var mgURL ='mongodb://song:hbilab@ds033459.mongolab.com:33459/project';

//파일 시스템 모듈
var fs=require("fs");
// connect file
var mongoose = require("mongoose")
	.connect(mgURL,function(err,db){
	if(err){
		console.log(" error!: unable to connect to database");
	} else console.log(" db connect!")
});

//스키마 객체를 받아온다.
var Schema = mongoose.Schema;
//고유의 ID 값을 읽어옴
var ObjectId = Schema.ObjectId;


//log test
module.exports.conLog = function(){
	
	var db = mongoose.connection;
	db.once("open",function(err){
			console.log("DB connect !");
	});
};


//날짜 형식 표기
function dateFormat(val){
	if(!val) {
		return val;
	}
	var str = val.getFullYear()+"."+(val.getMonth()+1)+"."+
	val.getDate()+" "+val.getHours()+":"+val.getMinutes();
	return str;
}

//유저 스키마 생성.
var userSchema = new Schema({
	
	'mgIdx'		:	Number, 
	'index'		:	{type:Number ,unique : true },
	'textData'	:	String,
	'filename' 	:	String,
	'filesize'	:	Number,
	'file'		:	Buffer,
	'fileMeta'	:  	[{type:String},{type:String}],
	'regdate':{type:Date, default:Date.now, get: dateFormat}
});

//댓글에 적용될 firend 스키마 생성
var commentSchema = new Schema({
	'fIdx'		: 	{type:Number, unique : true },
	'textData'	: 	{type : String},
	'regdate':{type:Date, default:Date.now}
});

//collections 생성 
//collection 이름은 자동으로 뒤에 +s 가 붙는다.
var UserData = mongoose.model("data",userSchema);
var CommentData = mongoose.model("comment",commentSchema);


//
/*
function loadUser(req , res , next) {
	Userdata.findOne({mgIdx : req.parms.mgIdx } , function(err , data){
		if(err){
			return next(err);
		}
		if(!user){
			return res.send('Not found' , 404);
		}
		
		req.data =  data;
		next();
			
	});
}
*/
//Model.find(query, fields, options, callback) 

module.exports.upload = function(req, res){
//	console.log(req);
	var index =  new ObjectId();
	var mgIdx = req.body.writer;
	var textData = req.body.text;
	//파일 오브젝트 얻어옴
	var fobj = req.files.myFile;
	var filename = fobj.name;
	var filesize = fobj.size;
	var filepath = fobj.path;
	fs.open(filepath,"r",function(err,fd){
		//파일을 저장할 버퍼 객체 만들기
		var buffer = new Buffer(filesize);
		fs.read(fd,buffer,0,buffer.length,null,
				function(err,readedBytes,buffer){
			//파일정보를 DB에 저장한다.
			var obj={
					mgIdx:mgIdx,
				textData:textData,
				filename:filename,
				filesize:filesize,
				file:buffer
			};
			
			var userData = new UserData(obj);
			userData.save(function(err){
				if(err){
					res.send("실패");
					console.log(err);
				}else{
					res.redirect("/fileList");
				}
			});
		});
	});
	
};

module.exports.commentWrite = function(req,res){
	var _id = req.body.id,
		textdata = req.body.text,
		regdate = 
	CommentData.save(function(err){
		if(err){
			
		}else{
			
		}
	});
};

module.exports.delete = function(req,res){
	var _id = req.query.id;
	userdata.remove({"mgIdx":_id},
		function(err){
		if(err){
			res.redirect("");
		}else{
			res.redirect("");
		}
		
	})
};

module.exports.fileList = function(req,res){
	UserData.find()
	.sort("_id")
	.select("_id mgIdx textData filename filesize regdate")
	.exec(function(err,data){
		if(err){
			res.json({"result":"fail"});
		}else{
			res.render("flieList.html",{"files":data});
			//res.render = view 폴더에 있는 filelist2 파일에서 files
			//변수에 있는  data의 key 값을 출력한다.
			//{오브젝트,키}
		}
	});
};

module.exports.update = function(req, res){
	
	
}






