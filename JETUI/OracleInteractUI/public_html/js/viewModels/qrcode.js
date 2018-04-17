/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * largeScreen module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'socket.io'],
 function(oj, ko, $, io) {
    /**
     * The view model for the main content view template
     */
    function qrcodeViewModel() {

        var self = this;
        self.createScreen = function(){
        window.location.href = "http://localhost:8081/index.html?root=largescreen";
  
    };}
    
    return qrcodeViewModel;
});



