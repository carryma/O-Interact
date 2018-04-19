/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
  function (oj, ko, $) {

    function CheckinViewModel() {
      var self = this;
      var getUrl = "http://yayma.tunnel.echomod.cn/userinfo/all";
      //var getUrl = "css/userinfo/userinfo.json";
      $.getJSON(
        //type: "GET", //请求方式
        //地址，就是json文件的请求路径
        //dataType: "json", //数据类型可以为 text xml json  script  jsonp
        "http://eezzo.com/API/CD",
        //success: function (result) {//返回的参数就是 action里面所有的有get和set方法的参数 
        { url: encodeURI(getUrl) },
        function (result) {
          console.log(nametxt);
          //nametxt.css('background-image', 'url(' + headImage[0] + ')');
          // nickNametxt.html(nickName[0]);
        }
      );
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CheckinViewModel();
  }
);
