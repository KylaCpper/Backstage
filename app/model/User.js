const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class UserModel extends DBInterface{
	init(){
		this.setTabelName("user");
		let model = mongoose.Schema({
	        name: {type: String},
	        openid:{type:String},
	        unionid: {type: String},
	        cardNum:{type:Number},
	        headUrl:{type:String},
	        job:{type:Number},
	        proportion:{type:Number},
	        proportion_p:{type:Number},
	        discount:{type:Number},
	        eMoney:{type:Number},
	        tMoney:{type:Number},
	        buyNum:{type:Number},
	        rechargeNum:{type:Number},
	        //default 0 //seller//2  // extension 1
	        createTime: {type: Date, default: Date.now}
	    }, {collection: 'user'});
	   	model.index({id: 1});
	    return model;
	}
}
module.exports = UserModel;