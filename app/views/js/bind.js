var config=require('../config.js')
var fun=require('./function.js')
var main=new Vue({
    el:'#main-content',
    mounted:function(){
        


            if(fun.get('option')=="seller"){
                if(!fun.get('code')){
                    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.appid+"&redirect_uri="+config.url+"/bind.html?option="+fun.get('option')+"&response_type=code&scope=snsapi_userinfo&state="+fun.get('id')+"#wechat_redirect";
                }
                else{

                    var data_={"code":fun.get('code'),"id":fun.get("state")}
                $.post(config.server+'bindSeller',data_,function(data){
                    if(!data.err){
                        main.pop="您已成为经销商"
                        main.id=""
                        main.id1=""
                        main.name=""     
                        main.proportion="" 
                        main.proportion_p="" 
                        main.discount="您的购卡折扣比率"+data.data.discount         
                    }
                    else if(data.err==1){
                        window.location=config.url
                    }
                    else if(data.err==2){
                              main.pop="该二维码已被注册过"
                              main.id="注册该二维码id："
                              main.id1=data.data.userId
                              main.name="注册该二维码用户："+data.data.name
                              main.proportion="" 
                              main.proportion_p="" 
                              main.discount="" 
                    }
                    else{
                        main.pop=data.err
                        main.id=""
                        main.id1=""
                        main.name=""   
                        main.proportion="" 
                        main.proportion_p="" 
                        main.discount="" 
                    }

                    
                })   
                }
            }
            if(fun.get('option')=="extensioner"){
                if(!fun.get('code')){
                    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.appid+"&redirect_uri="+config.url+"/bind.html?option="+fun.get('option')+"&response_type=code&scope=snsapi_userinfo&state="+fun.get('id')+"#wechat_redirect";
                }
                else{

                    var data_={"code":fun.get('code'),"id":fun.get('state')}
                    
                        $.post(config.server+'bindExtension',data_,function(data){
                        if(!data.err){
                            main.pop="您已成为推广员"
                            main.id=""
                            main.id1=""
                            main.name=""   
                            main.proportion="您的回馈反比率"+data.data.proportion 
                            main.proportion_p="玩家反卡比率"+data.data.proportion_p 
                            main.discount="" 
                        }
                        else if(data.err==1){
                              window.location=config.url
                        }
                        else if(data.err==2){
                              main.pop="该二维码已被注册过"
                              main.id="注册该二维码id："
                              main.id1=data.data.userId
                              main.name="注册该二维码的用户："+data.data.name
                              main.proportion="" 
                              main.proportion_p="" 
                              main.discount="" 
                        }
                        else{
                            main.pop=data.err
                            main.id=""
                            main.id1=""
                            main.name="" 
                            main.proportion="" 
                            main.proportion_p="" 
                            main.discount="" 
                        }

                        
                        })
                    }
            }


    },
    data:{
        pop:"",
        id:"",
        id1:"",
        name:"",
        proportion:"",
        proportion_p:"",
        discount:""


    },
    computed:{
    },
    methods:{
        href:function(){
            window.location=config.url
        }
    }

})



window.addEventListener('popstate', function(event) {       
    fun.closeWindow()
});  

