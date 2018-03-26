/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * login module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel'], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function loginContentViewModel() {
        var self = this;
        self.value = ko.observable("what");
        self.firstName = ko.observable("Planet");
        self.lastName = ko.observable("Earth");
        self.fullName = ko.pureComputed(function () {
            return this.firstName() + " " + this.lastName();
        }, this);
        self.submitInput = function ()
        {
            //alert("We enable the Submit butt on when rawValue is not empty.");
            window.location.href="http://baidu.com";
        }

    }

    return loginContentViewModel;
});
