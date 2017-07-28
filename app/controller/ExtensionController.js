const UserDao = require('../dao/UserDao');
const ExtensionDao=require('../dao/ExtensionDao')
const OrderDao=require('../dao/OrderDao')
const RewardCardDao=require('../dao/RewardCardDao')
const RechargeHistoryDao=require('../dao/RechargeHistoryDao')
const PlayerInfoDao=require('../dao/PlayerInfoDao')
const ExtractHistoryDao=require('../dao/ExtractHistoryDao')
const AdminDao=require('../dao/AdminDao')
const QrcodeRepeatDao=require('../dao/QrcodeRepeatDao')
const request = require('koa-request');
const qrcode=require('qrcode-js');
const fs=require('fs');
const CommunicationControllerBase = require('../../core/base/CommunicationControllerBase');
const moment = require('moment');
const self = {};
const Payment = require('koa-wechat-pay').Payment;
const o={appId:'wx06a885d249615565', appSecret:'a84701bbed690e30ae5d83bee71c8fd9', partnerKey:'zxcvbnmasdfghjklqwertyuiop123456',mchId: "1303446201","wechatRedirectUrl": "http://h5.1357g.com/g/gm.app/callback", "wechatToken": "JsbOsSLoPxBJKcn8"}
const payment = new Payment(o);
const config=require('./config.json')
const md5 = require('md5');
const Public=require('./Public.js')
const xml2js = require('xml2js');
const builder = new xml2js.Builder();  // JSON->xml
const parser = new xml2js.Parser();   //xml -> json



//const Public = require('./Public');
var tw = require('timespans');
class ExtensionController extends CommunicationControllerBase{
	constructor(models) {
		super(models);
		self.userDao = this.daoLoader(UserDao);
		self.extensionDao = this.daoLoader(ExtensionDao);
		self.orderDao = this.daoLoader(OrderDao);
		self.rechargeHistoryDao = this.daoLoader(RechargeHistoryDao);
		self.rewardCardDao = this.daoLoader(RewardCardDao);
		self.playerInfoDao = this.daoLoader(PlayerInfoDao);
		self.extractHistoryDao = this.daoLoader(ExtractHistoryDao);
		self.qrcodeRepeatDao = this.daoLoader(QrcodeRepeatDao);
		self.adminDao = this.daoLoader(AdminDao);

	}

	*test(){ 

	}
	//更具id查询 推广信息
	*extension(){
		let data=this.request.body;
		
		let userinfo=yield self.userDao.select("_id",data._id);
		if(userinfo){
			if (userinfo.job==config.extension||userinfo.job==config.all){
				let info = yield self.extensionDao.selects("userId",data._id);
				this.body={"err":0,"data":info,"proportion":userinfo.proportion,"eMoney":userinfo.eMoney}


			}
			else
				this.body={"err":"extension err"}
		}
		else
			this.body={"err":"user null"}
		
			
		
		
			
		
	}
	//提现
	*extract(){
		let data=this.request.body;
		if(data.money&&data._id){
			let user =yield self.userDao.select("_id",data._id)
			if(user.job==config.extension||user.job==config.all){
				//减返利
				data.money=Number(data.money)
				if(data.money!=0){
					if(user.tMoney-user.eMoney>=data.money){

						yield self.userDao.update(data._id,"eMoney",user.eMoney+data.money)

						//加历史
						let insert={
							"userId":data._id,
							"money":data.money,
							"name":user.name
						}
						if(yield self.extractHistoryDao.insert(insert)){
							this.body={"err":0}
						}
						else
							this.body={"err":"server错误"}
					}
					else
						this.body={"err":"可返利余额不足"}
				}
				else
					this.body={"err":"返利不得为0"}
			}
			else
				this.body={"err":"不是经销商"}


		}
		else
			this.body={"err":"缺少参数"}
	}
	*selectNow_extension(){
		let data=this.request.body;
		let extension=yield self.extensionDao.selectNow()
		let user=yield self.userDao.selectAll()
		let tMoney=0;
		let tMoney_z=0;
		for(let i=0;i<extension.length;i++){
			if(!isNaN(extension[i].tMoney))
				tMoney+=extension[i].tMoney
		}
		for(let i=0;i<user.length;i++){
			if(!isNaN(user[i].tMoney))
				tMoney_z+=user[i].tMoney
		
		}

		 this.body={"err":0,"tMoney":tMoney,"tMoney_z":tMoney_z}
	}
	*selectNow_extract(){
		let data=this.request.body;
		let extract=yield self.extractHistoryDao.selects("use",0)
		let money=0
		for(let i=0;i<extract.length;i++){
			if(!isNaN(extract[i].money))
				money+=extract[i].money
		}


		this.body={"err":0,"num":extract.length,"money":money}
	}
	*giveMoney(){
		let data=this.request.body;
		if(data._id){
			let info = yield self.extractHistoryDao.updateUse(data._id)
			if(info.ok){
				this.body={"err":0}	
			}
			else
				this.body={"err":"server err"}
			
		}
		else
			this.body={"err":"缺少参数"}
	}
	*selectExtract(){
		let data=this.request.body;
		if(data.startTime&&data.endTime){
			let info=yield self.extractHistoryDao.selects_time(data.startTime,data.endTime)
			if(info[0]){
				this.body={"err":0,"data":info}
			}
			else
				this.body={"err":"改时间段无用户提现"}
		}
		else
			this.body={"err":"缺少参数"}
	}

