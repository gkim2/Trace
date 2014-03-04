//수정
exports.update = function(req, res){
	//전역변수로 받아올 결과 값
	var chInfo = ["2"];
	global.conn.query('USE jschema', function(err){
        if(err) throw err;
        global.conn.query('UPDATE members SET mdelflag= "Y" where midx = ?',outNum, function(err, result){
            if(err) throw err;
            
            var result = result['changedRows'];
            
            if(result > 0){
            	res.send("성공");//탈퇴 성공시 이동
            }else{
            	res.send("실패");
            }
        });
    });
};
//탈퇴
exports.out = function(req, res){
	//전역변수로 받아올 결과 값
	var outNum = {midx:"2"};
	
	global.conn.query('USE jschema', function(err){
        if(err) throw err;
        global.conn.query('UPDATE members SET mdelflag= "Y" where ?',outNum, function(err, result){
            if(err) throw err;
            
            var result = result['changedRows'];
            
            if(result > 0){
            	res.send("성공");//탈퇴 성공시 이동
            }else{
            	res.send("실패");
            }
        });
    });
};

//로그인
exports.login = function(req, res){
	
	var id = req.body.id;
	var pw = req.body.pw;
	var loginInfo = [id, pw];
	
	global.conn.query('USE jschema', function(err){
        if(err) throw err;
        global.conn.query("SELECT midx FROM members WHERE mid= ? and mpw= ? and mdelflag='N'",loginInfo, function(err, result){
            if(err) throw err;
            
            if(result.length > 0){
            	res.send(result[0]);//로그인 성공시 이동
            }else{
            	res.send("실패");
            } 
        });
    });
};

//가입 test
exports.test = function(req, res){
	
	global.conn.query('USE jschema', function(err){
		if(err) throw err;
		
	var joinInfo = ["testid","testpw","testname","M","testphone","1990-04-30","서울특별시"];
	
    global.conn.query('insert into members(mid,mpw,mname,maddr,mregdate,msex,mphone,mbirth) ' 
    		+'select ?,hex(DES_ENCRYPT(?,"utf-8")),?,aidx,now(),?,?,? from addrs where acity=?',
    		joinInfo, function(err, result){
        if(err) throw err;
        
        res.send("성공");//가입 성공시 이동
        
    	});
	});
};