const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");




class UserDao extends DaoBase{
        *insert(data){
            let userTable= this.models.user({
                "name":data.name,
                "openid":data.openid,
                "unionid":data.unionid,
                "place":data.place,
                "headUrl":data.headimgurl,
                "cardNum":data.cardNum,
                "discount":data.discount,
                "proportion":data.proportion,
                "proportion_p":data.proportion_p,
                "eMoney":data.eMoney,
                "job":data.job,
                "tMoney":data.tMoney,
                "buyNum":data.buyNum,
                "rechargeNum":data.rechargeNum
           
                
            });
            try{
              return yield userTable.save();
              
            } catch (err) {
                throw(err);
            }
        }

        buyCard(openid,cardNum){
            let oldValue={"openid":openid}
            let newData={$inc:{"cardNum":Number(cardNum)},$inc:{"buyNum":Number(cardNum)}}
            this.models.user.update(oldValue,newData).exec();
        }

        *Reduce(_id,cardNum){
            let oldValue={"_id":_id}
            let newData={$inc:{"cardNum":-Number(cardNum)}}
            return yield this.models.user.update(oldValue,newData).exec();
        }

        *update(_id,key,value){
            let oldValue ={
                "_id":_id

            }

            let newData ={}
            newData[key]=value
            return yield this.models.user.update(oldValue,newData).exec();
        }
        *add(_id,key,value){
            let oldValue={
                "_id":_id
            }
            let newData={
                $inc:{key:value}       
            }
            return yield this.models.user.update(oldValue,newData).exec();
        }
        *updateJob(unionid,job){
            let oldValue ={
                "unionid":unionid

            }

            let newData ={
                "job":job
            }
            
            return yield this.models.user.update(oldValue,newData).exec();
        }
        *updateData(oldValue,newData){
            
            return yield this.models.user.update(oldValue,newData).exec();
        }
        *updateProportion(_id,proportion,proportion_p){
            let oldValue={
                "_id":_id
            }
            let newData={
                "proportion":proportion,
                "proportion_p":proportion_p
            }
            return yield this.models.user.update(oldValue,newData).exec();
        }
        *addCardNum(_id,cardNum){
            let oldValue={
                "_id":_id
            } 
            let newData={
                $inc:{"cardNum":cardNum}
            }
            return yield this.models.user.update(oldValue,newData).exec();
        }


        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.user.findOne(sql).exec();
            

        }

        *selects(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.user.find(sql).exec();
            

        }
        *selects_ids(_ids){
            let sql={
                "_id":{$in:_ids}
            }
            return yield this.models.user.find(sql).exec();
        }

        *selects_time(startTime,endTime){
            
            let start=moment(startTime);
            let end=moment(endTime); 

            let sql ={
                createTime:{$gte:start,$lte:end}
            };

            return yield this.models.user.find(sql).exec();
        
        }
        *selectAll(){
            return yield this.models.user.find().exec();
        }






}

module.exports = UserDao;