	*buildQrcodeExtension(){
		 let data=this.request.query;
		 if(data._id){
			 let url = config.url.url+'bindex.html?_id='+data._id+'&option=extension';
			 let base64 = qrcode.toDataURL(url, 4);
			this.body={"err":0,"data":url}

		}
		else{
			this.body={"err":"缺少参数"}
		}
	}
	*buildQrcodeExtensioner(){
		 let data=this.request.query;
		 if(data.proportion&&data.proportion_p&&data.admin){
		 	let id =yield self.qrcodeRepeatDao.selectOne();
		 	if(id){
		 		id.id++;
		 	}
		 	else
		 		id={"id":1}
		 	let be={"id":id.id,"proportion":data.proportion,"proportion_p":data.proportion_p,"admin":data.admin,"userId":null,"name":null}
		 	yield self.qrcodeRepeatDao.insert(be,"extension")
			let url = config.url.url+'bind.html?option=extensioner&id='+id.id;
			let base64 = qrcode.toDataURL(url, 4);
			this.body={"err":0,"data":url}
			 
		}else
			this.body={"err":"缺少参数"}
	}

	*changePercentageExtension(){
		let data=this.request.body;
		//console.log(data._id&&data.proportion&&data.proportion_p)
		if(data._id&&data.proportion&&data.proportion_p){
			yield self.userDao.updateProportion(data._id,data.proportion,data.proportion_p)
			this.body={"err":0,}
		}
		else
			this.body={"err":"缺少参数"}
	}
	*addExtension(){
		let data=this.request.body;
		if(data._id&&data.code){
			let userinfo= yield Public.auto(this,data.code)
			let user =yield self.userDao.select("_id",data._id)
			if(userinfo&&user){
				let unionid=userinfo.unionid
					if(user.job==config.extension||user.job==config.all){
						let extension=yield self.extensionDao.select("unionid",unionid)
						if(!extension){
							let insert={"userId":data._id,"unionid":unionid,"name":userinfo.nickname,"tMoney":0,"bMoney":0,"playerId":0}
							console.log(insert)
							let a=yield self.extensionDao.insert(insert)
							console.log("a",a)	
							this.body={"err":0,"data":{"name":user.name,"proportion":user.proportion_p}}
						}
						else{
							this.body={"err":1,"data":{"name":user.name,"proportion":user.proportion_p}}
						}
						
					}
					else
						this.body={"err":"推广码持有者不是推广员"}
			}
			else
				this.body={"err":"wx server错误"}	
		}
		else
			this.body={"err":"wx 缺少参数"}	

	}
	*bindExtension(){
		let data=this.request.body;
		if(data.code&&data.id){
			let id=yield self.qrcodeRepeatDao.select("id",data.id)
			let userinfo=yield Public.auto(this,data.code)
			if(userinfo.unionid){
				let select=yield self.userDao.select("unionid",userinfo.unionid)
				if(id){
					if(!id.userId){
						if(!select){
							let insert={
								"name":userinfo.nickname,
								"place":userinfo.country+userinfo.province+userinfo.city,
								"openid":userinfo.openid,
								"unionid":userinfo.unionid,
								"headimgurl":userinfo.headimgurl,
								"cardNum":0,
								"discount":0,
								"proportion":id.proportion,
								"proportion_p":id.proportion_p,
								"eMoney":0,
								"tMoney":0,
								"buyNum":0,
								"rechargeNum":0,
								"job":config.extension

							}
							select=yield self.userDao.insert(insert)
							
							//repart?:insert
							this.body={"err":0,"data":select}
							
						}else{
							if(select.job!=config.extension&&select.job!=config.all){
								let oldValue={
										"unionid":userinfo.unionid
								}
								let newValue={
										"proportion":id.proportion,
										"proportion_p":id.proportion_p,
										"job":config.all
								}
								console.log(oldValue,newValue)
								if(select.job==config.seller){
									yield self.userDao.updateData(oldValue,newValue)
								}
								else{
									newValue.job=config.extension
									yield self.userDao.updateData(oldValue,newValue)
								}
								select.proportion=id.proportion
								select.proportion_p=id.proportion_p
								this.body={"err":0,"data":select}
							}
							else{
								let oldValue={
										"unionid":userinfo.unionid
								}
								let newValue={
										"proportion":id.proportion,
										"proportion_p":id.proportion_p
								}

								yield self.userDao.updateData(oldValue,newValue)
								this.body={"err":1}
							}
						}
						
						yield self.qrcodeRepeatDao.update(data.id,{"name":select.name,"userId":select._id})
					}
					else 
						this.body ={"err":2,"data":id}
						
				}
				else
					this.body={"err":"无权限"}



			}
			else
				this.body= {"err":"wx server err"}

		}
		else
			this.body={"err":"缺少参数"}
	}


