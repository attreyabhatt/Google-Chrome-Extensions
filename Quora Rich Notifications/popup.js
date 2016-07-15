window.onload = function() {
    
	$("#button").click(function(){
		
		var style= $( "input:radio[name=method]:checked" ).val();
		var porder= $( "input:radio[name=order]:checked" ).val();
		
		if(style == "fcfs"){
			chrome.extension.sendMessage({greeting: "fcfs"},
			function (response) {});
		 }
		else{
			chrome.extension.sendMessage({greeting: porder},
			function (response) {});
		}
	
	});
	

}



