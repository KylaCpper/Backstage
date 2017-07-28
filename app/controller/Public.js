class Public{

}

Public.wxToken = function*(that,self){
	if(that){
		let tokenRow,accessRow,jsRow,wx_token;
		if(tokenRow = yield self.accesstokenDao.select()){
			wx_token = {"access_token":tokenRow.access_token,"js_token":tokenRow.js_token};
			return wx_token;
		} else {
			if((accessRow = yield that.plugin.weixin.getAccessToken())&&(jsRow = yield that.plugin.weixin.getJsToken({"access_token":accessRow.access_token}))){
				tokenRow = yield self.accesstokenDao.insert(accessRow.access_token,jsRow.ticket);
				wx_token = {"access_token":tokenRow.access_token,"js_token":tokenRow.js_token};
				return wx_token;
			} else
				return false;
		}
	} else 
		return false;
}
Public.auto=function*(that,code){
		let auto =yield that.plugin.weixin.getOpenid({"code":code})
		//get userinfo
		let userinfo = yield that.plugin.weixin.getUserDate({"token":auto.access_token,"openid":auto.openid});
		return userinfo;
}

Public.insertJob=function*(userinfo,job){
				let insert={
					"name":userinfo.nickname,
					"place":userinfo.country+userinfo.province+userinfo.city,
					"openid":userinfo.openid,
					"unionid":userinfo.unionid,
					"headimgurl":userinfo.headimgurl,
					"cardNum":0,
					"discount":0,
					"proportion":0,
					"proportion_p":0,
					"job":job

				}
				return insert;
}
Public.selectUrl=function*(that){
				    let rows = yield that.mdb.query("select data from serverinfo limit 1");
			    if(rows[0]){
					let row=JSON.parse(rows[0].data)
					row.url='http://'+row.ip+':'+row.port+row.gm
					return row
				}
				else
					return false
}








module.exports = Public;