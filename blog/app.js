/*
Ӧ�ó�������ļ�
*/
var express = require('express');

//����appaӦ��  =>nodeJs Http.createServer
var app = express();

//���þ�̬�ļ��й�(css��js��html)
//���û�����url��/public��ʼ����ôֱ�ӷ��ض�Ӧ__dirname + "/public�µ��ļ�
app.use('/public',express.static(__dirname + "/public"));

//����ģ��
var swig = require('swig');


//�������ݿ�ģ��
var mongoose = require('mongoose');

//����Ӧ��ģ��
//��һ��������ģ���׺�����ڶ���������������ģ�����ݷ���
app.engine('html',swig.renderFile);

app.set('views','./views');

//app.engine��һ������������ڶ�������һ��
app.set('view engine','html');

//�ڿ��������У�Ҫȡ��ģ�建��;Ĭ��true������ʱģ���޸Ĳ��ᷢ�����ݱ仯
swig.setDefaults({cache:false});


/*
���ݲ�ͬ���ܻ���ģ��
*/
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

app.get('/',function(req,res,next){
	res.render('index');
})

//����css

/* app.get('/main.css',function(req,res,next){
	res.setHeader('content-type','test/css');
	res.send('body {background:red}');
}) */

mongoose.connect();

app.listen(8081);