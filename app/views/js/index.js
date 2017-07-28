var config=require('../config.js')
var fun=require('./function.js')






if(!fun.get("_id")){
		if(!fun.get("code")){
			window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.appid+"&redirect_uri="+config.url+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
		}else{
						
					var data={"code":fun.get("code")}
						$.post(config.server+"login",data,function(data){
							if(!data.err){
								history.pushState(null,null,"?_id="+data.data._id);	
								window.location=window.location
							}
					})	
		}
}
else{
var sidebar = new Vue({
	el:"#sidebar",
	mounted:function(){

	},
	data:{
		head:config.head,
		be:0
	},
	computed:{

	},
	methods:{
		change_page:function(father,child){
			for(var i=0;i<this.head.length;i++){
				if(this.head[i].title==father)
					this.be=i
			}
			if(child.code){
			if(this.be==0){
					if(userinfo.data.job!=config.job[1]&&userinfo.data.job!=config.job[3]){
						basicModal.pop='不是经销商，请联系管理员'
						fun.basic_alert()
						basicModal.close=1
						return

				}					
			}
			if(this.be==1){
					if(userinfo.data.job!=config.job[2]&&userinfo.data.job!=config.job[3]){
						basicModal.pop='不是推广员，请联系管理员'
						fun.basic_alert()
						basicModal.close=1
						return

				}					
			}
				hide()
				eval("("+child.code+")")
				head.title.father=father
				head.title.child=child.title
				$("#toggle-left").trigger("click")

			}
			else
				$("#toggle-right").trigger("click")
			
		}
	}
})
var header = new Vue({
	el:"#header",
	mounted:function(){
	},
	data:{
		cardNum:0,
		headUrl:""
	},
	computed:{

	},
	methods:{
	}
})

// var cardNum = new Vue({
// 	el:"#cardNum",
// 	mounted:function(){
// 	},
// 	data:{
// 		cardNum:0
// 	},
// 	computed:{

// 	},
// 	methods:{
// 	}
// })
// var headUrl = new Vue({
// 	el:"#headUrl",
// 	mounted:function(){
// 	},
// 	data:{
// 		headUrl:0
// 	},
// 	computed:{

// 	},
// 	methods:{
// 	}
// })
var head = new Vue({
	el:"#head",
	mounted:function(){

	},
	data:{
		title:{"father":"点击左上方列表","child":""}
	},
	computed:{

	},
	methods:{
		showTitle:function(){
			$('#toggle-left').trigger('click')
		}
	}
})
var player_card = new Vue({
	el:"#player_card",
	mounted:function(){
		var data={"_id":fun.get('_id')}
    		$.post(config.server+'selectPlayers',data,function(data){
    			if(!data.err){
						fun.page(player_card,data.data)
    			}
    		})

	},
	data:{
		playerId:0,
		count:0,
		row:0,
		rows:config.row,
		page:1,
		page_d:1,
		page_x:[1],
		index:0,
		data:[
				{
					"playerId":"",
					"name":"",
					"cardNum":""
				}
		],
		player: {
					"playerId":"",
					"name":""
				},
		show:0
	},
	computed:{

	},
	methods:{
    	pagec:function(num){
    		fun.pagec(this,num)
    	},
    	pagez:function(){
			fun.pagez(this)
    	},
		select_player:function(){
			if(this.playerId){
	    		var data={"playerId":this.playerId}
				$.post(config.server+"selectPlayer",data,function(data){
						if(data.status){
							basicModal.pop="第三方服务错误"
							fun.basic_alert()
							basicModal.refresh=0
						}
						else if(!data.err){
								hide()
								player_card1.player=data.data;
								player_card1.player.cardNum=userinfo.data.cardNum
								player_card1.show=1

						}
						else{
							basicModal.pop="无此玩家"
							fun.basic_alert()
							basicModal.refresh=0
						}
				
				
				})
			}	
		},
		recharge:function(id,cardNum,name){
			if(id){
				hide()
				player_card1.player.playerId=id
				player_card1.player.buyNum=0
				player_card1.player.name=name
				player_card1.show=1
			}
		}
	}
})
var player_card1 = new Vue({
	el:"#player_card1",
	mounted:function(){

	},
	data:{
		player:{"playerId":"","cardNum":"","buyNum":0},
		show:0,
		be:0
	},
	computed:{

	},
	methods:{
		back:function(){
				hide()
				player_card.show=1
		},
		recharge:function(){
			if(this.be==0){
				this.be=1
				$('but_re').attr("disabled",true)
		    	var data={"_id":userinfo.data._id,"playerId":this.player.playerId,"cardNum":Number(this.player.buyNum),"name":this.player.name}
				$.post(config.server+"Rechange",data,function(data){
					player_card1.be=0
					$('but_re').attr("disabled",false)
						if(data.status){
								basicModal.pop="第三方服务错误"
								fun.basic_alert()
								basicModal.refresh=0
						}
						else if(!data.err){
							basicModal.pop="充值成功"
							fun.basic_alert()	
							basicModal.refresh=1
						}
						else{
							basicModal.pop=data.err
							fun.basic_alert()
							basicModal.refresh=0
						}
				})		
			}
		}
	}
})


var reward = new Vue({
	el:"#reward",
	mounted:function(){

	},
	data:{
		show:0,
		startTime:moment().subtract(30, 'days').format('YYYY-MM-DD'),
		endTime:moment().format('YYYY-MM-DD'),
		count:0,
		row:0,
		rows:config.row,
		page:1,
		page_d:1,
		page_x:[1],
		index:0,
		data:[
			{"buyNum":"","num":"","createTime":""}

		]


	},
	computed:{

	},
	methods:{
    	pagec:function(num){
    		fun.pagec(this,num)
    	},
    	pagez:function(){
			fun.pagez(this)
    	},
    	select:function(){
    		var data={
    			"startTime":this.startTime,"endTime":this.endTime
    		}
    		$.post(config.server+'selectReward',data,function(data){
    			if(!data.err){
    				var data_=data.data
    				for(var i=0;i<data_.length;i++)
    					data_[i].createTime=moment(data_[i].createTime).format('YYYY-MM-DD HH:mm:ss');
					fun.page(reward,data_)
    			}
    		})
    	}
	}
})


var card_sell = new Vue({
	el:"#card_sell",
	mounted:function(){

	},
	data:{
		show:0,
		startTime:moment().subtract(30, 'days').format('YYYY-MM-DD'),
		endTime:moment().format('YYYY-MM-DD'),
		count:0,
		row:0,
		rows:config.row,
		page:1,
		page_d:1,
		page_x:[1],
		index:0,
		data:[
			{"buyTime":"","_id":"","name":"","place":"","buyNum":""}

		]


	},
	computed:{

	},
	methods:{
    	pagec:function(num){
    		fun.pagec(this,num)
    	},
    	pagez:function(){
    		fun.pagez(this)
    	},
    	select:function(){
    		var data={
    			"startTime":this.startTime,"endTime":this.endTime
    		}
    		$.post(config.server+'selectSell',data,function(data){
    			if(!data.err){
    				var data_=data.data
    				for(var i=0;i<data_.length;i++)
    					data_[i].createTime=moment(data_[i].createTime).format('YYYY-MM-DD HH:mm:ss');
    				fun.page(card_sell,data_)
    			}
    		})
    	}
	}
})




var extension = new Vue({
	el:"#extension",
	mounted :function(){

	},
	data:{
		show:0,
		money_t:0,
		money_b:0,
		eMoney:0,
		dif:0,
		count:0,
		row:0,
		rows:config.row,
		page:1,
		page_d:1,
		page_x:[1],
		index:0,
		page:{
			"page":0,
			"page_d":0
		},
		data:[
			{"name":"","tMoney":"","discount":"","bMoney":""}

		]


	},
	computed:{

	},
	methods:{
		form_alert:function(){
			fun.form_alert()
		},
    	pagec:function(num){
    		fun.pagec(this,num)
    	},
    	pagez:function(){
    		fun.pagez(this)
    	}
	}
})
var userinfo = new Vue({
	el:"#userinfo",
	mounted:function(){
		var data={
			"key":"_id","value":fun.get("_id")
		}
		$.post(config.server+'selectUser',data,function(data){
			if(!data.err&&!data.status){
				var data_=data.data
				var job=data_.job
				data_.job=config.job[data_.job]
				data_.createTime=moment(data_.createTime).format('YYYY-MM-DD HH:mm:ss');
				userinfo.data=data_;
				header.cardNum=data_.cardNum
				player_card1.player.cardNum=data_.cardNum
				header.headUrl=data_.headUrl
			}
			if(!job){
				head.title.child="无权限请联系管理员"
			}
			if(data.status){
				head.title.child="无此用户"
				return 
			}

			var data={"_id":fun.get('_id')}
	    		$.post(config.server+'extension',data,function(data){
	    			if(!data.err){
	    				var data_=data.data
	    				//获取 每 返利
	    				for(var i=0;i<data_.length;i++){
	    					data_[i].bMoney=data_[i].tMoney*Number(userinfo.data.proportion)
	    					data_[i].proportion=Number(userinfo.data.proportion)*100+'%'
	    				}
	        				fun.page(extension,data.data)
	        			//获取总返利和充值
	    				for(var i=0;i<extension.data.length;i++){
	    					if(extension.data[i].tMoney&&extension.data[i].bMoney){
	    						extension.money_t+=Number(extension.data[i].tMoney)
	    						extension.money_b+=Number(extension.data[i].bMoney)
	    					}
	    				}
	    				extension.eMoney=Number(data.eMoney)
	    				//检测空值
	    				if(isNaN(extension.eMoney)){
	    					extension.eMoney=0
	    				}
	    				extension.dif=extension.money_b-extension.eMoney
	    				formModal.eMoney=extension.dif

	    			}
	    		})

		})
	},
	data:{
		data:{
			"name":"","extensionId":"","myJob":"","createTime":""
		}

		


	},
	computed:{

	},
	methods:{
		buy:function(){

		}
	}
})
var buy_card = new Vue({
	el:"#buy_card",
	mounted:function(){

	},
	data:{
		list:config.list,
		listId:0,
		show:0

		


	},
	computed:{

	},
	methods:{
    	buy:function(){
    		if(this.listId){
				var data={"_id":userinfo.data._id,"listId":this.listId,"openid":userinfo.data.openid}
	    		$.post(config.server+"buyCard",data,function(data){
	    			if(!data.err){
	    				var order=data.data
		    			WeixinJSBridge.invoke('getBrandWCPayRequest', order, function(res){
							if(res.err_msg == "get_brand_wcpay_request:ok"){
								basicModal.pop="支付成功"
								fun.basic_alert()
								basicModal.refresh=1
							}
							else if(res.err_msg=="get_brand_wcpay_request:cancel"){

							}
							else{
								basicModal.pop="支付失败，请重试"
								fun.basic_alert()
								basicModal.refresh=0
								buy_card.listId=0
							}

						});	
	    			}
	    			else{
						basicModal.pop=data.err
						fun.basic_alert()
						basicModal.refresh=0
	    			}
	    	

	    		})
	    	}
    	}
	}
})
var basicModal = new Vue({
	el:"#basicModal",
	mounted:function(){

	},
	data:{
		pop:"",
		refresh:0,
		close:0
		


	},
	computed:{

	},
	methods:{
		closeWindow:function(){
			if(this.close){
				//$("#toggle-left").trigger("click")
				this.close=0
			}

			if(this.refresh){
				window.location.href=window.location.href
			}
			

		}


	}
})

var formModal = new Vue({
	el:"#formModal",
	mounted:function(){

	},
	data:{
		eMoney:0,
		money:0,
		refresh:0
		


	},
	computed:{

	},
	methods:{
		closeWindow:function(){
			if(this.money!=0&&this.eMoney!=0&&this.money>0){
					var data={"money":this.money,"_id":userinfo.data._id}
					$.post(config.server+'extract',data,function(data){
						if(!data.err){
							alert("提现成功")
							window.location=window.location
						}
						else{
							alert(data.err)
						}
					})
			}else{
				alert("输入金额必须大于0")
			}

		}


	}
})

var qrcode = new Vue({
	el:"#qrcode",
	updated:function(){
			$.get(config.server+'buildQrcodeExtension?_id='+fun.get('_id'),function(data){
						if(!data.err){
								var options={
								    // render method: 'canvas', 'image' or 'div'
								    render: 'image',

								    // version range somewhere in 1 .. 40
								    minVersion: 1,
								    maxVersion: 40,

								    // error correction level: 'L', 'M', 'Q' or 'H'
								    ecLevel: 'L',

								    // offset in pixel if drawn onto existing canvas
								    left: 0,
								    top: 0,

								    // size in pixel
								    size: 250,

								    // code color or image element
								    fill: '#000',

								    // background color or image element, null for transparent background
								    background: null,

								    // content
								    text: data.data,

								    // corner radius relative to module width: 0.0 .. 0.5
								    radius: 0,

								    // quiet zone in modules
								    quiet: 0,

								    // modes
								    // 0: normal
								    // 1: label strip
								    // 2: label box
								    // 3: image strip
								    // 4: image box
								    mode: 2,

								    mSize: 0.1,
								    mPosX: 0.5,
								    mPosY: 0.5,

								    label: '推广',
								    fontname: 'sans',
								    fontcolor: '#000',

								    image: null
								}
								    $("#addex").qrcode(options);


						}

			})

	},
	data:{
		img:"",
		show:0

		


	},
	computed:{

	},
	methods:{

	}
})

var customer = new Vue({
	el:"#customer",
	mounted:function(){


	},
	data:{
		show:0

		


	},
	computed:{

	},
	methods:{

	}
})




}
function hide(){
    player_card.show=0
    reward.show=0
    card_sell.show=0
    extension.show=0
    userinfo.show=0
    player_card1.show=0
    buy_card.show=0
    qrcode.show=0
    customer.show=0
}


window.addEventListener('popstate', function(event) {		
	fun.closeWindow()
});  

$("#toggle-right").trigger("click")



