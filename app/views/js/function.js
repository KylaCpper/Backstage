var config=require('../config.js')

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