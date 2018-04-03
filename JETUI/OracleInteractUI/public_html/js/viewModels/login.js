define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel'], function (oj, ko, $) {
    function loginContentViewModel() {
        var self = this;
        self.value = ko.observable("kanma");
        self.submitInput = function () {
            var userName = $("#username").val();
            if (userName !== null && userName === "kanma") {
                window.location.href = "http://localhost:8383/public_html/index.html?root=customers";
                //$(location).attr('href',"");
                //window.location.replace("");
            } else {
                $("#mymodal").modal("toggle");
                // $.getJSON("http://localhost:8080/user/1", function (result) {
                //    alert("JSON Data" + result.name);
            }
        }
    }
    return loginContentViewModel;
});
