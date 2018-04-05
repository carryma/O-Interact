define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel'], function (oj, ko, $) {
    function loginContentViewModel() {
        var self = this;
        self.submitInput = function () {
            var userName = $("#username").val();
            if (userName !== null && userName === "kanma") {
				// window.location.href = "http://localhost:3000/js/views/customers.html";
                window.location.href = "http://localhost:8382/index.html?root=customers";
                //$(location).attr('href',"");
                //window.location.replace("");
            } else {
                $("#mymodal").modal("toggle");
                // $.getJSON("http://localhost:8080/user/1", function (result) {
                //    alert("JSON Data" + result.name);
            }
        };
    }
    return loginContentViewModel;
});
