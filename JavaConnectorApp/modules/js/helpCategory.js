	
/*****************************************************************
*	Name    : searchByHelpCategory
*	Author  : Kony 
*	Purpose : This function is used to invoke the helpcategory_mysql javaservice using appmiddlewareinvokerasync method  .
****************************************************************
*/
	
	function searchByHelpCategory() {
		gVisit = 0;
	    var mysqlhelpcategory_inputparam = {};
	    mysqlhelpcategory_inputparam["serviceID"] = "helpcategory_mysql";
	    mysqlhelpcategory_inputparam["httpheaders"] = {};
	    mysqlhelpcategory_inputparam["httpconfigs"] = {};	    
	    var mysqlhelpcategory = appmiddlewareinvokerasync(mysqlhelpcategory_inputparam, helpCategoryCallback);
	    kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	}

/*****************************************************************
*	Name    : helpCategoryCallback
*	Author  : Kony 
*	Purpose : This function is used to get parameters status & resultTable i.e. called when appmiddlewareinvokerasync method executes.
****************************************************************
*/
	function helpCategoryCallback(status, mysqlHelpCategoryData){
	    if (status == 400) {        
	        if (mysqlHelpCategoryData["opstatus"] == 0) {
	            if (mysqlHelpCategoryData != null && mysqlHelpCategoryData != undefined && mysqlHelpCategoryData["helpCategory"] 
	            		!= null && mysqlHelpCategoryData["helpCategory"] != undefined) {
	                var hcArray = [];
	                for (var i = 0; i < mysqlHelpCategoryData["helpCategory"].length; i++) {
	                    hcArray.push({
	                        "hc_id": mysqlHelpCategoryData["helpCategory"][i]["hcid"],
	                        "lblHelpCategory": mysqlHelpCategoryData["helpCategory"][i]["hcname"]
	                    })
	                }
	                frmCategory.segHelpCategory.setData(hcArray);
		            frmCategory.lblInfo.text = "Select a category for respective HelpTopics: ";
		            if(channel==="tablet"){
                	frmCategory.segHelpCategory.selectedIndex=[0,0];
                	helpTopicDetails();
                    }	
                 	else
                	hbxFooterPage.setVisibility(true);
                 kony.application.dismissLoadingScreen();
	            }
	        }
			else{
					alert("Cannot find host on this network connection,Please check network & try again.");
					frmCategory.lblInfo.text = "Cannot find host on this network connection,Please check network & try again.";
					gVisit = 1;
					if(channel!="tablet")
					hbxFooterPage.setVisibility(false);	
		           	kony.application.dismissLoadingScreen();
		           	return;
				}
	    }
	}
	
/*****************************************************************
*	Name    : navToFrmCategory
*	Author  : Kony 
*	Purpose : This function is used to Navigate to Category form.
****************************************************************
*/
	
		function navToFrmCategory(){			
				
			if(gVisit == 1)
			{
				searchByHelpCategory();
			}
			else frmCategory.show();
						
		}

	