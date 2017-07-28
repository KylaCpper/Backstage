const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");
class ExtractHistoryDao extends DaoBase{
        *insert(data){ 
            let ExtractHistoryTable= this.models.extractHistory({
                "userId":data.userId,
                "money":data.money,
                "name":data.name,
                "endTime":"",
                "use":0
            });

            try{
               return yield ExtractHistoryTable.save();
         
            } catch (err) {
                throw(err);
            }
        }
        *updateUse(_id){
            let oldValue ={
                "_id":_id
            }

            let newData ={
                "use":1,
                "endTime":moment()
            }
            return yield this.models.extractHistory.update(oldValue,newData).exec();
        }

        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.extractHistory.findOne(sql).exec();
            

        }
        *selects(key,value){
            let sql ={}
            sql[key]=value
            
            return yield this.models.extractHistory.find(sql).exec();
            

        }
        *selectRepeat(userId,playerId){
            let sql={
                "userId":userId,
                "playerId":playerId
            }
            return yield this.models.extractHistory.findOne(sql).exec();
        }

        *selects_time(startTime,endTime){
            
            let start=moment(startTime);
            let end=moment(endTime); 

            let sql ={
                createTime:{$gte:start,$lte:end}
            };

            return yield this.models.extractHistory.find(sql).exec();
        
        }
}

module.exports = ExtractHistoryDao;