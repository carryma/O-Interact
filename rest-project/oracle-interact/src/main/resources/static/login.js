/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.getElementById('button').addEventListener('click', function () {
    $.getJSON("http://localhost:8080/user/1", function (result) {
        if (result.name === "kanma") {
            alert("JSON Data : " + result.name);
           // window.location.href = "http://localhost:8383/public_html/index.html?root=about";
        } else {
            alert("The administor'name is wrong,please try again!!.");
        }
    })
    //alert("We enable the Submit butt on when rawValue is not empty.");

});
