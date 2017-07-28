const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");
class OrderDao extends DaoBase{

        *insert(data){

            let OrderTable= this.models.order({
                "userId":data.userId,
                "openid":data.openid,
                "cardNum":data.cardNum,
                "money":data.money,
                "use":0
            });
            try{
                return yield OrderTable.save();
           
            } catch (err) {
                throw(err);
            }
        }


        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.order.findById(sql).exec();
            

        }
        *selects(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.order.find(sql).exec();
            

        }
        *selectAll(){

            return yield this.models.order.find().exec();
            

        }
        *selects_time(startTime,endTime){
            
            let start=moment(startTime);
            let end=moment(endTime); 

            let sql ={
                createTime:{$gte:start,$lte:end},
                use:1
            };
            
            let data_= yield this.models.order.find(sql).exec();
            let data=[];
            let num=[];
            for(let i=0;i<data_.length;i++){
                data[i]={}
                data[i].userId=data_[i].userId
                data[i].buyTime=data_[i].createTime
                data[i].buyNum=data_[i].cardNum
                
            }

            for(let i=0;i<data.length;i++){
                
                num[i]=data[i].userId;
            }
            data._ids=num;
            return data;
        }
        update(_id){
            let oldValue ={
                "_id":_id

            }

            let newData ={
                "use":1
            }
             this.models.order.update(oldValue,newData).exec();
        }

        *selects_z(userIds){ 
                let data = yield this.models.order.aggregate([{
                    $match:{
                        userId:{$in:userIds},
                        use:0
                    }

                },{
                    $project: {
                        userId: 1,
                        cardNum: 1
                    }
                },{ 
                    $group: {  
                        _id:"$userId",
                        buyNum:{$sum:"$cardNum"}
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
            return yield this.models.order.find(sql).exec()
        }
}

module.exports = OrderDao;