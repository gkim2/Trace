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
	'mgIdx':String,		// 고유아이디
	'index':String,
	'textData':String,
	'filename':String,
	'filesize':Number,
	'file':Buffer,
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
 

exports.connection=function(socket){
	
	socket.on("login",function(data){
		var id=data.id;
		var pw=data.pw;
		console.log(data);
		var loginInfo=[id, pw];
		pool.getConnection(function(err,conn){
			if(err){
				throw err;
			}
			conn.query("SELECT COUNT(1) AS CNT FROM MEMBERS WHERE MID=? AND MPW=HEX(DES_ENCRYPT(?,'secretKey')) AND MDELFLAG='N'",loginInfo,function(err,result){
				if(err){
					conn.release();
					console.error(err);
					return;
				}
				console.error(result[0]);
				if(result[0].CNT>0){
					socket.emit("logedIn",true);
				}else{
					socket.emit("logedIn",false);
				}
				conn.release();
			});
		});
	});
	
	socket.on("getContents",function(data){
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
	});
	
	
	socket.on("withdraw",function(data){
		//전역변수로 받아올 결과 값
		var outNum={MIDX:data.socket.handshake.session.id};
		pool.getConnection(function(err,conn){
			if(err){
				throw err;
			}
			conn.query('UPDATE MEMBERS SET MDELFLAG="Y" WHERE MIDX=?',outNum,function(err,result){
				if(err){
					throw err;
				}
				var count=result['changedRows'];
				if(count>0){
					res.send("성공");
				}else{
					res.send("실패");
				}
			});
		});
	});
	
	socket.on("join",function(req,res){
		pool.getConnection(function(err,conn){
			conn.query('USE jschema',function(err){
				if(err){
					throw err;
				}
				//테스트용 데이터
				var joinInfo = ["testid","testpw","testname","M","testphone","1990-04-30","서울특별시"];
				
				conn.query('INSERT INTO MEMBERS(MID,MPW,MNAME,MADDR,MREGDATE,MSEX,MPHONT,MBIRTH) SELECT ?,HEX((DES_ENCRYPT(?,"UTF-8")),?,AIDX,NOW(),?,?,? FROM ADDR WHERE ACITY=?',joinInfo,function(err,result){
					if(err){
						throw err;
					}
					res.send("성공");
				});
			});
		});
	});
	
	
};
