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
	//전역변수로 받아올 결과 값
	var loginInfo = ["abc", 1234];
	
	global.conn.query('USE jschema', function(err){
        if(err) throw err;
        global.conn.query('SELECT midx FROM members WHERE mid= ? and mpw= ?',loginInfo, function(err, result){
            if(err) throw err;
            
            if(result.length > 0){
            	res.send(result[0]);//로그인 성공시 이동
            }else{
            	res.send("실패");
            } 
        });
    });
};
//가입
exports.join = function(req, res){
	
	global.conn.query('USE jschema', function(err){
		if(err) throw err;
	//전역변수로 받아올 결과 값
	var joinInfo = {mid:"abc",mpw:"1234",mname:"김구라", maddr:"1", 
			mregdate:"2000-2-22", mdelflag:"N", msex:"M", mphone:"011"};
	var size = 0;
	
    global.conn.query('INSERT INTO members SET ?', joinInfo, function(err, result){
        if(err) throw err;
        
        	res.redirect("/");//가입 성공시 이동
        
    });
});
};