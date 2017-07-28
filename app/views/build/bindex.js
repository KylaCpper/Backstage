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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var config=__webpack_require__(0)
var fun=__webpack_require__(1)
var main = new Vue({
    el:"#main-content",
    mounted:function(){

              if(fun.get('option')=="extension"){

                if(!fun.get('code')){
                    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.appid+"&redirect_uri="+config.url+"/bindex.html?option="+fun.get('option')+"&response_type=code&scope=snsapi_userinfo&state="+fun.get('_id')+"#wechat_redirect";
                }
                else{


                    var data_={"_id":fun.get('state'),"code":fun.get('code')}
                    $.post(config.server+'addExtension',data_,function(data){
                        if(data.data){
                            if(isNaN(data.data.proportion))
                                data.data.proportion=0
                        }
                        else{
                            data.err="服务器繁忙"
                        }

                        if(!data.err){
                            main.name=data.data.name
                            main.give=Math.round(data.data.proportion*5)
                            main.proportion=data.data.proportion*100

                        }
                        else if(data.err==1){
                            main.name=data.data.name
                            main.give=Math.round(data.data.proportion*5)
                            main.proportion=data.data.proportion*100
                            
                        }
                        else{
                            main.pop=data.err

                        }
                        
                    })   
                }
              }





                 
            

        
        // $.post(config.server+'addExtension',data,function(data){
        //     basic_alert()    
        // })

       
    },
    data:{
        pop:"",
        name:"",
        give:0,
        proportion:0



        


    },
    computed:{

    },
    methods:{
        href:function(){
            window.location=config.gameUrl
        }


    }
})



window.addEventListener('popstate', function(event) {       
    fun.closeWindow()
});  

7

/***/ })
/******/ ]);