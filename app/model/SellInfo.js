const DBInterface = require('../../core/db/DBInterface');
const mongoose = require('mongoose');
class SellInfoModel extends DBInterface{
	 init() {
        this.setTabelName("sellInfo");
        let model = mongoose.Schema({
            buyTime: {type: Date},
            userId: {type: String},
            buyNum: {type: Number},
            createTime: {type: Date, default: Date.now}
        }, {collection: 'sellInfo'});
        model.index({createTime: 1});
        return model;
    }
}
module.exports = SellInfoModel;