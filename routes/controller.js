//인덱스
exports.index=function(req,res){
	res.render('index');
};

//로그아웃
exports.logout=function(req,res){
	req.session.isLogged=false;
	res.redirect('/');
};