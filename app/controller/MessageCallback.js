const UserDao = require('../dao/UserDao');
const ExtensionDao=require('../dao/ExtensionDao')
const OrderDao=require('../dao/OrderDao')
const RewardCardDao=require('../dao/RewardCardDao')
const SellInfoDao=require('../dao/SellInfoDao')
const RechargeHistoryDao=require('../dao/RechargeHistoryDao')
const PlayerInfoDao=require('../dao/PlayerInfoDao')
const ExtractHistoryDao=require('../dao/ExtractHistoryDao')
const QrcodeRepeatDao=require('../dao/QrcodeRepeatDao')
const request = require('koa-request');
const fs=require('fs');
const CommunicationControllerBase = require('../../core/base/CommunicationControllerBase');
const moment = require('moment');
const self = {};
const Payment = require('koa-wechat-pay').Payment;
const o={appId:'wx06a885d249615565', appSecret:'a84701bbed690e30ae5d83bee71c8fd9', partnerKey:'zxcvbnmasdfghjklqwertyuiop123456',mchId: "1303446201","wechatRedirectUrl": "http://h5.1357g.com/g/gm.app/callback", "wechatToken": "JsbOsSLoPxBJKcn8"}
const payment = new Payment(o);
const config=require('./config.json')
const md5 = require('md5');
const Public = require('./Public');
var tw = require('timespans');
class MessageCallback extends CommunicationControllerBase{
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
	*callback(){
		let data=this.request.xml;
		let order = yield self.orderDao.select("_id",data.xml.out_trade_no)
		if(order){
			if(order.use==0){
				 self.orderDao.update(data.xml.out_trade_no)
				 self.userDao.buyCard(data.xml.openid,order.cardNum)
				
				 let data_={
				 		"userId":order.userId,
				 		"buyTime":order.createTime,
				 		"buyNum":order.cardNum
				 }
				 //let sell=yield self.sellInfoDao.select("userId",order.userId)
				 //let info={"userId":order.userId,"buyNum":order.cardNum,"buyTime":order.createTime}
				 // if(sell){
				 // 	self.sellInfoDao.update(info)
				 // }
				 // else{
				 // 	self.sellInfoDao.insert(info)
				 // }
				 console.log('success')
			}
			else
				console.log('use in')
			//使用过
		}
		else
			console.log('order null')
		//无订单

	}

	*rechargeCallback(){
		let data=this.request.query;
		//data.money  data.num  data.id
		if(data.id&&data.money&&data.num&&data.showId){
			// if(md5(data.id+data.num+data.money+'tyjhhgfdsaasd')==data.token){
				let info =yield self.extensionDao.select("unionid",data.id)
				if(info){
					if(data.showId!=info.playerId){
						yield self.extensionDao.update(info._id,"playerId",data.showId)
					}
					yield self.userDao.add(info.userId,"tMoney",data.money)
					let user=yield self.userDao.select("_id",info.userId)
					let rows = yield this.mdb.query("select data from serverinfo limit 1");
					let row = yield Public.selectUrl(this);
					if(row){
						let returnCard={"tickets":Math.round(Number(data.num)*Number(user.proportion_p))}
						returnCard=JSON.stringify(returnCard)

						let params={"id":data.showId,"content":returnCard,"sign":md5(returnCard+data.showId+row.key)} 
						console.log(params)
						let row_=yield request.post(row.url+config.url.mail, { form:params });
						let re=JSON.parse(row_.body)
						console.log(re)
						if(!re.err)
							this.body={"err":0}
						else
							this.body={"err":"third server err"}
					}
			
				}
				else
					this.body={"err":"无此玩家"}
			// }
			// else
			// 	this.body={"err":"token错误"}
		}
		else
			this.body={"err":"缺少参数"}




	}
}




module.exports = MessageCallback;