const UserDao = require('../dao/UserDao');
const RewardCardDao=require('../dao/RewardCardDao')
const ExtensionDao=require('../dao/ExtensionDao')
const OrderDao=require('../dao/OrderDao')
const RechargeHistoryDao=require('../dao/RechargeHistoryDao')
const QrcodeRepeatDao=require('../dao/QrcodeRepeatDao')
const SellInfoDao=require('../dao/SellInfoDao')
const request = require('koa-request');
const fs=require('fs');
const CommunicationControllerBase = require('../../core/base/CommunicationControllerBase');
const moment = require('moment');
const self = {};
const Payment = require('koa-wechat-pay').Payment;
const o={appId:'wx06a885d249615565', appSecret:'a84701bbed690e30ae5d83bee71c8fd9', partnerKey:'zxcvbnmasdfghjklqwertyuiop123456',mchId: "1303446201","wechatRedirectUrl": "http://h5.1357g.com/g/gm.app/callback", "wechatToken": "JsbOsSLoPxBJKcn8"}
const payment = new Payment(o);
const config=require('./config.json')
const qrcode=require('qrcode-js');
const Public=require('./Public.js')

const md5 = require('md5');
//const Public = require('./Public');
var tw = require('timespans');
class SellerController extends CommunicationControllerBase{
	constructor(models) {
		super(models);
		self.userDao = this.daoLoader(UserDao);
		self.rewardCardDao = this.daoLoader(RewardCardDao);
		self.extensionDao = this.daoLoader(ExtensionDao);
		self.orderDao = this.daoLoader(OrderDao);
		self.qrcodeRepeatDao = this.daoLoader(QrcodeRepeatDao);
		self.rechargeHistoryDao = this.daoLoader(RechargeHistoryDao);
		self.sellInfoDao = this.daoLoader(SellInfoDao);
	}

