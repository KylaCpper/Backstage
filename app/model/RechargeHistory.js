const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class RechargeHistory extends DBInterface{
	init(){
		this.setTabelName("rechargeHistory");
		let model = mongoose.Schema({
	        userId: {type: String},
	       	playerId:{type: String},
	       	name:{type:String},
	       	cardNum:{type:Number},
	        createTime: {type: Date, default: Date.now}
	    }, {collection: 'rechargeHistory'});
	    model.index({createTime: 1});
	    return model;
	}
}
module.exports = RechargeHistory;