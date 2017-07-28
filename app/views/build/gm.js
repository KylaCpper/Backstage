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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var config=__webpack_require__(0)
var fun=__webpack_require__(1)
var sidebar = new Vue({
	el:"#sidebar",
	mounted:function(){

	},
	data:{
		head:config.head_,
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
				hide_()
				eval("("+child.code+")")
				head.title.father=father
				head.title.child=child.title
				$("#toggle-left").trigger("click")

			}
			
		}
	}
})


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
var buildExtension =new Vue({
	el:"#buildExtension",
	mounted:function(){

	},
	data:{
		show:0,
		data:{
			"proportion":"",
			"proportion_p":"",
			"admin":fun.get('admin')
		}
	},
	computed:{

	},
	methods:{
		buildExtensioner:function(){
	        $.get(config.server+'buildQrcodeExtensioner',this.data,function(data){
							  	$("#img_e").empty();
							  	var options={
							    // render method: 'canvas', 'image' or 'div'
							    render: 'image',

							    // version range somewhere in 1 .. 40
							    minVersion: 1,
							    maxVersion: 40,

							    // error correction level: 'L', 'M', 'Q' or 'H'
							    ecLevel: 'H',

							    // offset in pixel if drawn onto existing canvas
							    left: 0,
							    top: 0,

							    // size in pixel
							    size: 250,

							    // code color or image element
							    fill: '#000',

							    // background color or image element, null for transparent background
							    background: '#fff',

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

							    label: '推广员',
							    fontname: 'sans',
							    fontcolor: '#000',

							    image: null
							}
							  	$("#img_e").qrcode(options);

	        })

		}

	}

})






var buildSeller =new Vue({
	el:"#buildSeller",
	mounted:function(){

	},
	data:{
		show:0,
		data:{
			"discount":"",
			"admin":fun.get('admin')
		}
	},
	computed:{

	},
	methods:{
		buildSeller:function(){
	        $.get(config.server+'buildQrcodeSeller',this.data,function(data){
							  $("#img_s").empty();
							  	var options={
							    // render method: 'canvas', 'image' or 'div'
							    render: 'image',

							    // version range somewhere in 1 .. 40
							    minVersion: 1,
							    maxVersion: 40,

							    // error correction level: 'L', 'M', 'Q' or 'H'
							    ecLevel: 'H',

							    // offset in pixel if drawn onto existing canvas
							    left: 0,
							    top: 0,

							    // size in pixel
							    size: 250,

							    // code color or image element
							    fill: '#000',

							    // background color or image element, null for transparent background
							    background: '#fff',

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

							    label: '经销商',
							    fontname: 'sans',
							    fontcolor: '#000',

							    image: null
							}
							  	$("#img_s").qrcode(options);

	        })

		}

	}

})