	*test(){ 


	}
	*buyCard(){
		let data=this.request.body;
		let sp=config.list[data.listId]
		let order={"userId":data._id,"openid":data.openid,"cardNum":sp.num,"money":sp.money}
		let orderInfo=yield self.orderDao.insert(order)
		if(orderInfo){
			let wxOrder = {
			  body: 'x*1',
			  attach: 'aaa',
			  out_trade_no: orderInfo._id,
			  total_fee:sp.money ,
			  notify_url:"http://h5.1357g.com/g/gm.app/callback",
			  spbill_create_ip: "127.0.0.1",
			  openid: data.openid,
			  trade_type: 'JSAPI'
			}
			let info =yield payment.getBrandWCPayRequestParams(wxOrder);
			if(info){
				this.body={"err":0,"data":info}
			}
			else{
				this.body={"err":"order err"}
			}
		}
		else{
			this.body={"err":"server err"}
		}

		
	}
	*Rechange(){
		let data =this.request.body;
		let user=yield self.userDao.select("_id",data._id)
		if((user.cardNum>data.cardNum)&&user){
			    let row = yield Public.selectUrl(this);
			    if(row){
				    let params={"id":data.playerId,"tickets":data.cardNum,"sign":md5(data.playerId+data.cardNum+row.key)}
					
					let tickets=yield request.post(row.url+config.url.addTickets, { form:params });
					//let tickets={"err":0}
					if(!tickets.err){
						yield self.userDao.Reduce(data._id,data.cardNum)
						let insert={"userId":data._id,"playerId":data.playerId,"name":data.name,"cardNum":data.cardNum}
						yield self.rechargeHistoryDao.insert(insert) 
						yield self.userDao.add(data._id,"rechargeNum",data.cardNum)
						this.body={"err":0}
					}
					else
						this.body={"err":"server err"}
				}
				else
					this.body={"err":"third server err"}
				
		}
		else
			this.body={"err":"cardNum null"}
		
	}
	*addReturnCard(){
		let data=this.request.query;
		let userinfo=yield self.userDao.select("_id",data._id)
		if(userinfo){
			if(userinfo.job==config.seller||userinfo.job==config.all){
				yield self.userDao.addCardNum(data._id,data.num)
				let insert={
					"userId":data._id,
					"rewardCard":Number(data.num)
				}
				yield self.rewardCardDao.insert(insert)
				this.body={"err":0}
			}
			else
				this.body={"err":"seller err"}
		}
		else
			this.body={"err":"user none"}
	}
	*selectPlayers(){
		let data=this.request.body;
		//let info=yield request.post(config.url.selectPlayers, { form:params });
		let info=yield self.rechargeHistoryDao.selects("userId",data._id)
		if(info[0]){
			this.body={"err":0,"data":info}
		}
		else{
			this.body={"err":"record null"}
		}

	}
	*selectPlayer(){
		let data =this.request.body;
		let row = yield Public.selectUrl(this);
		if(row){
			let params={"id":data.playerId,"sign":md5(data.playerId+row.key)}   
			let info=yield request.post(row.url+config.url.selectPlayer, { form:params });
			// let info=yield self.rechargeHistoryDao.select("playerId",data.playerId)
			let list =[]
				
			//let info={"id":"1","nickname":"1","place":"1"}
				// for(let i =0;i<20;i++){
				// 	list[i]={"id":i,"nickname":"user"+i}
				// }
				// let info=list[data.playerId]
			
			if(!info.err){
				let playerinfo={
					"playerId":info.showId,
					"name":info.nickname,
					"place":info.place
				}

				// userinfo.playerId="1"
				// userinfo.name="2"
				// userinfo.cardNum="3"
				// userinfo.place="4"
				this.body={"err":0,"data":playerinfo}

			}
			else
				this.body={"err":"sever err"}
		}
		else
			this.body={"err":"third server err"}

		
	}
	*selectReward(){
		let data=this.request.body;

		let info =yield self.rewardCardDao.selects({"userId":data._id});

		if(info[0]){
			// for(let i=0;i<info.length;i++){
			// 	for(let i1=0;i1<userinfo.length;i1++){
			// 		if(info[i].userId==userinfo[i1]._id){
			// 			info[i].name=userinfo[i1].name
			// 			info[i].place=userinfo[i1].place
			// 			break;

			// 		}
			// 	}
			// }
			this.body={"err":0,"data":info}
		}
		else
			this.body={"err":"record null"}
		
	}
	*selectSell(){
		let data=this.request.body;

		let info =yield self.rechargeHistoryDao.selects({"userId":data._id});

		if(info[0]){
			// for(let i=0;i<info.length;i++){
			// 	for(let i1=0;i1<userinfo.length;i1++){
			// 		if(info[i].userId==userinfo[i1]._id){
			// 			info[i].name=userinfo[i1].name
			// 			info[i].place=userinfo[i1].place
			// 			break;

			// 		}
			// 	}
			// }
			this.body={"err":0,"data":info}
		}
		else
			this.body={"err":"record null"}
		
	}
	*buildQrcodeSeller(){
		 let data=this.request.query;
		 if(data.discount&&data.admin){
		 	let id=yield self.qrcodeRepeatDao.selectOne()
		 	if(id){
		 		id.id++;
		 	}
		 	else
		 		id={"id":1}
		 	let be={"id":id.id,"discount":data.discount,"admin":data.admin,"userId":null,"name":null}
		 	yield self.qrcodeRepeatDao.insert(be,"seller")
		 	let url = config.url.url+'bind.html?option=seller&id='+id.id;
		 	let base64 = qrcode.toDataURL(url, 4);
			this.body={"err":0,"data":url}
		}
		else
			this.body={"err":"缺少参数"}
	}
	*changeDiscountSeller(){
		let data=this.request.body;
		if(data._id&&data.discount){
			yield self.userDao.update(data._id,"discount",data.discount)	
			this.body={"err":0}
		}
		else
			this.body={"err":"缺少参数"}
		
		
	}
	//seller info
	*selectSeller(){
		let data=this.request.body
		console.log(data)
		if(data.startTime&&data.endTime){
			let info= yield self.userDao.selects_time(data.startTime,data.endTime)
		// 	let _ids=[]
		// 	let info=[]
		// //转换json
		// 	for(let i=0;i<info_.length;i++){
		// 		info[i]={}
		// 		info[i].name=info_[i].name
		// 		info[i]._id=info_[i]._id
		// 		info[i].discount=info_[i].discount
		// 		info[i].proportion=info_[i].proportion
		// 		info[i].proportion_p=info_[i].proportion_p
		// 		info[i].eMoney=info_[i].eMoney
		// 		info[i].buyNum=0
		// 		info[i].rechargeNum=0
		// 		_ids[i]=String(info[i]._id)
		// 	}
		// 	// let _ids=["5901aca3cb967a13f05f9e6e","5901b2cc8fc3591698b6bedf"]
		// 	//console.log(_ids)
		// 	//查询该经销商下充值总额 和购买总额
		// 	 let order=yield self.orderDao.selects_z(_ids)
		// 	 let recharge=yield self.rechargeHistoryDao.selects_z(_ids)
		// 	 let o=0,r=0 
		// 	 //遍历  把三个数组 userid一样合并
		// 	 for(let i=0;i<info.length;i++){
		// 	 	for(let i1=0;i1<info.length;i1++){
		// 	 		if(order[i1]){
		// 		 		if(info[i]._id==order[i1]._id){
		// 		 			info[i].buyNum=order[i1].buyNum
		// 		 			o=1
		// 		 			if(r==1){
		// 		 				break;
		// 		 			}
		// 		 		}
		// 		 	}
		// 		 	else{
		// 		 		o=1
		// 		 		if(r==1){
		// 		 			break;
		// 		 		}
		// 		 	}

		// 	 		if(recharge[i1]){
		// 		 		if(info[i]._id==recharge[i1]._id){
		// 		 			info[i].rechargeNum=recharge[i1].rechargeNum
		// 		 			r=1
		// 		 			if(o==1){
		// 		 				break;
		// 		 			}
		// 		 		}
		// 			}
		// 			else{
		// 				r=1
		// 				if(o==1){
		// 					break;
		// 				}
		// 			}

		// 	 	}
		// 	 	r=0
		// 	 	o=0
		// 	 }

			if(info[0]){
				 this.body={"err":0,"data":info}
			}
			else
				this.body={"err":"该时间段无经销商注册"}
			
		}
		else
			this.body={"err":"缺少参数"}
	}

