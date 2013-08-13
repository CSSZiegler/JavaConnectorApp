
/*****************************************************************
*	Name    : helpTopicDetails
*	Author  : Kony 
*	Purpose : This function is used to invoke the helptopic_mysql javaservice using appmiddlewareinvokerasync method  .
****************************************************************
*/	
	function helpTopicDetails()
	{
		var CategoryID = null;
		CategoryID = frmCategory["segHelpCategory"]["selectedItems"][0]["hc_id"];
			if(channel==="tablet")
				frmCategory.lblInfo.setVisibility(false);
			else
				frmTopic.lblInfo.setVisibility(false);
			
	    var mysqlhelptopic_inputparam = {};
	    mysqlhelptopic_inputparam["serviceID"] = "helptopic_mysql";
	    mysqlhelptopic_inputparam["id"] = CategoryID;
	    mysqlhelptopic_inputparam["httpheaders"] = {};
	    mysqlhelptopic_inputparam["httpconfigs"] = {};
	    kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	   	var mysqlhelptopic = appmiddlewareinvokerasync(mysqlhelptopic_inputparam, helpTopicCallback);
	};
	
/*****************************************************************
*	Name    : helpTopicCallback
*	Author  : Kony 
*	Purpose : This function is used to get parameters status & resultTable i.e. called when appmiddlewareinvokerasync method executes.
****************************************************************
*/
	function helpTopicCallback(status, mysqlHelpTopicData)
	{		
	kony.print("Response is ::"+JSON.stringify(mysqlHelpTopicData));
		if (status == 400) {
		     if (mysqlHelpTopicData["opstatus"] == 0) {
		        if (mysqlHelpTopicData != null && mysqlHelpTopicData != undefined && 
		        	mysqlHelpTopicData["helpTopic"] != null && mysqlHelpTopicData["helpTopic"] != undefined) {
		            var htArray = [];
		            //#ifdef winmobile
		            	if(mysqlHelpTopicData["helpTopic"].length == 1){
		            		alert("Topic detail is not available.");
		            		kony.application.dismissLoadingScreen();
		            		return;
		            		}
		            //#else
						kony.application.dismissLoadingScreen();		
		            	if(mysqlHelpTopicData["helpTopic"].length == 0){
			            	  	if(channel==="tablet"){
										frmCategory.lblInfo.setVisibility(true);
										frmCategory.lblInfo.text = "Topic detail is not available.";
									}else{
										frmTopic.lblInfo.setVisibility(true);
			            				frmTopic.lblInfo.text = "Topic detail is not available.";
									}
						}
		            //#endif
		            for (var i = 0; i < mysqlHelpTopicData["helpTopic"].length; i++) {
		            	htArray.push({
		                    "lblHTName": mysqlHelpTopicData["helpTopic"][i]["name"],
		                    "lblHTUrl": mysqlHelpTopicData["helpTopic"][i]["url"]
		                })
		            }		            
		            }
						if(channel==="tablet")
							frmCategory.segHelptopic.setData(htArray);
						else{
							frmTopic.segHelptopic.setData(htArray);
		            		frmTopic.show();
						}
        	       kony.application.dismissLoadingScreen();
		        }
				else{
					alert("Cannot find host on this network connection,Please check network & try again.");					    	
		           	kony.application.dismissLoadingScreen();
		           	return;
				}		        
		    }
	}

/*****************************************************************
*	Name    : topicDescription
*	Author  : Kony 
*	Purpose : Configuring the request URL to get the Topic Description in browser widget.
****************************************************************
*/	
	function topicDescription()
	{
		var URL = null,currForm = null ;
		kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
		
			if(channel==="tablet"){
				currForm = kony.application.getCurrentForm();
				URL = currForm.segHelptopic.selectedItems[0].lblHTUrl;
			}else
				URL = frmTopic.segHelptopic.selectedItems[0].lblHTUrl;
		
		kony.application.openURL(URL);
		kony.application.dismissLoadingScreen();
	}

