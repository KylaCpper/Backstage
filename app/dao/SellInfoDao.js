const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");
class SellInfoDao extends DaoBase{

        insert(data){
            let SellInfoTable= this.models.SellInfo({
                "buyTime":data.buyTime,
                "userId":data.userId,
                "buyNum":data.buyNum
               
            });

            try{
                 SellInfoTable.save();
     
            } catch (err) {
                throw(err);
            }
        }
        update(data){
            let oldValue ={
                "userId":data.userId

            }

            let newData ={
                $inc:{"buyNum":Number(data.buyNum)},
                "buyTime":data.buyTime
            }

            
             this.models.SellInfo.update(oldValue,newData).exec();
        }


        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.SellInfo.findOne(sql).exec();
            
        }
        *selects(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.SellInfo.find(sql).exec();
            
        }

        // *seletDetail(id, data) {
        //     var subtractDay;
        //     var cycle;
        //     switch (data.tag) {
        //         case 'week':
        //             subtractDay = 7;
        //             cycle = 1;
        //             break;
        //         case 'month':
        //             subtractDay = 30;
        //             cycle = 6;
        //             break;
        //         case 'quarter':
        //             subtractDay = 90;
        //             cycle = 18;
        //             break;
        //     }
        //     var now = moment();
        //     var nowDay = moment().startOf('day');
        //     var startDay = moment();
        //     startDay.subtract((subtractDay - 1), 'days').startOf('day').format();
        //     var oneDay = (1000 * 60 * 60 * 24);
        //     let aggregate = yield this.models.user_device_info.aggregate([{
        //         $match: {
        //             status: 0,
        //             _device_obj_id: data.deviceID,
        //             _user_obj_id: id,
        //             createTime: {$lte: new Date(now), $gte: new Date(startDay)}
        //         }
        //     }, {
        //         $project: {
        //             _device_obj_id: 1,
        //             _user_obj_id: 1,
        //             createTime: 1,
        //             info: 1,
        //             differ: {$floor: {$divide: [{$subtract: ['$createTime', new Date(nowDay)]}, cycle * oneDay]}},
        //             time: {$dateToString: {format: '%m.%d', date: '$createTime'}}
        //         }
        //     }, {
        //         $group: {
        //             _id: {'differ': '$differ'},
        //             value: {$avg: '$info.' + data.key},
        //             record: {$sum: 1},
        //             time: {$first: '$time'}
        //         }
        //     }, {
        //         $sort: {time: 1}
        //     }]).exec();
        //     return aggregate;
        // }


}

module.exports = SellInfoDao;