var argv = require('yargs')
        .default('port', 3000)
        .default('poolSize', 1)
        .boolean('debugout')
        .boolean('dev')
        .describe('ss', '--ss=ip:port')
        .demand('mongo')
        .describe('mongo', '--mongo=user:pass@127.0.0.1/dbBase')
        .default('user','')
        .default('pass','')
        .describe('mysql','--mysql=root:123456@127.0.0.1')
        .argv;
var opt = {
    user: argv.user,
    pass: argv.pass,
    "server":{poolSize:argv.poolSize}
};
var a=1

var mysqlConfig={};
if (argv.mysql!=null) {
    if (typeof argv.mysql !=='string') {
        console.log('必须指定mysql --mysql=root:123456@127.0.0.1'.red);
        return process.exit(-1);
    }

    var detector =/^(.*):(.*)@(.*)$/;
    var parts =detector.exec(argv.mysql);
    if (!parts) {
        console.log('mysql格式不对 --mysql=root:123456@127.0.0.1'.red);
        return process.exit(-1);
    }
    var ip_port =parts[3].split(':');
    mysqlConfig={
        host: ip_port[0],
        user: parts[1],
        password: parts[2],
        port: ip_port[1],
        multipleStatements: true
    }
}






var publicIP=require('localIP')
var koa = require('koa');
var router = require('koa-router')();
var path = require('path');
var fs = require('fs');
var app = koa();
var koaBody = require('koa-body')();
var DBManager = require('./core/db/DBManager');
var db = new DBManager('mongodb://'+argv.mongo,{opt});

var mysql = require('koa-mysql');
var mdb = mysql.createPool({ user: mysqlConfig.user, password: mysqlConfig.password, database: 'hgame', host: mysqlConfig.host });

var serve = require('koa-router-static');
var parser = require('co-wechat-parser');
var xmlParser = require('koa-xml-body').default;
app.dbManager = db.loadModel();
app.use(xmlParser({
    xmlOptions:{ explicitArray : false}
}));
 

var jrpc = new (require('jrpc-client'))()
    .connect(argv.ss).on("connect",function(data){console.log(data)})

jrpc.call('serverinfo', {
            productName: 'hgame', $: {
                upsert: {
                    c: { platformID: "Seller", serverID: "1" }, set: {
                        clusterID: "Seller" + '_' + "1", data: {
                            ip: publicIP,
                            port: argv.port,
                            key:"tyjhhgfdsaasd",
                        }, time: new Date()
                    }
                }
            }
        });


app.use(function *(next) {
    if(this.request.url=='/')
        this.request.url='/index.html'
    if(this.request.url=="/callback")
        this.request.xml = this.request.body;
        //this.response.type='image/jpeg'
    if(this.request.url=="/gm.html"&&this.request.method=="GET")
        this.request.url="/login.html"
    

        this.mdb=mdb




     yield next;
});

app.use(koaBody);
//设置头信息

app.use(function *(next){
    this.set({
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, authorization"

    });
    yield next;
});
const Main = require('./app/main');
new Main(router,app);


const PluginLoader = require('./core/base/PluginLoader');
new PluginLoader(app);
//----------------load apps------------
/*var appsPath = path.join(__dirname,"app");
var apps = fs.readdirSync(xappsPath);
apps.forEach(function(item){
    var dirPath = appsPath + path.sep + item;
    if(fs.statSync(dirPath).isDirectory()){
       new IOTBase(router,dirPath,db);
    }
});
*/





//错误统一处理



app.use(function *(next) {

  if (this.request.method == 'POST') {
    // => POST body
    //this.request.body = JSON.parse(this.request.body);
  }
  yield next;
});



app.use(function *(next){

    try {
        yield* next;
    } catch(e) {
        var status = e.status || 500;
        var message = e.message || '服务器错误';
        this.body = {
            'status': status,
            'message': message
        };
        this.app.emit('error', e, this);
    }
});

app.use(router.routes());
router.get('/*', serve('./app/views/'));
process.on('uncaughtException', function (err) {
    console.log(err);
})
app.listen(argv.port);
// app.listen(3010);
