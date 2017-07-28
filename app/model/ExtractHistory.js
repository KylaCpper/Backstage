const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class ExtractHistory extends DBInterface{
	init(){
		this.setTabelName("extractHistory");
		let model = mongoose.Schema({
			userId:{type:String},
			name:{type:String},
	        playerId: {type: String},
	        unionid:{type:String},
	        money:{type:Number},
	        use:{type:Number},
	        createTime: {type: Date, default: Date.now},
	        endTime:{type:Date}
	    }, {collection: 'extractHistory'});
	    model.index({createTime: 1});
	    return model;
	}
}
module.exports = ExtractHistory;