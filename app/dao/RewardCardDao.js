const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");
class RewardCardDao extends DaoBase{


        *insert(data){
            let RewardCardTable= this.models.rewardCard({
                "userId":data.userId,
                "rewardCard":data.rewardCard
            });

            try{
               return yield RewardCardTable.save();
         
            } catch (err) {
                throw(err);
            }
        }



        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.rewardCard.findOne(sql).exec();
            
        }
        *selects(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.rewardCard.find(sql).exec();
            
        }

}

module.exports = RewardCardDao;