
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var database = require('./routes/database');
var http = require('http');
var path = require('path');
var fs=require("fs");//fs 모듈
var mysql = require('mysql');//mysql 모듈
//connection 객체 생성
var connection = mysql.createConnection({
    host     : 'localhost', 
    user     : 'root',
    password : 'tiger'
});
//global 처리
global.conn = connection;
global.fs = fs;

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
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.main);//메인페이지
app.get('/users', user.list);//err test

app.get('/join', database.join);
app.get('/login', database.login);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
