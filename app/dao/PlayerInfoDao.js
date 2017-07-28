const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");
class PlayerInfoDao extends DaoBase{
        *insert(data){ 
            let PlayerTable= this.models.playerInfo({
                "name":data.name,
                "openid":data.openid,
                "unionid":data.unionid,
                "place":data.place,
                "headUrl":data.headimgurl
            });

            try{
               return yield PlayerTable.save();
         
            } catch (err) {
                throw(err);
            }
        }


        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.playerInfo.findOne(sql).exec();
            

        }
        *selects(key,value){
            let sql ={}
            sql[key]=value
            
            return yield this.models.playerInfo.find(sql).exec();
            

        }

}

module.exports = PlayerInfoDao;