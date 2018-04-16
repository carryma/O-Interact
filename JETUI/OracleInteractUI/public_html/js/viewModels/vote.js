/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * vote module
 */
define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    this.completVote = new function(){
        $("#complete").click(function(){
			var nullcheck = true;
			var json='{';
			json = json+'info:"'+$("#voteinfo textarea").val()+'",';
			//处理全部选项，整理成json，发送到下一个页面展示
			if($("#voteconfig1").attr("checked")=="checked"){
				json+='multi:true,';
			}
			else{
				json+='multi:false,';
			}
			json+='choices:[';
			$.each($(".votechoice"),function(i,item){
				if($(item).find("input").val()==""){
					alert("不能还有空的内容!");
					nullcheck = false;
					return nullcheck;
				}
				if(i>0){
					json+=',';
				}
				json = json+'{name:"choice'+i+'",value:"'+$(item).find("input").val()+'",num:0,percent:0}';
			});
			if(!nullcheck){
				return;
			}
			json+=']}';
			window.open("votechoose.html?vote="+encodeURI(json.replace(/\n/g,'<br/>')));
		});
    }
    function voteContentViewModel() {
        var self = this;
        self.vote_max = ko.observable(5);
         $("#complete").click(function(){
			var nullcheck = true;
			var json='{';
			json = json+'info:"'+$("#voteinfo textarea").val()+'",';
			//处理全部选项，整理成json，发送到下一个页面展示
			if($("#voteconfig1").attr("checked")=="checked"){
				json+='multi:true,';
			}
			else{
				json+='multi:false,';
			}
			json+='choices:[';
			$.each($(".votechoice"),function(i,item){
				if($(item).find("input").val()==""){
					alert("不能还有空的内容!");
					nullcheck = false;
					return nullcheck;
				}
				if(i>0){
					json+=',';
				}
				json = json+'{name:"choice'+i+'",value:"'+$(item).find("input").val()+'",num:0,percent:0}';
			});
			if(!nullcheck){
				return;
			}
			json+=']}';
			window.open("votechoose.html?vote="+encodeURI(json.replace(/\n/g,'<br/>')));
		});
    }
    
    return voteContentViewModel;
});
