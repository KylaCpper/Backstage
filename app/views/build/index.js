/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var config={
	"appid":"wx06a885d249615565",
	"url":"http://h5.1357g.com/g/gm.app/",
	"server":"http://h5.1357g.com/g/gm.app/",
	"gameUrl":"https://a.mlinks.cc/AaIu",
	
	// "url":"http://127.0.0.1:3000/",
	// "server":"http://127.0.0.1:3000/",
	"list":{
    			"id1":{"money":"540","cardNum":"450","data":"540元获得300+150房卡"},
    			"id2":{"money":"900","cardNum":"750","data":"900元获得500+250房卡"},
    			"id3":{"money":"1800","cardNum":"1500","data":"1800元获得1000+500房卡"}
	},
	"head":
				[
					{"title":"我是经销商","child":[{"code":"player_card.show=1","title":"玩家充卡"},{"code":"buy_card.show=1","title":"购买房卡"},{"code":"reward.show=1","title":"奖励详情"},{"code":"card_sell.show=1","title":"售卡详情"}]},
					{"title":"我是推广员","child":[{"code":"extension.show=1","title":"推广详情"},{"code":"qrcode.show=1","title":"我要推广"}]},
					{"title":"个人信息","child":[{"code":"","title":"我的信息"}]},
					{"title":"客服","child":[{"code":"customer.show=1","title":"人工服务"}]}
				]
	,
	"head_":
		[
					{"title":"推广员后台","child":[{"code":"buildExtension.show=1","title":"生成推广员"},{"code":"extension.show=1","title":"推广员详情"},{"code":"extract.show=1","title":"提现详情"}]},
					{"title":"经销商后台","child":[{"code":"buildSeller.show=1","title":"生成经销商"},{"code":"seller.show=1","title":"经销商详情"}]},
					{"title":"公众号","child":[{"code":"qrcode.show=1","title":"关注公众号二维码"}]}
		]
	,
	"row":7,
	"discount":
	[
			"7","8","9"

	],
	"rebate":
	[
		{"buy":5,"give":1},
		{"buy":10,"give":1},
		{"buy":20,"give":1}
	]
	,
	"job":{
		"0":"无身份",
		"1":"经销商",
		"2":"推广员",
		"3":"经销商，推广员"
	},
	"seller":1,
	"extension":2,
	"all":3





}

module.exports =  config;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var config=__webpack_require__(0)

function fun(){

}

fun.prototype.pagec=function (that,num){
            var page=that.page
            var page_d=that.page_d
            var page_x=that.page_x
            if(!isNaN(num)){
                page_d=num
            }
            else if(num=="add"&&page_d<page)
                    page_d++
            else if(num=="reduce"&&page_d>=2)
                page_d--
            if(page_d===1){
                if(page!=1)
                    page_x=[1,2]
                else
                    page_x=[1]
            }
            else if(page_d<page)
                page_x=[page_d-1,page_d,page_d+1]
            else
                page_x=[page_d-1,page_d]
            if(page_d===1){
                that.index=0
            }
            else{
                that.index=(page_d-1)*that.row
            }


            that.page=page
            that.page_d=page_d
            that.page_x=page_x
}
fun.prototype.pagez=function (that){
            if(that.count!=0)
                that.page=Math.ceil(parseInt(that.count)/parseInt(that.row))
            that.pagec(1)
}
fun.prototype.page=function (that,data){
                    that.data=data;
                    // that.data=[
                    //             {"buyNum":"1","num":"","buyTime":""},
                    //             {"buyNum":"2","num":"","buyTime":""},
                    //             {"buyNum":"3","num":"","buyTime":""},
                    //             {"buyNum":"4","num":"","buyTime":""},
                    //             {"buyNum":"5","num":"","buyTime":""},
                    //             {"buyNum":"6","num":"","buyTime":""},
                    //             {"buyNum":"7","num":"","buyTime":""}
                    // ]
                    that.count=that.data.length
                    for(var i=0;i<config.row;i++)
                        that.data.push({})
                    that.page=Math.ceil(that.count/config.row)
                    if(that.count<=config.row)
                        that.row=that.count
                    else{
                        that.row=config.row
                        that.page_x=[1,2]
                    }   
}
fun.prototype.basic_alert=function (){
    $('#basic_alert').trigger("click")
}
fun.prototype.form_alert=function (){
    $('#form_alert').trigger("click")
}
fun.prototype.closeWindow=function (){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

        //alert(res.err_msg);

    });

}
//get url
fun.prototype.get=function (par){
    if(par){
    var local_url = document.location.href; 
    var get = local_url.indexOf(par +"=");
    if(get == -1){
        return 0;   
    }   
    var get_par = local_url.slice(par.length + get + 1);    
    var nextPar = get_par.indexOf("&");
    if(nextPar != -1){
        get_par = get_par.slice(0, nextPar);
    }
    return get_par;
    }
   return document.location.href;
 
}




module.exports = new fun();

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var config=__webpack_require__(0)
var fun=__webpack_require__(1)






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





/***/ })
/******/ ]);