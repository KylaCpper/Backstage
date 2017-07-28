const DaoBase = require('../../core/base/DaoBase');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const crypto = require('crypto');
const moment = require("moment");
class AdminDao extends DaoBase{
        *insert(data){ 
            let adminTable= this.models.admin({
                "_id":data.name,
                "pass":data.pass
            });

            try{
               return yield adminTable.save();
         
            } catch (err) {
                throw(err);
            }
        }


        *select(key,value){
            let sql ={}
            sql[key]=value
            return yield this.models.admin.findOne(sql).exec();
            

        }
        *login(name,pass){
            let sql={
                "_id":name,
                "pass":pass
            }
            return yield this.models.admin.findOne(sql).exec();
        }

}

module.exports = AdminDao;