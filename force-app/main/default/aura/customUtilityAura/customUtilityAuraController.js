({
    openUtilityBar : function(component, event, helper){
           var utilityAPI = component.find("utilitybar");
            utilityAPI.openUtility();
            utilityAPI.getEnclosingUtilityId().then(function(response) {
              utilityAPI.setUtilityLabel({label : "LWC Sessions", utilityId : response});
              utilityAPI.setUtilityIcon({icon : "insert_tag_field", utilityId : response });
          }); 
    }
})