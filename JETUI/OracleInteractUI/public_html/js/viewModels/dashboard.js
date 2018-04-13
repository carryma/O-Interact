/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
  function (oj, ko, $) {

    this.zturn = function (turn) {
      //function zturn(turn) {
      //alert(turn);
      var self = this;
      this.x = 1;
      //锁定html页面中 id=zturn 的元素
      var zturn = $("#" + turn.id);
      //具有水平切换效果的item集合
      this.zturnitem = zturn.children(".zturn-item");
      //初始第一个 第一个是0
      var X = this.x;
      //水平切换特效的元素个数
      var num_li = this.zturnitem.length;
      //轮播元素个数 zturnPy为每个的偏移量
      var zturnPy = turn.Awidth / (num_li - 1);


      this.zturnitem.click(function () {
        var zX = $(this).attr("data_n")
        z_sort(turn, zX)

      });


      zturn.children(".zturn-item").each(function (index, element) {
        //index是第几个元素 X是选取的中间数 num_li是总数
        var rt = 1;//1:右侧：-1：左侧
        if ((index - X) > num_li / 2 || (index - X) < 0 && (index - X) > (-num_li / 2)) { rt = -1 };//判断元素左侧还是右侧
        var i = Math.abs(index - X);//取绝对值
        if (i > num_li / 2) { i = X + num_li - index; }//i:是左或者右的第几个
        if ((index - X) < (-num_li / 2)) { i = num_li + index - X; }

        $(this).css({
          'position': 'absolute',
          'left': '50%',
          'margin-left': -turn.width / 2 + zturnPy * rt * i + "px",
          'z-index': num_li - i,
          'opacity': Math.pow(turn.opacity, i),
          'transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-webkit-transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-webkit-transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-moz-transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-ms-transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-o-transform': 'scale(' + Math.pow(turn.scale, i) + ')'
        })
        $(this).attr("data_n", index)
      })
    }

    this.z_sort = function (turn, X) {
      //console.log(turn, X)
      var self = this;
      var zturn = $("#" + turn.id);
      var zturnitem = zturn.children(".zturn-item");
      var num_li = zturnitem.length;//轮播元素个数 zturnPy为每个的偏移量
      var zturnPy = turn.Awidth / (num_li - 1);


      zturn.children(".zturn-item").each(function (index, element) {

        var rt = 1;//1:右侧：-1：左侧
        if ((index - X) > num_li / 2 || (index - X) < 0 && (index - X) > (-num_li / 2)) { rt = -1 };//判断元素左侧还是右侧
        var i = Math.abs(index - X);//取绝对值
        if (i > num_li / 2) { i = parseInt(X) + num_li - index; }//i:是左或者右的第几个
        if ((index - X) < (-num_li / 2)) { i = num_li + index - X; }

        $(this).css({
          'position': 'absolute',
          'left': '50%',
          'margin-left': -turn.width / 2 + zturnPy * rt * i + "px",
          'z-index': num_li - i,
          'opacity': Math.pow(turn.opacity, i),
          'transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-webkit-transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-webkit-transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-moz-transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-ms-transform': 'scale(' + Math.pow(turn.scale, i) + ')',
          '-o-transform': 'scale(' + Math.pow(turn.scale, i) + ')'
        })
      })

    }

    function DashboardViewModel() {
      var self = this;
      self.fullName = ko.pureComputed(function () {
        new zturn({
            id: "zturn",
            opacity: 0.9,
            width: 382,
            Awidth: 400,
            scale: 0.9
          });
        return 0;
    }, this);
    self.createChat = function(){
        window.location.href = "http://localhost:8081/index.html?root=chat";
        
    };
    }

    return new DashboardViewModel();
  }
);
