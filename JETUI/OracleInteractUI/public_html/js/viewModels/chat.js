/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * chat module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'socket.io'
], function (oj, ko, $, io) {
	/**
	 * The view model for the main content view template
	 */
	function chatContentViewModel() {
		var self = this;
		
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
		alert(getParameterByName("id"));

		//var self = this;
		$(function () {
			/*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/
			//var socket = io('ws://localhost:8081');
			var socket = io();
			/*定义用户名*/
			var uname = null;

			/*登录*/
			$('.login-btn').click(function () {
				uname = $.trim($('#loginName').val());
				if (uname) {
					/*向服务端发送登录事件*/
					socket.emit('login', {username: uname});
				} else {
					alert('请输入昵称');
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

			/*新人加入提示*/
			socket.on('add', function (data) {
				var html = '<p>系统消息:' + data.username + '已加入群聊</p>';
				$('.chat-con').append(html);
			});

			/*接收消息*/
			socket.on('receiveMessage', function (data) {
				showMessage(data);
			});

			/*退出群聊提示*/
			socket.on('leave', function (name) {
				if (name !== null) {
					var html = '<p>' + name + '已退出群聊</p>';
					$('.chat-con').append(html);
				}
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
					socket.emit('sendMessage', {username: uname, message: txt});
				}
			}

			/*显示消息*/
			function showMessage(data) {
				var html;
				if (data.username === uname) {
					html = '<div class="chat-item item-right clearfix"><span class="img fr"></span><span class="message fr">' + data.message + '</span></div>';
				} else {
					html = '<div class="chat-item item-left clearfix rela"><span class="abs uname">' + data.username + '</span><span class="img fl"></span><span class="fl message">' + data.message + '</span></div>';
				}
				$('.chat-con').append(html);
			}

		});

	}

	return chatContentViewModel;
});
