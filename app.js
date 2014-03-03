
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();





//var test = require('./mData/model/mgMODEL');



// all environments
app.set('port', process.env.PORT || 3000);
app.engine(".html", require("ejs").__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var m = require('./mData/mongo');
//app.get('/user/:id' , m.loadUser);
app.post("/upload" ,m.upload);
app.get('/dataUpdate' , m.dataUpdate);
app.get('/fileDelete' , m.delete);
app.get('/', routes.index);
app.get("/fileList" , m.fileList);





//---------------------------------------------
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