	*selectExtensioner(){
		let data=this.request.body
		if(data.startTime&&data.endTime){
			let info_= yield self.userDao.selects_time(data.startTime,data.endTime)
			if(info_[0]){
			let _ids=[]
			let info=[]
		//转换json
			for(let i=0;i<info_.length;i++){
				info[i]={}
				info[i].name=info_[i].name
				info[i]._id=info_[i]._id
				info[i].proportion=info_[i].proportion
				info[i].proportion_p=info_[i].proportion_p
				info[i].eMoney=info_[i].eMoney
				info[i].tMoney=info_[i].tMoney
				info[i].bMoney=info_[i].tMoney*info_[i].proportion
				
			}
		// 	// let _ids=["5901aca3cb967a13f05f9e6e","5901b2cc8fc3591698b6bedf"]
		// 	//console.log(_ids)
		// 	//查询该推广员下充值总额 
		// 	 let extension=yield self.extensionDao.selects_z(_ids)
		// 	 //let recharge=yield self.rechargeHistoryDao.selects_z(_ids)
		// 	 for(let i=0;i<info.length;i++){
		// 	 	for(let i1=0;i1<extension.length;i1++){
		// 		 		if(info[i]._id==extension[i1]._id){
		// 		 			info[i].tMoney=extension[i1].tMoney 			
		// 		 				break;
		// 		 		}



		// 	 	}
		// 	 	//计算返利总额
		// 	 	info[i].bMoney=info[i].tMoney*info[i].proportion
		// 	 }
				this.body={"err":0,"data":info}
			}
			else
				this.body={"err":"该时间段无推广员注册"}
			 
		}
		else
			this.body={"err":"缺少参数"}
	}

}




module.exports = ExtensionController;