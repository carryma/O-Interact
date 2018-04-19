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
            var getUrl = "http://yayma.tunnel.echomod.cn/customer/check";
            //var getUrl = "css/userinfo/userinfo.json";
            $.ajax(
                {
                    url: getUrl,
                    type: "POST",
                    data: JSON.stringify(str),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (result) {
                        // alert(result);
                        if (result == 1) {
                            window.location.href = "http://localhost:8081/index.html?root=navigation";
                        } else if (username === "" || username === null) {
                            $("#mymodal").modal("toggle");
                        }
                        else {
                            $("#reginfo").modal("toggle");
                        }

                    },
                    error: function (e) {
                        alert("you have not registered！");
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
                    url: "http://yayma.tunnel.echomod.cn/customer/save",
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
                        } else {
                            alert("save failed!");
                        }
                    },
                    error: function (e) {
                        alert("regist failed!");
                    }
                });
        };
    }
    return loginContentViewModel;
});
