var config=require('../config.js')
var fun=require('./function.js')
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