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
	HOST=process.env.HOST||'192.168.0.90';

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
	"user":"js",
	"password":"a",
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


//connection변수 global 처리
global.pool=pool;
global.mongoose=mongoose;
global.fs=fs;

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

