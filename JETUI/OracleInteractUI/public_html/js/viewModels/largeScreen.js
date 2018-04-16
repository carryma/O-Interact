/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * largeScreen module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'socket.io'],
 function(oj, ko, $, io) {
    /**
     * The view model for the main content view template
     */
    function largeScreenContentViewModel() {
        var self = this;
        $(function () {
        function randomColor(){//随机颜色  
            var color=Math.ceil(Math.random()*16777215).toString(16);  
            while(color.length < 6){  
                color = "0" + color;  
            }  
            return color;  
        }  
        
        var socket = io();
	socket.on('receiveMessage', function (data) {
                var node = $('<div class=move>'+data.message+'</div>')
                node.css('top', Math.random()*400+"px");
                node.css('color', "#"+randomColor());
                node.css('font-size',"24px");
                node.bind('animationend', function(event) {
                    $(event.target).remove();
                });
                $("#barrage").append(node);//插入子节点
            });
        });
    }
    
    return largeScreenContentViewModel;
});
