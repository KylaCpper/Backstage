const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class Extension extends DBInterface{
	init(){
		this.setTabelName("extension");
		let model = mongoose.Schema({
			userId:{type:String},
	        playerId: {type: String},
	        unionid:{type:String},
	        name: {type: String},
	        tMoney:{type:Number},
	        bMoney:{type:Number},
	        createTime: {type: Date, default: Date.now}
	    }, {collection: 'extension'});
	    model.index({createTime: 1});
	    return model;
	}
}
module.exports = Extension;