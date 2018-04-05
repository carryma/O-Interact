//var app = require('http').createServer();
//var io = require('socket.io')(app);
//var PORT = 8081;
var express = require('express');
var app = express();
//var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/css',express.static("css"));
app.use('/js',express.static("js"));
app.use('/images',express.static("images"));
app.use('/node_modules',express.static("node_modules"));
//app.use(express.static('css'));
//app.use(express.static('js'));
//app.use(express.static('images'));
//app.use(express.static(path.join(__dirname, 'css')));

/*定义用户数组*/
var users = [];

//app.listen(PORT);

io.on('connection', function (socket) {
	/*是否是新用户标识*/
	var isNewPerson = true; 
	/*当前登录用户*/
    var username = null;
	/*监听登录*/
	socket.on('login',function(data){
		for(var i=0;i<users.length;i++){
	        if(users[i].username === data.username){
	          	isNewPerson = false;
	          	break;
	        }else{
	          	isNewPerson = true;
	        }
	    }
	    if(isNewPerson){
	        username = data.username;
	        users.push({
	          username:data.username
	        });
	        /*登录成功*/
	        socket.emit('loginSuccess',data);
	        /*向所有连接的客户端广播add事件*/
	        io.sockets.emit('add',data);
	    }else{
	    	/*登录失败*/
	        socket.emit('loginFail','');
	    }  
	});

	/*监听发送消息*/
	socket.on('sendMessage',function(data){
        io.sockets.emit('receiveMessage',data);
    });

	/*退出登录*/
	socket.on('disconnect',function(){
		/*向所有连接的客户端广播leave事件*/
      	io.sockets.emit('leave',username);
      	users.map(function(val,index){
        if(val.username === username){
          	users.splice(index,1);
        }
      });
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port + "      localhost:3000");
});

//console.log('app listen at: '+PORT);