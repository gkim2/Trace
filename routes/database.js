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
			conn.query("SELECT COUNT(1) AS CNT,MIDX FROM MEMBERS WHERE MID=? AND MPW=HEX(DES_ENCRYPT(?,'secretKey')) AND MDELFLAG='N'",loginInfo,function(err,result){
				if(err){
					conn.release();
					console.error(err);
					return;
				}
				console.error(result[0]);
				if(result[0].CNT>0){
					socket.emit("logedIn",{"logedIn":true,"midx":result[0].MIDX});
				}else{
					socket.emit("logedIn",{"logedIn":false});
				}
				conn.release();
			});
		});
	});
	
	socket.on("getContents",function(data){
		global.UserData.find()
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
