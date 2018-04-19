/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * largeScreen module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'socket.io'],
    function (oj, ko, $, io) {
        /**
         * The view model for the main content view template
         */
        function largeScreenContentViewModel() {
            var self = this;
            self.toChatroom = function () {
                window.location.href = "http://localhost:8081/index.html?root=chat";

            };
            self.lottery = function () {
                window.location.href = "http://localhost:8081/index.html?root=lottery";

            };
            self.sign = function () {

                window.open("http://localhost:8081/index.html?root=checkin");
            };

            $(function () {
                function randomColor() {//随机颜色  
                    var color = Math.ceil(Math.random() * 16777215).toString(16);
                    while (color.length < 6) {
                        color = "0" + color;
                    }
                    return color;
                }

                var socket = io();
                socket.on('receiveMessage', function (data) {
                    var node = $('<div class=move><img id="msgImg"  style=" width: 70px; height: 70px;" src=' + data.userimg + '> </img><span id="sp" style ="border:4px solid; ">' + data.message + '</span></div>');
                    node.css('top', parseInt(10 * Math.random()) * 70 + "px");
                    console.log(parseInt(10 * Math.random()));
                    node.css('color', "#" + randomColor());
                    node.css('font-size', "50px");
                    $("#sp").css('border', "#" + randomColor());
                    node.bind('animationend', function (event) {
                        $(event.target).remove();
                    });
                    $("#barrage").append(node);//插入子节点
                });
            });
        }

        return largeScreenContentViewModel;
    });
