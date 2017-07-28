const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");
class RechargeHistoryDao extends DaoBase{
        *insert(data){ 
            let RechargeHistoryTable= this.models.rechargeHistory({
                "userId":data.userId,
                "playerId":data.playerId,
                "name":data.name,
                "cardNum":data.cardNum
            });

            try{
               return yield RechargeHistoryTable.save();
         
            } catch (err) {
                throw(err);
            }
        }


        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.rechargeHistory.findOne(sql).exec();
            

        }
        *selects(key,value){
            let sql ={}
            sql[key]=value
            
            return yield this.models.rechargeHistory.find(sql).exec();
            

        }
        *selects_z(userIds){ 
                let data = yield this.models.rechargeHistory.aggregate([{
                    $match:{
                        userId:{$in:userIds}
                    }

                },{
                    $project: {
                        userId: 1,
                        cardNum: 1
                    }
                },{ 
                    $group: {  
                        _id:"$userId",
                        rechargeNum:{$sum:"$cardNum"}
                    }
                }]).exec();

                return data
        }
        *selectNow(){
           let start= moment().format('YYYY-MM-DD 00:00:00')
           let end =moment().format('YYYY-MM-DD 23:59:59')
            let sql={
                createTime:{$gte:start,$lte:end}
            }
            return yield this.models.rechargeHistory.find(sql).exec()
        }
        *selectAll(){
            return yield this.models.rechargeHistory.find().exec();
            

        }

}

module.exports = RechargeHistoryDao;