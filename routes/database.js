//탈퇴
exports.out=function(req,res){
	//전역변수로 받아올 결과 값
	var outNum={MIDX:req.socket.handshake.session.id};
	global.pool.getConnection(function(err,conn){
		conn.query('USE jschema',function(err){
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
};

//로그인
exports.login=function(req,res){
	var id=req.body.id;
	var pw=req.body.pw;
	var loginInfo=[id, pw];
	global.pool.getConnection(function(err,conn){
		conn.query('USE jschema',function(err){
			if(err){
				throw err;
			}
			conn.query("SELECT MIDX FROM MEMBERS WHERE MID=? AND MPW=? AND DELFLAG='N'",loginInfo,function(err,result){
				if(err){
					throw err;
				}
				if(result.length>0){
					req.session.isLogged=true;
					res.send(result[0]);
				}else{
					res.send("실패");
				}
			});
        });
    });
};

//가입
exports.join=function(req,res){
	global.pool.getConnection(function(err,conn){
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
};