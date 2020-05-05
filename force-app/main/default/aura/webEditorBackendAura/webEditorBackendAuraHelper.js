({
    onHandleInit : function(component, event, helper) {
        // Get the action of Controller (Apex) Class
        var action = component.get('c.makeAPICall');
        
        // set the callback which will return the response from apex
        action.setCallback(this, function(response){
            // get the state
            var state = response.getState();
            if( (state === 'SUCCESS' || state ==='DRAFT') && component.isValid()){
                // get the response
                var responseValue = response.getReturnValue();
                // Parse the respose
                var obj = JSON.parse(responseValue);
                var responseData = JSON.parse(obj);
                //console.log(obj);
                //console.log('obj.totalSize>>'+responseData.size);
                component.set("v.compSize",responseData.size);
                component.set("v.lwcRecords",responseData.records);
                //console.log('responseData.records>>'+responseData.records);
                var webEditorHomeLWC= component.find("webEditorHomeLWC");
                var webEditorElement= webEditorHomeLWC.getElement();
                //console.log('webEditorElement>>'+webEditorElement);
                webEditorElement.doCallback();
            } else if( state === 'INCOMPLETE'){
                console.log("User is offline, device doesn't support drafts.");
            } else if( state === 'ERROR'){
                console.log('Problem saving record, error: ' +
                JSON.stringify(response.getError()));
            } else{
                console.log('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
            }
        });
        // send the action to the server which will call the apex and will return the response
        $A.enqueueAction(action);
    },

    onHandleClick: function(component, event, helper) {
        console.log('event>>'+event);
        var selectedLWCRecordEventParam = event.getParams("value");
        var lwcRecordId= selectedLWCRecordEventParam.value;
        //console.log('selectedLWCRecordEventParam>>1'+selectedLWCRecordEventParam.value);

        var action = component.get('c.makeAPICallOnClick');
        action.setParams({ "lwcRecordId" : lwcRecordId });
        action.setCallback(this, function(response){
            var state = response.getState();
            if( (state === 'SUCCESS' || state ==='DRAFT') && component.isValid()){
                var responseValue = response.getReturnValue();
                // Parse the respose
                var obj = JSON.parse(responseValue);
                //console.log('responseValue>>'+obj);
                var responseData = JSON.parse(obj);
                console.log('responseData>>'+responseData.records);
                //var lwcData= responseData.Metadata.lwcResources.lwcResource;
                /*console.log('responseData>>'+responseData.Metadata.lwcResources.lwcResource);
                var selectedLWCRecords= [];
                lwcData.forEach(element=>{
                    const lwcRecord={};
                    lwcRecord.filePath= element.filePath;
                    lwcRecord.byteArray= element.source.asByteArray;
                    selectedLWCRecords.push(lwcRecord);
                    //console.log('element.filePath>>'+element.filePath);
                    //console.log('element.source.asByteArray>>'+element.source.asByteArray);
                });*/
                component.set("v.selectedLWCRecords",responseData.records);
                var webEditorEditLWC= component.find("webEditorEditLWC");
                var webEditorElement= webEditorEditLWC.getElement();
                webEditorElement.doCallback();
            } else if( state === 'INCOMPLETE'){
                console.log("User is offline, device doesn't support drafts.");
            } else if( state === 'ERROR'){
                console.log('Problem saving record, error: ' +
                JSON.stringify(response.getError()));
            } else{
                console.log('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
            }

        });
        $A.enqueueAction(action);
    }
})