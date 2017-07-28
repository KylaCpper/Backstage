const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");
class ExtensionDao extends DaoBase{
        *insert(data){ 
            let ExtensionTable= this.models.extension({
                "userId":data.userId,
                "playerId":data.playerId,
                "unionid":data.unionid,
                "name":data.name,
                "tMoney":data.tMoney,
                "bMoney":data.bMoney
            });

            try{
               return yield ExtensionTable.save();
         
            } catch (err) {
                throw(err);
            }
        }

        *update(unionid,key,value){
            let oldValue ={
                "unionid":unionid

            }

            let newData ={}
            newData[key]=value

            return yield this.models.extension.update(oldValue,newData).exec();

        }
        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.extension.findOne(sql).exec();
            

        }
        *selects(key,value){
            let sql ={}
            sql[key]=value
            
            return yield this.models.extension.find(sql).exec();
            

        }
        *selectRepeat(userId,unionid){
            let sql={
                "userId":userId,
                "unionid":unionid
            }
            return yield this.models.extension.findOne(sql).exec();
        }

        *selects_time(startTime,endTime){
            
            let start=moment(startTime);
            let end=moment(endTime); 

            let sql ={
                createTime:{$gte:start,$lte:end}
            };
            
            return yield this.models.extension.find(sql).exec();
        
        }
        *selectNow(){
           let start= moment().format('YYYY-MM-DD 00:00:00')
           let end =moment().format('YYYY-MM-DD 23:59:59')
            let sql={
                createTime:{$gte:start,$lte:end}
            }
            return yield this.models.extension.find(sql).exec()
        }
        *selects_z(userIds){ 
                let data = yield this.models.extension.aggregate([{
                    $match:{
                        userId:{$in:userIds}
                    }

                },{
                    $project: {
                        userId: 1,
                        money:1
                    }
                },{ 
                    $group: {  
                        _id:"$userId",
                        money:{$sum:"$money"}
                    }
                }]).exec();

                return data
        }
}

module.exports = ExtensionDao;