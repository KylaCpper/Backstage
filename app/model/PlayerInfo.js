const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class PlayerInfo extends DBInterface{
	init(){
		this.setTabelName("playerInfo");
		let model = mongoose.Schema({
	        name: {type: String},
	        openid:{type:String},
	        unionid: {type: String},
	        headUrl:{type:String},
	        createTime: {type: Date, default: Date.now}
	    }, {collection: 'playerInfo'});
	   	model.index({id: 1});
	    return model;
	}
}
module.exports = PlayerInfo;