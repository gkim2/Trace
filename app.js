var io=require('socket.io'),
	http=require('http'),
	express=require('express'),
	database=require('./routes/database'),
	controller=require('./routes/controller'),
	mysql=require('mysql'),
	mongo=require('./routes/mongo'),
	fs=require("fs");

/*var	http = require('http'),
	path = require('path');*/

var PORT=process.env.PORT||80,
	HOST=process.env.HOST||'192.168.0.175';

/*// Express SID를 포함하는 cookie key
var EXPRESS_SID_KEY='express.sid';
// Express가 보내는 cookie 암복호화용 key
var COOKIE_SECRET='i am not wearing any pants';
var cookieParser=express.cookieParser(COOKIE_SECRET);*/

//connection 객체 생성
/*var connection=mysql.createConnection({
	host:'localhost',
	user:'js',
	password:'a'
});*/

//connection pool
var pool=mysql.createPool({
	"host":"localhost",
	"port":3306,
	"user":"ssss",
	"password":"1234",
	"database":"jschema"
});

//local mongoDB URL
/**  // external Mongodb url
 *  mongodb://username:password@hostname:port/database
 */
//var mgURL ='mongodb://192.168.0.120/song';
var mgURL='mongodb://song:hbilab@ds033459.mongolab.com:33459/project';
var mongoose=require("mongoose").connect(mgURL,function(err,db){
	if(err){
		console.log("error!: unable to connect to mongodb");
	}else{
		console.log("mongodb connect!");
	}
});
//log test
module.exports.conLog=function(){
	var db=mongoose.connection;
	db.once("open",function(err){
		console.log("DB connect !");
	});
};
//스키마 객체를 받아온다.
var Schema=mongoose.Schema;
//고유의 ID 값을 읽어옴
var ObjectId=Schema.ObjectId;

//날짜 형식 표기
function dateFormat(val){
	if(!val){
		return val;
	}
	var str=val.getFullYear()+"."+(val.getMonth()+1)+"."+val.getDate()+" "+val.getHours()+":"+val.getMinutes();
	return str;
}

//유저 스키마 생성.
//unique 스키마를 가지고 있을 이유가 없음. 핸들링은 _id 로 제어
var userSchema=new Schema({
	'mgIdx':String,		//회원인덱스
	'mgName':String,	//회원이름
	'mgImage':String,	//회원프로필썸네일
	'index':String,		//컨텐츠인덱스
	'textData':String,	//컨텐츠텍스트
	'filename':String,	//이미지파일명
	'filesize':Number,	//이미지사이즈
	'file':Buffer,		//이미지데이터
	'fileMeta':[{type:String},{type:String}],
	'regdate':{type:Date,default:Date.now,get:dateFormat}
});

//댓글에 적용될 friend 스키마 생성
var commentSchema=new Schema({
	'fIdx':{type:Number,unique:true},
	'textData':{type:String},
	'regdate':{type:Date,default:Date.now}
});

//collections 생성 
//collection 이름은 자동으로 뒤에 +s 가 붙는다.
var UserData=mongoose.model("data",userSchema);
var CommentData=mongoose.model("comment",commentSchema);

//
/* route 미들웨어 접속
 * 현재 일단 않씀
 module.exports.loadUser = function(req , res , next) {
	UserData.findOne({mgIdx : req.body.writer } , function(err , data){
		if(err){
			return next(err);						//에러 발생
		}
		if(!UserData){
			return res.send('Not found' , 404);		// 사용자가 없음
		}
		console.log('사용자 load : '+data.mgIdx);			//debug console
		req.data =  data;
		next();										// 다음 function에 제어권 전달.
			
	});
}
*/
//Model.find(query, fields, options, callback) 
 

//connection변수 global 처리
global.pool=pool;
global.fs=fs;
global.UserData=UserData;

/*// Express session용 메모리 새 저장소 생성
var sessionStore=new express.session.MemoryStore();*/

var app=express();

/*app.configure(function() {
	app.use(cookieParser);
	app.use(express.session({
		store:sessionStore,
		cookie:{
			httpOnly:true
		},
		key:EXPRESS_SID_KEY
		}
	));
});*/

app.engine('.ejs', require('ejs').__express);
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

// development only
if('development'===app.get('env')){
	app.use(express.errorHandler());
}

// socket.io를 리스너로 HTTP server 생성
var server=http.createServer(app);
var io=io.listen(server);

// socket.io authorization handler로 handshake 설정
/*io.set('authorization',function(data,callback){
	if(!data.headers.cookie){
		return callback('No cookie transmitted.', false);
	}
	cookie 분석 전 cookieParser 사용
	cookieParser(req,res,next) 펑션으로 req.headers.cookie 내의 데이터 분석
	cookieParser(data,{},function(parseErr){
		if(parseErr){
			return callback('Error parsing cookies.',false);
		}
		// SID cookie 가져옴
		var sidCookie=(data.secureCookies&&data.secureCookies[EXPRESS_SID_KEY])||
		(data.signedCookies&&data.signedCookies[EXPRESS_SID_KEY])||
		(data.cookies&&data.cookies[EXPRESS_SID_KEY]);
		// Express Session Store에서 세션 로드
		sessionStore.load(sidCookie,function(err,session){
			// 유효한 세션 여부인지 로그인되어 있는지 체크
			if(err||!session||session.isLogged!==true){
				callback('Not logged in.',false);
			}else{
				// hs 데이터에 세션 첨부 후 socket.handshake.session라는 명칭으로 접근 가능
				console.log('세션아디 '+session.id);
				data.session=session;
				callback(null,true);
			}
		});
	});
});*/

// 클라 소켓 접속시 1초마다 주기적으로 현재 시간 emit
/*io.on('connection',function(socket){
	var sender=setInterval(function(){
		socket.emit('누가 언제 : ',socket.handshake.session.id+' 가 '+new Date().getTime());
	},1000);
	socket.on('disconnect',function(){
		clearInterval(sender);
	});
});*/

io.on('connection',database.connection);

server.listen(PORT,HOST,null,function(){
	console.log('Server listening on port %d in %s mode',this.address().port,app.settings.env);
});

