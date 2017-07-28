const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class RewardCard extends DBInterface{
	init(){
		this.setTabelName("rewardCard");
		let model = mongoose.Schema({
			userId:{type:String},
			rewardCard:{type:Number},
	        createTime:{type:Date,default: Date.now}
	        //createTime:{type:Date,expires:'1.8h',default: Date.now}
	    }, {collection: 'rewardCard'});
	    return model;







	}
}
module.exports = RewardCard;