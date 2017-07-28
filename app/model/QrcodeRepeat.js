const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class QrcodeRepeat extends DBInterface{
	init(){
		this.setTabelName("qrcodeRepeat");
		let model = mongoose.Schema({
			id:{type:Number},
			userId:{type:String},
			name:{type:String},
			admin:{type:String},
			proportion:{type:Number},
			proportion_p:{type:Number},
			discount:{type:Number},
	        createTime: {type: Date, default: Date.now}
	    }, {collection: 'qrcodeRepeat'});
	    model.index({createTime: -1});
	    return model;
	}
}
module.exports = QrcodeRepeat;