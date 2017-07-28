var config=require('../config.js')
var fun=require('./function.js')
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