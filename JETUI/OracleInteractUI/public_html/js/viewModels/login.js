define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel'], function (oj, ko, $) {
    function loginContentViewModel() {
        var self = this;
        self.submitInput = function () {
            var userName = $("#username").val();
            if (userName !== null && userName === "admin") {
              window.location.href = "http://localhost:8081/index.html?root=navigation";
			  //window.location.href = "http://www.kanmaui.tunnel.echomod.cn/index.html?root=customers";
            } else {
                $("#mymodal").modal("toggle");
                // $.getJSON("http://localhost:8080/user/1", function (result) {
                //    alert("JSON Data" + result.name);
            }
        };
    }
    return loginContentViewModel;
});
