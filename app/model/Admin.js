const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class Admin extends DBInterface{
	init(){
		this.setTabelName("admin");
		let model = mongoose.Schema({
			_id:{type:String},
			pass:{type:String},
	        createTime: {type: Date, default: Date.now}
	    }, {collection: 'admin'});
	    model.index({createTime: 1});
	    return model;
	}
}
module.exports = Admin;