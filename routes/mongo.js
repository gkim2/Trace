
/** 1. 전송속도 GET > POST
 * 2. 히스토리 백 할 때 GET은 이전데이터를 보여주며, POST는 새로 요청
 * 3. 인코딩 방식이 다르다
 * 4. GET은 글자수 제한이 있고 POST 는 없다
 * 5. GET은 보안에 취약, POST는 보안유지
 * 6.  GET은 서버의 데이터를 가져오는(SELECT)데에 적합하고 POST는 게시판의 글을 등록/수정하는 것과 같은 작업에 적합하다.
 * //upload 는 반드시 post 방식으로 설계
**/

exports.upload=function(req,res){
	var index = req.body.index;
	var mgIdx = req.body.id;
	var textData = req.body.text;
	//파일 오브젝트 얻어옴
	var fobj = req.files.myFile;
	var filename = fobj.name;
	var filesize = fobj.size;
	var filepath = fobj.path;
	global.fs.open(filepath,"r",function(err,fd){
		//파일을 저장할 버퍼 객체 만들기
		var buffer = new Buffer(filesize);
		//console.log(req.files.fd);
		if(req.files.fd){
			global.fs.read(fd,buffer,0,buffer.length,null,function(err,readedBytes,buffer){
				//파일정보를 DB에 저장한다.
				var obj={
					mgIdx:mgIdx,
					index:index,
					textData:textData,
					filename:filename,
					filesize:filesize,
					file:buffer
				};
				var userData = new UserData(obj);
				userData.save(function(err){
					if(err){
						res.send("실패");
						console.log('error!:'+err);
					}else{
						res.redirect("/fileList");
					}
				});
			});
		}else{													//file is NULL
			var obj={
				mgIdx:mgIdx,
				index:index,
				textData:textData
			};
			var userData=new UserData(obj);
			userData.save(function(err){
				if(err){
					res.send("실패");
					console.log('error! :'+err);
				}else{
					res.redirect("/fileList");
				}
			});
		}
	});
};

///////////////////////////////////////////////////////////////////////////////////
exports.dataUpdate=function(req,res){
	var doc=UserData.findOne({mgIdx:'song1'});
	console.log(doc.constructor);
	UserData.findOne({},function(err,newDoc){
		if(!err){
			UserData=newDoc;
			console.log(UserData._id);
		}else{
			console.log('fail');
		}
		// res.redirect("/fileList");
	});
};

exports.commentWrite=function(req,res){
	var fidx=req.body.id;
	var textData=req.body.text;
	var obj={
		fidx:fidx,
		textData:textData
	};
	var commentData=new CommentData(obj);
	CommentData.save(function(err){
		if(err){

		}else{

		}
	});
};

exports.fileDelete=function(req,res){
	var _id = req.query.id;
	UserData.remove({"_id":_id},function(err){
		if(err){
			res.redirect("");
		}else{
			res.redirect("/fileList");
		}
	});
};

exports.getContents=function(req,res){
	UserData.find()
	.sort("_id")
	.select("_id mgIdx index textData filename filesize regdate")
	.exec(function(err,data){
		if(err){
			res.json({"result":"fail"});
		}else{
			res.render("flieList.html",{"files":data});
		//	console.log(data);
			//res.render = view 폴더에 있는 filelist 파일에서 files
			//변수에 있는  data의 key 값을 출력한다.
			//{오브젝트,키}
		}
	});
};