	*selectNow_seller(){
		let data=this.request.body;
		let order=yield self.orderDao.selectNow()
		let recharge=yield self.rechargeHistoryDao.selectNow()
		let user=yield self.userDao.selectAll()
		let rechargeNum=0;
		let buyNum=0;
		let rechargeNum_z=0;
		let buyNum_z=0
		for(let i=0;i<order.length;i++){
			if(!isNaN(order[i].cardNum))
				rechargeNum+=order[i].cardNum
		}
		for(let i=0;i<recharge.length;i++){
			if(!isNaN(recharge[i].cardNum))
				buyNum+=recharge[i].cardNum
		}


		for(let i=0;i<user.length;i++){
			if(!isNaN(user[i].buyNum))
				buyNum_z+=user[i].buyNum
			if(!isNaN(user[i].rechargeNum))
				rechargeNum_z+=user[i].rechargeNum
		}

		 this.body={"err":0,"rechargeNum":rechargeNum,"buyNum":buyNum,"rechargeNum_z":rechargeNum_z,"buyNum_z":buyNum_z}
	}


	*bindSeller(){
		let data=this.request.body;
		if(data.code&&data.id){
			let userinfo=yield Public.auto(this,data.code)
			let id=yield self.qrcodeRepeatDao.select("id",data.id)
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
										"discount":id.discount,
										"proportion":0,
										"proportion_p":0,
										"eMoney":0,
										"tMoney":0,
										"buyNum":0,
										"rechargeNum":0,
										"job":config.seller

									}

							select=yield self.userDao.insert(insert)
							
							//repart?:insert
							this.body={"err":0,"data":select}
							
						}else{
							if(select.job!=config.seller&&select.job!=config.all){

									let oldValue={
												"unionid":userinfo.unionid
									}
									let newValue={
												"discount":id.discount,
												"job":config.all
									}
									if(select.job==config.extension){
										yield self.userDao.updateData(oldValue,newValue)
									}
									else{
										newValue.job=config.seller
										yield self.userDao.updateData(oldValue,newValue)
									}
									select.discount=id.discount
									this.body={"err":0,"data":select}

							}
							else{
									let oldValue={
												"unionid":userinfo.unionid
									}
									let newValue={
												"discount":id.discount
									}
									yield self.userDao.updateData(oldValue,newValue)
									this.body={"err":1}
							}
						}
						yield self.qrcodeRepeatDao.update(data.id,{"name":select.name,"userId":select._id})
					}
					else
						this.body={"err":2,"data":id}
				}
				else
					this.body={"err":"无权限"}
			}
			else
				this.body = {"err":"wx server err"}
		}
		else
			this.body={"err":"缺少参数"}
	}
}




module.exports = SellerController;