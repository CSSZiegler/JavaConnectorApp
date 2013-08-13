
/*****************************************************************
*	Name    : serviceHelpRelation
*	Author  : Kony 
*	Purpose : This function is used to invoke the helprelation_mysql javaservice using appmiddlewareinvokerasync method  .
****************************************************************
*/
	function serviceHelpRelation() {
	
		var KeywordID = null;
		KeywordID = frmKeywords["segHelpKeyword"]["selectedItems"][0]["hk_id"];
		if(channel==="tablet")
			frmKeywords.lblInfo.setVisibility(false);
		else
			frmTopic.lblInfo.setVisibility(false);
	
	    var mysqlhelprelation_inputparam = {};
	    mysqlhelprelation_inputparam["serviceID"] = "helprelation_mysql";
	    mysqlhelprelation_inputparam["id"] = KeywordID;
	    mysqlhelprelation_inputparam["httpheaders"] = {};
	    mysqlhelprelation_inputparam["httpconfigs"] = {};
	    kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	    var mysqlhelprelation = appmiddlewareinvokerasync(mysqlhelprelation_inputparam, helpRelationCallback);
	};

/*****************************************************************
*	Name    : helpRelationCallback
*	Author  : Kony 
*	Purpose : This function is used to get parameters status & resultTable i.e. called when appmiddlewareinvokerasync method executes.
****************************************************************
*/
	
	function helpRelationCallback(status, mysqlHelpRelationData){
	   if (status == 400) {
	        if (mysqlHelpRelationData["opstatus"] == 0) {
	            if (mysqlHelpRelationData != null && mysqlHelpRelationData != undefined &&
	            	 mysqlHelpRelationData["helpRelation"] != null && mysqlHelpRelationData["helpRelation"] != undefined) {
	                var hlArray = [];
	                for (var i = 0; i < mysqlHelpRelationData["helpRelation"].length; i++) {
	                    hlArray.push({
	                        "lblHTName": mysqlHelpRelationData["helpRelation"][i]["name"],
	                        "lblHTUrl": mysqlHelpRelationData["helpRelation"][i]["url"]
	                    })
	                }	                
	             }
	            if(channel==="tablet")
					frmKeywords.segHelptopic.setData(hlArray);
				else{
					frmTopic.segHelptopic.setData(hlArray);
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
*	Name    : searchOption
*	Author  : Kony 
*	Purpose : This function is used to invoke the helprelation_mysql javaservice using appmiddlewareinvokerasync method  .
****************************************************************
*/

	function searchOption() {
		var flag= frmSearchOption.segHelpKeyword.selectedIndex[1];
		if(flag==0)
			frmCategory.show();
		else
		    frmKeywords.show();
	}	

/*****************************************************************
*	Name    : navPopupSrch
*	Author  : Kony 
*	Purpose : This function is used to show popup 
****************************************************************
*/
function navPopupSrch()
{
		//#ifdef ipad
			var curFrm = kony.application.getCurrentForm();	
			var popupSettingsContext={"widget":curFrm.btnSearch,"anchor":"bottom","sizetoanchorwidth":true};       
			popupSrch.setContext(popupSettingsContext);
		//#endif

		popupSrch.show();
	}
	
/*****************************************************************
*	Name    : dismissPopUp
*	Author  : Kony 
*	Purpose : This function is used to show popup 
****************************************************************
*/	
	function dismissPopUp()
	{
			popupSrch.dismiss();
	
	}
