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
			conn.query("SELECT COUNT(1) AS CNT,MIDX,MNAME FROM MEMBERS WHERE MID=? AND MPW=HEX(DES_ENCRYPT(?,'secretKey')) AND MDELFLAG='N'",loginInfo,function(err,result){
				if(err){
					conn.release();
					console.error(err);
					return;
				}
				console.error(result[0]);
				if(result[0].CNT>0){
					socket.emit("logedIn",{"logedIn":true,"midx":result[0].MIDX,"mname":result[0].MNAME});
				}else{
					socket.emit("logedIn",{"logedIn":false});
				}
				conn.release();
			});
		});
	});
	
	socket.on("askContents",function(data){
		UserData.find()
		.sort("_id")
		.select("_id mgIdx mgName mgImage index textData filename filesize file regdate")
		.exec(function(err,data){
			if(err){
				throw err;
			}else{
				socket.emit("getContents",{"contents":data});
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
	
	socket.on("join",function(data){
		var image=data.image;
		var id=data.id;
		var pw=data.pw;
		var name=data.name;
		var joinInfo = [id,pw,name,"M","testphone","1990-04-30",id];
		pool.getConnection(function(err,conn){
				if(err){
					throw err;
				}
				conn.query('INSERT INTO MEMBERS(MID,MPW,MNAME,MREGDATE,MSEX,MPHONE,MBIRTH) SELECT ?,HEX(DES_ENCRYPT(?,"secretKey")),?,NOW(),?,?,? FROM dual WHERE NOT EXISTS (SELECT *  FROM members WHERE  members.mid = ?)',joinInfo,function(err,result){
					if(err){
						throw err;
					}
					var str = result['affectedRows'];
					if(str==1){
						socket.emit("signUp",{"signUp":false});
						console.log('SignUp');
					}else if(str==0){
						socket.emit("reSignUp",{"reSignUp":false});
						console.log('reSignUp');
					}
					global.fs.writeFile('./images/'+id+'.txt', image, function(err) {
						  if(err) throw err;
						  console.log('결과/'+str);
						  console.log('File write completed');
						});
					});
				});
			});
	
	
};
