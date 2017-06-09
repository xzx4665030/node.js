/*
应用程序入口文件
*/
var express = require('express');

//创建appa应用  =>nodeJs Http.createServer
var app = express();

//设置静态文件托管(css、js、html)
//当用户访问url以/public开始，那么直接返回对应__dirname + "/public下的文件
app.use('/public',express.static(__dirname + "/public"));

//加载模板
var swig = require('swig');


//加载数据库模块
var mongoose = require('mongoose');

//配置应用模板
//第一个参数是模板后缀名；第二个参数解析处理模板内容方法
app.engine('html',swig.renderFile);

app.set('views','./views');

//app.engine第一个参数与这个第二个参数一致
app.set('view engine','html');

//在开发过程中，要取消模板缓存;默认true，上线时模板修改不会发生内容变化
swig.setDefaults({cache:false});


/*
根据不同功能划分模块
*/
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

app.get('/',function(req,res,next){
	res.render('index');
})

//加载css

/* app.get('/main.css',function(req,res,next){
	res.setHeader('content-type','test/css');
	res.send('body {background:red}');
}) */

mongoose.connect();

app.listen(8081);