/*****************************************************************
*	Name    : searchByHelpKeyword
*	Author  : Kony 
*	Purpose : This function is used to invoke the helpkeyword_mysql javaservice using appmiddlewareinvokerasync method  .
****************************************************************
*/

		function searchByHelpKeyword() {
			gNoOfRows = 0;
			gPageno = 0;
			gFromRow = 0;
			gVisit = 0;
		    var mysqlhelpkeyword_inputparam = {};
		    mysqlhelpkeyword_inputparam["serviceID"] = "helpkeyword_mysql";
		    mysqlhelpkeyword_inputparam["httpheaders"] = {};
		    mysqlhelpkeyword_inputparam["httpconfigs"] = {};		    
		    var mysqlhelpkeyword = appmiddlewareinvokerasync(mysqlhelpkeyword_inputparam, helpKeywordCallback);
		    kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);        
		};

/*****************************************************************
*	Name    : helpKeywordCallback
*	Author  : Kony 
*	Purpose : This function is used to get parameters status & resultTable i.e. called when appmiddlewareinvokerasync method executes.
****************************************************************
*/
		function helpKeywordCallback(status, mysqlHelpKeywordData){
		   if (status == 400) {
		        if (mysqlHelpKeywordData["opstatus"] == 0) {
		            if (mysqlHelpKeywordData != null && mysqlHelpKeywordData != undefined &&
		            		 mysqlHelpKeywordData["helpKeyword"] != null && mysqlHelpKeywordData["helpKeyword"] != undefined) {
		                ghkData = [];
		                for (var i = 0; i < mysqlHelpKeywordData["helpKeyword"].length; i++) {
		                    ghkData.push({
		                        "hk_id": mysqlHelpKeywordData["helpKeyword"][i]["hkid"],
		                        "lblHelpKeyword": mysqlHelpKeywordData["helpKeyword"][i]["hkname"]
		                    })
		                }
		               frmKeywords.lblInfo.text = "Select keyword for help topic : ";
			                if(channel==="tablet")
								frmKeywords.hbxFooterPage.setVisibility(true);
							else
								hbxFooterPage.setVisibility(true);
							gNoOfPages = Math.ceil((ghkData.length)/40);		                            
			               paginationNext();		                	
		           }		       
				}
				else{
					alert("Cannot find host on this network connection,Please check network & try again.");
					frmKeywords.lblInfo.text = "Cannot find host on this network connection,Please check network & try again.";
					gVisit = 1;
					if(channel==="tablet")
						frmKeywords.hbxFooterPage.setVisibility(false);
					else
						hbxFooterPage.setVisibility(false);
					kony.application.dismissLoadingScreen();
		           	return;
				}
			}
		}
		

/*****************************************************************
*	Name    : paginationNext
*	Author  : Kony 
*	Purpose : Defined onClick of next button for pagination of keywords data object in frmKeyword form.
****************************************************************
*/		
			

		function paginationNext(){			
			if(channel==="tablet"){
				frmKeywords.imgLeftfooter.src = "arwleftd.png";
				frmKeywords.imgRightfooter.src = "arwrightd.png";	
			}else{
				hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "arwleftd.png";
				hbxFooterPage.vbxRightFooter.hbxRightFooter.imgRightfooter.src = "arwrightd.png";	
			}
			gPageno = gPageno+1;	
			var absPageno = Math.abs(gPageno);			
			var absNoOfPages = Math.abs(gNoOfPages);
			if(absPageno > absNoOfPages){
				if(channel==="tablet")
					frmKeywords.imgRightfooter.src = "trans1.png";
				else
					hbxFooterPage.vbxRightFooter.hbxRightFooter.imgRightfooter.src = "trans1.png";
				gPageno = gPageno-1;
			 	return;
			 }
			gNoOfRows = gNoOfRows+40;
			var absNoofRows = Math.abs(gNoOfRows);
			if(absPageno == absNoOfPages)
				if(channel==="tablet")
					frmKeywords.imgRightfooter.src = "trans1.png";
				else
					hbxFooterPage.vbxRightFooter.hbxRightFooter.imgRightfooter.src = "trans1.png";
												
			if(absPageno == 1){
				if(channel==="tablet")
					frmKeywords.imgLeftfooter.src = "trans1.png";
				else
					hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "trans1.png";
				
				}
			else{
				gFromRow = gFromRow+40;	
				}
				if(channel==="tablet"){
					frmKeywords.lblFrom.text = gPageno.toPrecision();
					frmKeywords.lblTo.text = gNoOfPages.toPrecision();
				}else{
					hbxFooterPage.vbxIndexFooter.hbxIndexFooter.lblFrom.text = gPageno.toPrecision();
					hbxFooterPage.vbxIndexFooter.hbxIndexFooter.lblTo.text = gNoOfPages.toPrecision();
				}						
			var nextHelpKeywordData = [];
			for (var i = gFromRow ; i < gNoOfRows; i++ ){
				if(ghkData[i]!= null && ghkData[i]!= undefined)
					nextHelpKeywordData.push(ghkData[i]);
			}
			frmKeywords.segHelpKeyword.setData(nextHelpKeywordData);
			if(channel==="tablet"){
			frmKeywords.segHelpKeyword.selectedIndex=[0,0];
			serviceHelpRelation();
			}
			
			kony.application.dismissLoadingScreen();
		}
