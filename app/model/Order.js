const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class OrderModel extends DBInterface{
	init(){
		this.setTabelName("order");
		let model = mongoose.Schema({
	        userId: {type: String},
	        openid:{type: String},
	        cardNum: {type: Number},
	        money:{type:Number},
	        use:{type:Number},
	        createTime: {type: Date, default: Date.now}
	    }, {collection: 'order'});
	    model.index({createTime: 1});
	    return model;
	}
}
module.exports = OrderModel;