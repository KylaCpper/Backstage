const PluginBase = require('../../core/base/PluginBase');
const Weixin = require('./weixin');
class WeixinPlugin extends PluginBase{
	getPluginName(){
		return "weixin";
	}

	getPluginObj(){
		return new Weixin({
			appid:"wx06a885d249615565",
			secret:"a84701bbed690e30ae5d83bee71c8fd9",
			eckey:"",
			token:""
		});
	}
}
module.exports = WeixinPlugin;