/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputnumber'],
        function (oj, ko, $) {



        this.lottery_down = function (headImage, nickName, number) {
        var nametxt = $('.slot');
                console.log(nametxt);
                var nickNametxt = $('.name');
                var pcount = headImage.length - 1; //参加人数
                console.log(pcount);
                var runing = $('#start').text() == "Start" ? true : false;
                var trigger = true;
                var num = 0;
                var Lotterynumber = number; //设置单次抽奖人数
                var count = Lotterynumber;
                if (runing) {
        console.log(runing);
                if (pcount <= Lotterynumber) {
        alert("There are only " + pcount + " person. Please set lottery number smaller!");
        } else {
        runing = false;
                $('#start').text('Stop');
                startNum()
        }

        } else {
        $('#start').text('Extracting(' + Lotterynumber + ')');
                zd();
        }





// 循环参加名单
        function startNum() {
        num = Math.floor(Math.random() * pcount);
                nametxt.css('background-image', 'url(' + headImage[num] + ')');
                nickNametxt.html(nickName[num]);
                t = setTimeout(startNum, 0);
        }

// 停止跳动
        function stop() {
        pcount = headImage.length - 1;
                clearInterval(t);
                t = 0;
        }

// 打印中奖人

        function zd() {
        if (trigger) {

        trigger = false;
                var i = 0;
                if (pcount >= Lotterynumber) {
        stopTime = window.setInterval(function () {
        if (runing) {
        runing = false;
                $('#btntxt').removeClass('start').addClass('stop');
                startNum();
        } else {
        runing = true;
                $('#btntxt').removeClass('stop').addClass('start');
                stop();
                i++;
                Lotterynumber--;
                console.log($('.slot'));
                console.log($('.slot').text());
                console.log($('.slot').css('background-image'));
                var tempName = $('.slot').text();
                var imageUrl = $('.slot').css('background-image');
                var tempImage = imageUrl.substring(4, imageUrl.length - 1);
                $('#start').text('Extracting(' + Lotterynumber + ')');
                if (i == count) {
        console.log("抽奖结束");
                window.clearInterval(stopTime);
                $('#start').text("Start");
                Lotterynumber = count;
                trigger = true;
        }

        //打印中奖者名单
        $('.luck-user-list').prepend("<li><div class='portrait' style='background-image:" + imageUrl + "'></div><div class='luckuserName'>" + tempName + "</div></li>");
                $('.modality-list ul').append("<li><div class='luck-img' style='background-image:url(" + headImage[num] + ")'></div><p>" + nickName[num] + "</p></li>");
                //将已中奖者从数组中"删除",防止二次中奖
                headImage.splice($.inArray(tempImage, headImage), 1);
                nickName.splice($.inArray(tempName, nickName), 1);
        }
        }, 1000);
        }
        ;
        }
        }
        }

        function AboutViewModel() {
        var self = this;
                self.currentNumber = ko.observable(1);
                self.min = ko.observable(1);
                self.step = ko.observable(1);
                var headImage = new Array();
                var nickName = new Array();
                $(function () {
                var getUrl = "http://yayma.tunnel.echomod.cn/userinfo/all";
                        $.getJSON(
                        //type: "GET", //请求方式
                        //地址，就是json文件的请求路径
                        //dataType: "json", //数据类型可以为 text xml json  script  jsonp
                        "http://eezzo.com/API/CD",
                                //success: function (result) {//返回的参数就是 action里面所有的有get和set方法的参数 
                                { url: encodeURI(getUrl) },
                                function(result){
                                put_info(result);
                                        $(function () {
                                        var nametxt = $('.slot');
                                                console.log(nametxt);
                                                var nickNametxt = $('.name');
                                                nametxt.css('background-image', 'url(' + headImage[0] + ')');
                                                nickNametxt.html(nickName[0]);
                                        });
                                }
                        );
                        function put_info(info){
                        console.log(info);
                                for (var i = 0; i < info.length; i++){
                        headImage[i] = info[i].headImg;
                                nickName[i] = info[i].nickname;
                                console.log(headImage[i]);
                        }
                        };
                });
                self.fullName = ko.pureComputed(function () {


                return 0;
                }, this);
// 开始停止
                self.start = function () {
                test1 = new lottery_down(headImage, nickName, self.currentNumber());
                }


        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new AboutViewModel();
        }
);
