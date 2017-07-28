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