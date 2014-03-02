
/**
 * Module dependencies.
 */
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
//js:socketio 로드
var sio=require('socket.io');
var MemoryStore=express.session.MemoryStore;
var sessionStore=new MemoryStore();
//js:익스프레스 세션 쿠키 세팅
/*app.use(express.cookieParser());*/
var EXPRESS_SID_KEY='express.sid';
var COOKIE_SECRET='iamnotwearinganypants';
var cookieParser=express.cookieParser(COOKIE_SECRET);
/*app.use(express.session({
	secret:'iamnotwearinganypants',
	store:sessionStore,
	key:'express.sid'})
);*/
app.configure(function () {
    app.use(cookieParser);
    app.use(express.session({
        store:sessionStore,
        cookie:{httpOnly:true},
        key:EXPRESS_SID_KEY
    }));
});
app.use(express.static(path.join(__dirname, 'public')));
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
/*var parseCookie=require('connect').utils.parseCookie;*/

/*ss.set('authorization',function(data,accept){
	console.log('권한 '+data.headers.cookie);
	if(data.headers.cookie){
		data.cookie=parseCookie(data.headers.cookie);
		data.sessionID=data.cookies['express.sid'].subString(2,26);
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
});*/
ss.set('authorization', function (data, callback) {
    if(!data.headers.cookie) {
        return callback('No cookie transmitted.', false);
    }

    // We use the Express cookieParser created before to parse the cookie
    // Express cookieParser(req, res, next) is used initialy to parse data in "req.headers.cookie".
    // Here our cookies are stored in "data.headers.cookie", so we just pass "data" to the first argument of function
    cookieParser(data, {}, function(parseErr) {
        if(parseErr) { return callback('Error parsing cookies.', false); }

        // Get the SID cookie
        var sidCookie = (data.secureCookies && data.secureCookies[EXPRESS_SID_KEY]) ||
                        (data.signedCookies && data.signedCookies[EXPRESS_SID_KEY]) ||
                        (data.cookies && data.cookies[EXPRESS_SID_KEY]);

        // Then we just need to load the session from the Express Session Store
        sessionStore.load(sidCookie, function(err, session) {
            // And last, we check if the used has a valid session and if he is logged in
            if (err || !session || session.isLogged !== true) {
                callback('Not logged in.', false);
            } else {
                // If you want, you can attach the session to the handshake data, so you can use it again later
                // You can access it later with "socket.handshake.session"
                data.session = session;

                callback(null, true);
            }
        });
    });
});

ss.sockets.on('connection',function(socket){
	var hs=socket.handshake;
	console.log('소켓 '+socket+' 소켓 접속!');
	console.log('세션아디 '+hs.session+' 소켓 접속!');
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