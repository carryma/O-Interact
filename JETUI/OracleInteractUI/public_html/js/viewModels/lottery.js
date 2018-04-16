/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputnumber'],
        function (oj, ko, $) {
            this.lottery_show = function (xinm, phone) {
                var nametxt = $('.slot');
                console.log(nametxt);
                var phonetxt = $('.name');

                $(function () {
                    nametxt.css('background-image', 'url(' + xinm[0] + ')');
                    phonetxt.html(phone[0]);
                });
            }


            this.lottery_down = function (xinm, phone, number) {
                var nametxt = $('.slot');
                console.log(nametxt);
                var phonetxt = $('.name');
                var pcount = xinm.length - 1;//参加人数
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
                    nametxt.css('background-image', 'url(' + xinm[num] + ')');
                    phonetxt.html(phone[num]);
                    t = setTimeout(startNum, 0);
                }

// 停止跳动
                function stop() {
                    pcount = xinm.length - 1;
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
                                    var tempImage = imageUrl.substring(4, imageUrl.length-1);
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
                                    $('.modality-list ul').append("<li><div class='luck-img' style='background-image:url(" + xinm[num] + ")'></div><p>" + phone[num] + "</p></li>");
                                    //将已中奖者从数组中"删除",防止二次中奖
                                    xinm.splice($.inArray(tempImage, xinm), 1);
                                    phone.splice($.inArray(tempName, phone), 1);


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
                var xinm = new Array();
                xinm[0] = "css/images/lottery/1.jpg"
                xinm[1] = "css/images/lottery/2.jpg"
                xinm[2] = "css/images/lottery/3.jpg"
                xinm[3] = "css/images/lottery/4.jpg"
                xinm[4] = "css/images/lottery/5.jpg"
                xinm[5] = "css/images/lottery/6.jpg"


                var phone = new Array();
                phone[0] = "王尼玛"
                phone[1] = "张全蛋"
                phone[2] = "纸巾老撕"
                phone[3] = "王铁柱"
                phone[4] = "田二妞"
                phone[5] = "唐马儒"

                var test;
                self.fullName = ko.pureComputed(function () {
                    test = new lottery_show(xinm, phone);
                    console.log(test);
                    return 0;
                }, this);
                console.log(test);

// 开始停止
                self.start = function () {
                    test1 = new lottery_down(xinm, phone, self.currentNumber());
                }






                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additional available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new AboutViewModel();
        }
);
