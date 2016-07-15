var messages = [];
var ids = [];
var latestId;
var message;
var time;
var req;
chrome.extension.onMessage.addListener( function(request,sender,sendResponse)
{
	req = request.greeting;
});

$(function(){
	engine();
	setInterval(engine,5000);
});

function engine(){
	var newNoti;
	$.get("https://www.quora.com/notifications" , function(data){
	
	  data = $(data).find('.NotificationsListContents').eq(0);
	  $('body').append(data);
	  
	  for(i=0; i<$(data).find('.pagedlist_item').length;i++){
		  var id = $(data).find('.pagedlist_item').eq(i).attr('id');
		//  console.log(id);
		  ids[i] = id.substring(id.lastIndexOf('/')+1);
		  time= ($(data).find('.pagedlist_item').eq(i).find('.timestamp').text()).trim();
		//  console.log(time);
		  message= ($(data).find('.pagedlist_item').eq(i).text()).trim();
		  messages[i]= message.replace(time, '');
		  
		//  console.log(messages[i]);
	  }
	  
	//  console.log(ids);
	// console.log(messages[0]);
	  
	if(latestId == messages[0]){
		//no change
	}
	else if(latestId === undefined){
		//This is the first time running
		var firstRun = {
	
			type : "basic",
			title : "Quora Notifier",
			message : "Check Quora for latest notifications",
			iconUrl : "icon.png"
	
			};
			chrome.notifications.create(firstRun);
			chrome.notifications.onClicked.addListener(function(){
				window.open('https://www.quora.com/notifications');
			});
			latestId = messages[0];
	}
	//
	else if(latestId != messages[0]){
		
		//priority starts
		if(req === "up" || req === "comment"){
			console.log("priority starts");
			var str;
			var i;
			for(i=1;i<3;i++){
				
				var j=0;
				if(i==1 && req === "up")
				str = "upvoted";
				else if(i!=1 && req === "up")
				str = "commented";
				else if(i==1 && req === "comment")
				str = "commented";
				else if(i!=1 && req === "comment")
				str = "upvoted";
			
				while(latestId != messages[j]){
					if((messages[j].search(str))!=-1){
						newNoti = messages[j];
						if(newNoti.length !=0 ){
							var myNoti = {
						
								type : "basic",
								title : "Quora Notifier",
								message : newNoti,
								iconUrl : "icon.png"
						
								};
								chrome.notifications.create(myNoti);
								chrome.notifications.onClicked.addListener(function(){
								window.open('https://www.quora.com/notifications');
								});
						}
					}
					j=j+1;
				}
				
			}
			latestId = messages[0];
			//priority ends
		}
		
		else{
		//fcfs starts
		console.log("fcfs starts");
		var j=0;
		while(latestId != messages[j]){
			newNoti = messages[j];
			if(newNoti.length !=0 ){
				var myNoti = {
			
					type : "basic",
					title : "Quora Notifier",
					message : newNoti,
					iconUrl : "icon.png"
			
					};
					chrome.notifications.create(myNoti);
					chrome.notifications.onClicked.addListener(function(){
					window.open('https://www.quora.com/notifications');
					});
			}
			j=j+1;
		}
		latestId = messages[0];
		//fcfs ends
		}
		
		
		
		
	}
	
	});
	
}

