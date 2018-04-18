//var app = require('http').createServer();
//var io = require('socket.io')(app);
//var PORT = 8081;
var express = require('express');
var app = express();
//var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8081;

app.get('/index.html', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

/*静态资源部署 */
app.use('/css', express.static("css"));
app.use('/js', express.static("js"));
app.use('/images', express.static("images"));
app.use('/node_modules', express.static("node_modules"));

/*定义用户数组*/
var users = [];

//app.listen(PORT);

io.on('connection', function (socket) {
	/*是否是新用户标识*/
	var isNewPerson = true;
	/*当前登录用户*/
	var username = null;
	var userimg = null;
	/*监听登录*/
	socket.on('login', function (data) {
		//console.log(data.userimg);
		for (var i = 0; i < users.length; i++) {
			if (users[i].username === data.username) {
				isNewPerson = false;
				break;
			} else {
				isNewPerson = true;
			}
		}
		if (isNewPerson) {
			username = data.username;
			userimg = data.userimg;
			//	alert(userimg);
			users.push({
				username: data.username,
				userimg: data.userimg			
			});
			/*登录成功*/
			socket.emit('loginSuccess', data);
			/*在线人数*/
			io.sockets.emit('system', { user: username, num: users.length, type: 'login' });
			/*向所有连接的客户端广播add事件*/
			io.sockets.emit('add', data);

		} else {
			/*登录失败*/
			socket.emit('loginFail', '');
		}
	});

	/*监听发送消息*/
	socket.on('sendMessage', function (data) {
		io.sockets.emit('receiveMessage', data);
	});

	/*退出登录*/
	socket.on('disconnect', function () {

		users.map(function (val, index) {

			if (val.username === username) {
				users.splice(index, 1);
			}
		});
		// socket.broadcast.emit('system', username, users.length);

		/*向所有连接的客户端广播leave事件*/
		//			io.sockets.emit('leave',username);
		io.sockets.emit('system', { user: username, num: users.length, type: 'logout' });
	});

	// socket.on('onlinenum',function(){
	// 		io.sockets.emit()
	// });
});

http.listen(port, function () {
	console.log('listening on *: ' + port + "    http://localhost:8081/index.html");
});

//console.log('app listen at: '+PORT);