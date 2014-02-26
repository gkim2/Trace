
//로그인
exports.login = function(req, res){
	global.conn.query('USE jschema', function(err){
        if(err) throw err;
        global.conn.query('SELECT midx FROM members WHERE mid= ? and mpw= ?',["abc"],[1234], function(err, result){
            if(err) throw err;
            if(result.length > 0){
            	res.redirect("성공");//로그인 성공시 이동
            }else{
            	res.send("실패");
            } 
        });
    });
};
//가입
exports.join = function(req, res){
global.conn.query('USE jschema', function(err){
	
	var post = {mid:"abc",mpw:"1234",mname:"김구라", maddr:"1", 
			mregdate:"2000-2-22", mdelflag:"Y", msex:"M", mphone:"011"};
	
    if(err) throw err;
    global.conn.query('INSERT INTO members SET ?', post, function(err, result){
        if(err) throw err;
        	res.send("성공");//가입 성공시 이동
    });
});
};
