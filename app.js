
/**
 * Module dependencies.
 */

// js:socketio 로드
var sio=require('socket.io');

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

// 세션스토어 컨테이너
var MemoryStore=express.session.MemoryStore;
var sessionStore=new MemoryStore();
//js:익스프레스 세션 쿠키 세팅
app.use(express.cookieParser());
app.use(express.session({
	secret:'iamnotwearinganypants',
	store:sessionStore,
	key:'express.sid'}));

// js:웹서버 객체 생성 변수 할당
var server=http.createServer(app);
/*var fs=require("fs");
var server=http.createServer(function(req,res){
    fs.readFile("index.html","utf-8",function(err,data){
        res.writeHead(200,{
            "Content-Type":"text/html;charset=utf-8"
        });
        res.end(data);
    });
});*/
server.listen(app.get('port'),function(){
	console.log('Express server listening on port '+app.get('port'));
});

/*	js:웹서버 객체 전달하여 서버소켓 객체 로딩
*/
var	ss=sio.listen(server);
var parseCookie=require('connect').utils.parseCookie;

ss.set('authorization',function(data,accept){
	console.log('권한 '+data.headers.cookie);
	if(data.headers.cookie){
		data.cookie=parseCookie(data.headers.cookie);
		data.sessionID=data.cookie['express.sid'];
		sessionStore.get(data.sessionID,function(err,session){
			if(err){
				accept(err.message,false);
			}else{
				data.session=session;
				accept(null,true);
			}
		});
	}else{
		return accept('No cookie transmitted!',false);
	}
});

ss.sockets.on('connection',function(socket){
	var hs=socket.handshake;
	console.log('세션아디 '+hs.sessionID+' 소켓 접속!');
	var intervalID=setInterval(function(){
		hs.session.reload(function(){
			hs.session.touch().save();
		});
	},60*1000);
	socket.on('disconnect',function(){
		clearInterval(intervalID);
	});
});


/*ss.sockets.on('connection',function(socket){
	console.log('클라소켓 들옴'+socket.id);
	var cookie_string=socket.request.headers.cookie;
	console.log(cookie_string);
	socket.on('login',function(data){
		
		var parsed_cookies = connect.utils.parseCookie(cookie_string);
		var connect_sid = parsed_cookies['connect.sid'];
		if (connect_sid) {
		session_store.get(connect_sid, function (error, session) {
		//HOORAY NOW YOU'VE GOT THE SESSION OBJECT!!!!
		});
		}
		sessionStore.get(socket.id,function(err,session){
			if(err||!session){
				//에러처리
				console.log('머야업서');
				return;
			}else{
				sessionStore.loggedIn=true;
				console.log(socket.id+'로그드인 상태');
			}
		});
	});
});
*/