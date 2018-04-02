/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel'], function (oj, ko,$) {
    /**
     * The view model for the main content view template
     */
    function loginContentViewModel() {
        var self = this;
        self.value = ko.observable("kanma");
        /*
        self.firstName = ko.observable("Planet");
        self.lastName = ko.observable("Earth");
        self.fullName = ko.pureComputed(function () {
            return this.firstName() + " " + this.lastName();
        }, this);
        */
        self.submitInput = function ()
        {   
            $.getJSON("http://localhost:8080/user/1",function(result){
                alert("JSON Data" + result.name)
            })
            //alert("We enable the Submit butt on when rawValue is not empty.");
            window.location.href="http://localhost:8383/public_html/index.html?root=customers";
        }
        

    }

    return loginContentViewModel;
});
