define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel'], function (oj, ko, $) {
    function loginContentViewModel() {
        var self = this;
        self.submitInput = function () {
            var username = $("#username").val();
            var password = $("#password").val();
            var str = { username: username, password: password }
            if (username === "" || password === null) {

                $("#mymodal").modal("toggle");
            }
            //  var getUrl = "http://yayma.tunnel.echomod.cn/userinfo/all";
            var getUrl = "http://localhost:8081/customer/check";
            //var getUrl = "css/userinfo/userinfo.json";
            $.ajax(
                {
                    url: getUrl,
                    type: "POST",
                    data: JSON.stringify(str),
                    dataType: "json",
                    contentType: "application/json",
                   success: function(result) {
                        alert(result);
                        if (result == 1) {
                            window.location.href = "http://localhost:8082/index.html?root=navigation";
                            //window.location.href = "http://www.kanmaui.tunnel.echomod.cn/index.html?root=customers";
                        } else if (username === "" || username === null) {
                            $("#mymodal").modal("toggle");
                        }
                        else {
                            $("#reginfo").modal("toggle");
                        }

                    }
                });

        }
        self.registerInput = function () {
            var username = $("#username").val();
            var password = $("#password").val();
            //alert(username);
            // var data = new FormData(document.querySelector("#customer"));
            var str = { username: username, password: password }
            // var data;
            // data.set("customer", JSON.stringify(str));
            // alert(JSON.stringify(str));
            $.ajax(
                {
                    url: "http://localhost:8081/customer/save",
                    type: "POST",
                    data: JSON.stringify(str),
                    dataType: "json",
                    contentType: "application/json",

                    success: function (result) {
                        if (result === 1) {
                            // $("#regsuccess").modal("toggle");
                            console.log($("#mymodal"));
                            ($("#regsuccess").modal("toggle"))();
                            location.reload();
                            // window.location.href = "http://localhost:8082/index.html#";
                        } else {
                            alert("保存失败");
                        }
                    },
                    error: function (e) {
                        alert("错误！！");
                    }
                });
        };
    }
    return loginContentViewModel;
});