var qrcode =new Vue({
	el:"#qrcode",
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

var extension = new Vue({
	el:"#extension",
	mounted:function(){
		// var data={"_id":get('_id')}
  //   		$.post(config.server+'selectPlayers',data,function(data){
  //   			console.log("selectPlayers",data)
  //   			if(!data.err){
		// 				page(player_card,data.data)
  //   			}
  //   		})
  			$.post(config.server+"selectNow_extension",function(data){
  				extension.head=data
  			})

	},
	data:{
		head:{},
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
		select:function(){
	    		var data={"startTime":this.startTime,"endTime":this.endTime}
				//$.post(config.server+"selectUsers",data,function(data){
				$.post(config.server+"selectExtensioner",data,function(data){
						if(data.status){
							basicModal.pop="第三方服务错误"
							fun.basic_alert()
							basicModal.refresh=0
						}
						else if(!data.err){
							fun.page(extension,data.data)

						}
						else{
							basicModal.pop="该时间段无推广详情"
							fun.basic_alert()
							basicModal.refresh=0
						}
				
				
				})
		},
		change:function(index){
			hide_()
			change1.show=1
			change1.data=this.data[index]

		}
		
	}
})
var seller = new Vue({
	el:"#seller",
	mounted:function(){
		// var data={"_id":get('_id')}
  //   		$.post(config.server+'selectPlayers',data,function(data){
  //   			console.log("selectPlayers",data)
  //   			if(!data.err){
		// 				page(player_card,data.data)
  //   			}
  //   		})
  			$.post(config.server+"selectNow_seller",function(data){
  					seller.head=data
  			})

	},
	data:{
		head:{},
		count:0,
		startTime:moment().subtract(30, 'days').format('YYYY-MM-DD'),
		endTime:moment().format('YYYY-MM-DD'),
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
		select:function(){
			
	    		var data={"startTime":this.startTime,"endTime":this.endTime}
				//$.post(config.server+"selectUsers",data,function(data){
				$.post(config.server+"selectSeller",data,function(data){	
						if(data.status){
							basicModal.pop="第三方服务错误"
							fun.basic_alert()
							basicModal.refresh=0
						}
						else if(!data.err){
							fun.page(seller,data.data)

						}
						else{
							basicModal.pop="该时间段无经销详情"
							fun.basic_alert()
							basicModal.refresh=0
						}
				
				
				})
		},
		change:function(index){
			hide_()
			change.show=1
			change.data=this.data[index]

		}
		
	}
})

var extract = new Vue({
	el:"#extract",
	mounted:function(){
		// var data={"_id":get('_id')}
  //   		$.post(config.server+'selectPlayers',data,function(data){
  //   			console.log("selectPlayers",data)
  //   			if(!data.err){
		// 				page(player_card,data.data)
  //   			}
  //   		})
  			$.post(config.server+"selectNow_extract",function(data){
  					extract.head=data
  			})
	},
	data:{
		head:{},
		count:0,
		startTime:moment().subtract(30, 'days').format('YYYY-MM-DD'),
		endTime:moment().format('YYYY-MM-DD'),
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
		select:function(){
			
	    		var data={"startTime":this.startTime,"endTime":this.endTime}
				//$.post(config.server+"selectUsers",data,function(data){
				$.post(config.server+"selectExtract",data,function(data){	
						if(data.status){
							basicModal.pop="第三方服务错误"
							fun.basic_alert()
							basicModal.refresh=0
						}
						else if(!data.err){
							for(var i=0;i<data.data.length;i++){
								data.data[i].createTime=moment(data.data[i].createTime).format('YYYY-MM-DD HH:mm:ss')
								if(data.data[i].endTime)
									data.data[i].endTime=moment(data.data[i].endTime).format('YYYY-MM-DD HH:mm:ss')
							}
							fun.page(extract,data.data)

						}
						else{
							basicModal.pop="该时间段无用户申请提现"
							fun.basic_alert()
							basicModal.refresh=0
						}
				
				
				})
		},
		change:function(index){
			// hide_()
			// extract_.show=1
			// extract_.data=this.data[index]
			form_alert()
			formModal.data=this.data[index]
			
		}
		
	}
})



var change1 = new Vue({
	el:"#change1",
	mounted:function(){

	},
	data:{
		show:0,
		data:{
			"_id":"",
			"name":"",
			"proportion":"",
			"proportion_p":""

		}
		


	},
	computed:{

	},
	methods:{
		change:function(){
			var data={"_id":this.data._id,"proportion":this.data.proportion,"proportion_p":this.data.proportion_p}
			$.post(config.server+"changePercentageExtension",data,function(data){	
				if(data.err==0){
					basicModal.pop="修改成功"
					
				}
				else{
					basicModal.pop="修改失败，请稍后重试"
				}
					fun.basic_alert()


			})
		
		},
		back:function(){
			hide_()
			extension.show=1

		}

	}
})

var change = new Vue({
	el:"#change",
	mounted:function(){

	},
	data:{
		show:0,
		data:{
			"_id":"",
			"name":"",
			"discount":""
		

		}
		


	},
	computed:{

	},
	methods:{
		change:function(){
			var data={"_id":this.data._id,"discount":this.data.discount}
			$.post(config.server+"changeDiscountSeller",data,function(data){	
				if(!data.err){
					alert("修改成功")
				}
				else{
					alert(data.err)	
				}



			})
		
		},
		back:function(){
			hide_()
			seller.show=1

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
		data:0
		


	},
	computed:{

	},
	methods:{
		closeWindow:function(){
			$.post(config.server+"giveMoney",this.data,function(data){
				if(!data.err)
					alert("修改成功")
				else
					alert(data.err)
			})

		}


	}
})

function hide_(){
    buildExtension.show=0
    extension.show=0
    buildSeller.show=0
    seller.show=0
    change.show=0
    change1.show=0
    extract.show=0
}

/***/ })
/******/ ]);