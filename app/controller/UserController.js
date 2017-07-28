const UserDao = require('../dao/UserDao');
const ExtensionDao=require('../dao/ExtensionDao')
const OrderDao=require('../dao/OrderDao')
const RechargeHistoryDao=require('../dao/RechargeHistoryDao')
const RewardCardDao=require('../dao/RewardCardDao')
const AdminDao=require('../dao/AdminDao')
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
// const qr=require('qr-image')
var tw = require('timespans');
class UserController extends CommunicationControllerBase{
	constructor(models) {
		super(models);
		self.userDao = this.daoLoader(UserDao);
		self.extensionDao = this.daoLoader(ExtensionDao);
		self.orderDao = this.daoLoader(OrderDao);
		self.rewardCardDao = this.daoLoader(RewardCardDao);
		self.adminDao = this.daoLoader(AdminDao);

		self.rechargeHistoryDao = this.daoLoader(RechargeHistoryDao);
	}
	*test(){ 

	}
	//查询用户信息
	*selectUsers(){
		let data=this.request.body;
		let info = yield self.userDao.selects_time(data.startTime,data.endTime)
		if(info){
			this.body={"err":0,"data":info}
		}
		else
			this.body={"err":"server err"}

	}


	*selectUser(){
		let data =this.request.body;
		let userinfo =yield self.userDao.select(data.key,data.value);
		if(userinfo){
			this.body={"err":0,"data":userinfo}
		}
		else{
			this.body={"err":"user null"}
		}
	}


	*updateJob(){
		let data=this.request.body;
		let userinfo = yield self.userDao.select("_id",data._id)
		if(userinfo){
			yield self.userDao.update(data._id,"job",data.job)
			this.body={"err":0,"data":"success"}
		}
		else
			this.body={"err":"user null"}
		
	}



	// player, seller, tuiguangyuan, gm
	// seller--sell-->player
	// seller<--buy--weixin
	// gm--give gift card-->seller
	// sys-->seller
	// sys:interface:giveGiftCards(sellerid, num);  get return card
	// sys2-->gm
	// tuiguangyuan -- QRcode-->player--buy ticket--fencheng-->tuiguangyuan
	// inerface: onPlayerBuyTicket
	// player<--bonus ticket-- sys

	// tuiguang
	// list
	// player buy tickets log, fencheng

	// sys2 --> gm
	// interface: genQRCodeForSeller(zhekou);
	// interface:genQRCodeForTuiguangyuan(fandianbili, playerBonusRatio);
	// interface: modifySeller(sellerid, zhekou);
	// interface:modifyTuiguangyuan(tuiguangyuanid, fandianbili, playerBonusRatio);

	*selectJob(){
		let data=this.request.body;
		let info =yield self.userDao.select("userId",data._id);
		if(info){
			this.body={"err":0,"data":info.job}
		}else
			this.body={"err":"user null"}
	}








	*userLogin(){
		let data=this.request.body;
		//get access
		let userinfo=yield Public.auto(this,data.code)
		if(userinfo.unionid){
			let select=yield self.userDao.select("unionid",userinfo.unionid)
			if(!select){
				let insert={
					"name":userinfo.nickname,
					"place":userinfo.country+userinfo.province+userinfo.city,
					"openid":userinfo.openid,
					"unionid":userinfo.unionid,
					"headimgurl":userinfo.headimgurl,
					"cardNum":0,
					"discount":0,
					"proportion":0,
					"proportion_p":0,
					"eMoney":0,
					"tMoney":0,
					"buyNum":0,
					"rechargeNum":0,
					"job":0,
					"admin":0

				}		//repart?:insert
				this.body ={"err":0,"data":yield self.userDao.insert(insert)}
				
			}else{
				this.body={"err":0,"data":select}
			}
			
		}
		else
			this.body = {"err":"wx server err"}

	}

	*gm(){
		let data=this.request.body;
		if(data.name&&data.pass){
			let login=yield self.adminDao.login(data.name,md5(config.key+data.pass))
			if(login){
				let text = fs.readFileSync('./app/views/gm.html');
				this.body=text.toString()

			}
			else
				this.body="账号或密码错误"
		}
		else{
			this.body="账号或密码错误"
		}
	}
	*register(){
		let data=this.request.body;
		if(data.name&&data.pass){
			let select=yield self.adminDao.login(data.name,md5(config.key+data.pass))
			//账号是否存在
			if(!select){
				let install=yield self.adminDao.insert({"name":data.name,"pass":md5(config.key+data.pass)})
				if(install){

				
						this.body="<!DOCTYPE html>"+
						"<html>"+
						"<head>"+
						    "<title></title>"+
						"</head>"+
						"<body>"+
						"注册成功<br/><br/><a href='gm.html'>前往登录页面<a/>"+
						"</body>"+
						"</html>"







				}
				else
					this.body="服务器错误注册失败"
			}
			else
				this.body="此账号已被注册"
		}
		else{
			this.body="账号或密码未填写"
		}
	}





}





module.exports = UserController;