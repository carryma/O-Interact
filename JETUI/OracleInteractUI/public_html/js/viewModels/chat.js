/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * chat module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'socket.io', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel'
], function (oj, ko, $, io) {
	/**
	 * The view model for the main content view template
	 */
	function chatContentViewModel() {

		function getParameterByName(paramName) {
			var args = new Object();
			var argsStr = location.search;  //获取URL参数字符串
			if (argsStr.length > 0) {
				argsStr = argsStr.substring(1);
				var nameValueArr = argsStr.split("&");  //多参数
				for (var i = 0; i < nameValueArr.length; i++) {
					var pos = nameValueArr[i].indexOf('=');
					if (pos === -1)
						continue; //如果没有找到就跳过
					var argName = nameValueArr[i].substring(0, pos); //提取name
					var argVal = nameValueArr[i].substring(pos + 1); //提取value
					args[argName] = unescape(argVal);
				}
				return args[paramName];
			}
		}

		var self = this;
		self.nickname = ko.observable();
		self.headimage = ko.observable();
		self.number =ko.observable(0);
		//alert(getParameterByName("id"));

		/*电脑用户获取"Administrator",微信用户自动使用昵称和头像登陆*/
		if (getParameterByName("id") === undefined) {
			self.nickname("Administrator");
			//self.headimage("http://thirdwx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLBoptzE8yfj7tpL76MiaM89BFMO817SVX7B7Kr77764E9DCY0wsfl0YDibhMgH5icACOTdaGEuPIHjvg/132");
			self.headimage("../../images/default_head_image.jpg");
		} else {
			$.ajaxSetup({ async: false });
			//var url = "http://localhost:8081/userinfo/" + getParameterByName("id");		
			var getUrl = "http://yayma.tunnel.echomod.cn/userinfo/"+getParameterByName("id");
			//"http://www.kanma.tunnel.echomod.cn/userinfo/" + getParameterByName("id");
			//$.getUrl()跨域问题的解决
			$.getJSON(
				"http://eezzo.com/API/CD",
				{ url: encodeURI(getUrl) },
				//{id:getParameterByName("id")},
				function (data) {
					self.nickname(data.nickname);
					self.headimage(data.headImg);
				}
			);
		}
		//alert(self.nickname());
		$(function () {
			/*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/
			//var socket = io('ws://localhost:8081');
			var socket = io();
			/*定义用户名*/
			var uname = null;
			var loginimg = null;
			/*登录*/
			$('.login-btn').click(function () {
				uname = $.trim($('#loginName').val());
				//loginimg = $.trim($('#loginImg')[0].src);
				//alert(loginimg);
				if (uname) {
					/*向服务端发送登录事件*/
					socket.emit('login', { username: uname});
				} else {
					alert('请输入昵称');
				}
			});
			$(document).keydown(function (event) {
				if (event.keyCode === 13) {
					uname = $.trim($('#loginName').val());
					//loginimg = $.trim($('#loginImg')[0].src);
					//alert(loginimg);
					if (uname) {
						/*向服务端发送登录事件*/
						socket.emit('login', { username: uname});
					} else {
						alert('请输入昵称');
					}	
				}
			});


			/*发送消息*/
			$('.sendBtn').click(function () {
				sendMessage();
			});
			$(document).keydown(function (event) {
				if (event.keyCode === 13) {
					sendMessage();
				}
			});

			/*登录成功*/
			socket.on('loginSuccess', function (data) {
				//alert(data.loginimg);
				if (data.username === uname) {
					checkin(data);
				} else {
					alert('用户名不匹配，请重试');
				}
			});

			/*登录失败*/
			socket.on('loginFail', function () {
				alert('昵称重复');
			});

			// /*新人加入提示*/
			// socket.on('add', function (data) {
			// 	var html = '<p>系统消息:' + data.username + '已加入群聊</p>' + '<br>';
			// 	$('.chat-con').append(html);
				
			// });

			/*接收消息*/
			socket.on('receiveMessage', function (data) {
				//$("#msgImg").attr('src', data.loginimg);
				showMessage(data);
			});

			/*退出群聊提示*/
			// socket.on('leave', function (name) {
			// 	if (name !== null) {
			// 		var html = '<p>' + name + '已退出群聊</p>' + '<br>';
			// 		$('.chat-con').append(html);
			// 	}
			// });
			socket.on('leave', function (name) {
				if (name !== null) {
					var html = '<p>' + name + '已退出群聊</p>' + '<br>';
					$('.chat-con').append(html);
				//	document.getElementById('#status').innerHTML=number +'users online';
				}
			});
			// socket.on('system', function (name,count) {
			// 	if (name !== null) {
			// 		var html = '<p>' + name + '已退出群聊</p>' + '<br>';
			// 		$('.chat-con').append(html);
			// 		document.getElementById('#status').innerHTML=count +'users online';
			// 	}
			// });

			// /*在线人数统计*/	
			// socket.on('onlinenum',function(count){
			// 	var test ='<p>'+count +'users online</p>';
			// 		$('#status').append(test);
			// });

			socket.on('system',function(date){
				var msg= '<p>'+'System: '+ date.user + (date.type=='login'? ' joined':' left')+'</p>'+'<br>';
				var test ='<p>'+date.num +'users online</p>';
				self.number(date.num);
				$('.chat-con').append(msg);
				//document.getElementById('#status').innerHTML=date.num;
			});


			/*隐藏登录界面 显示聊天界面*/
			function checkin(data) {
				$('.login-wrap').hide('slow');
				$('.chat-wrap').show('slow');
			}

			/*发送消息*/
			function sendMessage() {
				var txt = $('#sendtxt').val();
				$('#sendtxt').val('');
				if (txt) {
					socket.emit('sendMessage', { username: uname, message: txt });
				}
			}

			/*显示消息*/
			function showMessage(data) {
				var html;
				if (data.username === uname) {
					html = '<div class="chat-item item-right clearfix"><img id="msgImg" class="imgstyle fr" src="../../images/default_head_image.jpg" alt=""></img><span class="message fr">' + data.message + '</span></div>';
					//alert(self.headimage());
				} else {
					html = '<div class="chat-item item-left clearfix rela"><img id="msgImg" class="imgstyle fl" src="../../images/default_head_image.jpg" alt=""></img><span class="abs uname">' + data.username + '</span><span class="img fl"></span><span class="fl message">' + data.message + '</span></div>';
				}
				$('.chat-con').append(html);
				$('.chat-wrap').scrollTop($('.chat-wrap')[0].scrollHeight);
				//alert($("#msgImg")[0].src);
				//alert($("#msgImg").attr('src', this.headimage()));;
			}

		});


	}

	return chatContentViewModel;
});
