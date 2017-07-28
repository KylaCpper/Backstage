const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");
class QrcodeRepeatDao extends DaoBase{
        *insert(data,option){
            let QrcodeRepeatTable
            if(option=="extension"){ 
                QrcodeRepeatTable= this.models.qrcodeRepeat({
                    "id":data.id,
                    "userId":data.userId,
                    "name":data.name,
                    "proportion":data.proportion,
                    "proportion_p":data.proportion_p,
                    "admin":data.admin
                });
            }
            if(option=="seller"){
                QrcodeRepeatTable= this.models.qrcodeRepeat({
                    "id":data.id,
                    "userId":data.userId,
                    "name":data.name,
                    "discount":data.discount,
                    "admin":data.admin
                });
            }
            try{
               return yield QrcodeRepeatTable.save();
         
            } catch (err) {
                throw(err);
            }
        }
        *selectOne(){
            return yield this.models.qrcodeRepeat.findOne().sort({id: -1}).exec();
        }

        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.qrcodeRepeat.findOne(sql).exec();
            

        }
        *selects(key,value){
            let sql ={}
            sql[key]=value
            
            return yield this.models.qrcodeRepeat.find(sql).exec();
            

        }
        *selectRepeat(userId,playerId){
            let sql={
                "userId":userId,
                "playerId":playerId
            }
            return yield this.models.qrcodeRepeat.findOne(sql).exec();
        }
        *update(id,data){
            let oldValue={
                "id":id
            }
            let newData={
                "userId":data.userId,
                "name":data.name
            }
            return yield this.models.qrcodeRepeat.update(oldValue,newData).exec();

        }


}

module.exports = QrcodeRepeatDao;