/****************************************************************
*	Name    : paginationPrevious
*	Author  : Kony 
*	Purpose : Defined onClick of previous button for pagination of keywords data object in frmKeyword form.
****************************************************************
*/		
	
		
		function paginationPrevious()
		{
			gPageno = gPageno-1;
			if(channel==="tablet"){
				frmKeywords.imgLeftfooter.src = "arwleftd.png";
				frmKeywords.imgRightfooter.src = "arwrightd.png";	
			}else{
				hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "arwleftd.png";
				hbxFooterPage.vbxRightFooter.hbxRightFooter.imgRightfooter.src = "arwrightd.png";	
			}
			var absPageno = Math.abs(gPageno);
			if(absPageno < 1){
				if(channel==="tablet")
					frmKeywords.imgLeftfooter.src = "trans1.png";
				else
					hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "trans1.png";
				gPageno = gPageno+1;
			 	return;
			 }
			if(absPageno == 1)
			if(channel==="tablet"){
				frmKeywords.imgLeftfooter.src = "trans1.png";
				frmKeywords.lblFrom.text = gPageno.toPrecision();
			}else{
				hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "trans1.png";
				hbxFooterPage.vbxIndexFooter.hbxIndexFooter.lblFrom.text = gPageno.toPrecision();
			}					
			gFromRow = gFromRow-40;
			gNoOfRows = gNoOfRows-40;	
			if(channel==="tablet"){
					frmKeywords.lblFrom.text = gPageno.toPrecision();
					frmKeywords.lblTo.text = gNoOfPages.toPrecision();
			}else{
					hbxFooterPage.vbxIndexFooter.hbxIndexFooter.lblFrom.text = gPageno.toPrecision();
					hbxFooterPage.vbxIndexFooter.hbxIndexFooter.lblTo.text = gNoOfPages.toPrecision();
			}	
			var preHelpKeywordData = [];
			for(var i = gFromRow ; i < gNoOfRows ; i++){
				if(ghkData[i]!= null && ghkData[i]!= undefined)
					preHelpKeywordData.push(ghkData[i]);
			}
			frmKeywords.segHelpKeyword.setData(preHelpKeywordData);
			if(channel==="tablet"){
			frmKeywords.segHelpKeyword.selectedIndex=[0,0];
			serviceHelpRelation();
			}
			kony.application.dismissLoadingScreen();
		}
/*****************************************************************
*	Name    : navToFrmKeyword
*	Author  : Kony 
*	Purpose : This function is used to Navigate to Keywords form.
****************************************************************
*/
	
		function navToFrmKeyword(){	
			if(gVisit == 1){  				
				searchByHelpKeyword()
			}
			else frmKeywords.show();
						
		}
	
