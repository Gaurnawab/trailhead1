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

    onHandleViewClick: function(component, event, helper) {
        console.log('event>>'+event);
        var selectedLWCRecordEventParam = event.getParams("value");
        var lwcRecordId= selectedLWCRecordEventParam.value;
        console.log('selectedLWCRecordEventParam>>1'+selectedLWCRecordEventParam.value);
        if(lwcRecordId){
            component.set("v.isAvailable",true);
            component.set("v.lwcBundleRecordId",lwcRecordId);
        }
        var action = component.get('c.makeAPICallOnClick');
        action.setParams({ "lwcRecordId" : lwcRecordId });
        action.setCallback(this, function(response){
            var state = response.getState();
            if( (state === 'SUCCESS' || state ==='DRAFT') && component.isValid()){
                var responseValue = response.getReturnValue();
                // Parse the respose
                var obj = JSON.parse(responseValue);
                console.log('responseValue>>'+obj);
                var responseData = JSON.parse(obj);
                //console.log('responseData>>'+responseData.records);
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
    },
    onHandleCreateClick: function(component, event, helper) {
        //console.log('event>>'+event);
        var compNameChangeEventParam = event.getParams("value");
        var compName= compNameChangeEventParam.value;
        //console.log('compNameChangeEventParam>>1'+compNameChangeEventParam.value);

        var action = component.get('c.createCompoApiCall');
        action.setParams({ "compName" : compName });
        action.setCallback(this, function(response){
            var state = response.getState();
            if( (state === 'SUCCESS' || state ==='DRAFT') && component.isValid()){
                var responseValue = response.getReturnValue();
                // Parse the respose
                var obj = JSON.parse(responseValue);
                //console.log('responseValue>>'+obj);
                var responseData = JSON.parse(obj);
                //console.log('responseData>>'+responseData.success);
                if(responseData.success){
                    alert(compName+' is successfully created.');
                    window.location.reload();
                }
                /*component.set("v.selectedLWCRecords",responseData.records);
                var webEditorEditLWC= component.find("webEditorEditLWC");
                var webEditorElement= webEditorEditLWC.getElement();
                webEditorElement.doCallback();*/
            } else if( state === 'INCOMPLETE'){
                alert("User is offline, device doesn't support drafts.");
                console.log("User is offline, device doesn't support drafts.");
            } else if( state === 'ERROR'){
                alert('Problem saving record, error: ' +JSON.stringify(response.getError()));
                console.log('Problem saving record, error: ' +JSON.stringify(response.getError()));
            } else{
                alert('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
                console.log('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
            }

        });
        $A.enqueueAction(action);
    },

    onHandleSaveClick: function(component, event, helper) {
        var saveCompEventParam = event.getParams("value");
        var saveCompEventParamvalue= saveCompEventParam.value;
        console.log('saveCompEventParam>>1'+saveCompEventParamvalue.id);

        var action = component.get('c.saveCompApiCall');
        action.setParams({ "id" : saveCompEventParamvalue.id, "filePath" : saveCompEventParamvalue.filePath, "format" : saveCompEventParamvalue.format, "source" : saveCompEventParamvalue.source });
        action.setCallback(this, function(response){
            var state = response.getState();
            if( (state === 'SUCCESS' || state ==='DRAFT') && component.isValid()){
                var responseValue = response.getReturnValue();
                // Parse the respose
                var obj = JSON.parse(responseValue);
                //console.log('responseValue>>'+obj);
                var responseData = JSON.parse(obj);
                console.log('responseData>>'+responseData.success);
                if(responseData.success){
                    alert(saveCompEventParamvalue.filePath+' is successfully updated.');
                    
                }
                /*component.set("v.selectedLWCRecords",responseData.records);
                var webEditorEditLWC= component.find("webEditorEditLWC");
                var webEditorElement= webEditorEditLWC.getElement();
                webEditorElement.doCallback();*/
            } else if( state === 'INCOMPLETE'){
                alert("User is offline, device doesn't support drafts.");
                console.log("User is offline, device doesn't support drafts.");
            } else if( state === 'ERROR'){
                alert('Problem saving record, error: ' +JSON.stringify(response.getError()));
                console.log('Problem saving record, error: ' +JSON.stringify(response.getError()));
            } else{
                alert('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
                console.log('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
            }

        });
        $A.enqueueAction(action);
    },

    onHandleAddFileClick: function(component, event, helper) {
        
        var addFileEventParam = event.getParams("value");
        var addFileEventParamvalue= addFileEventParam.value;
        //console.log('addFileEventParamvalue.openModal>>'+addFileEventParamvalue[0].openModal);
        //console.log('addFileEventParamvalue.lightningComponentBundleId>>'+addFileEventParamvalue[0].lightningComponentBundleId);
        component.set("v.openModal",addFileEventParamvalue[0].openModal);
        component.set("v.openModalList",addFileEventParamvalue);
        //component.set("v.lwcRecords",responseData.records);
        //console.log(component.get("v.openModalList").fileElement.openModal);
        //console.log('addFileEventParamvalue>>'+addFileEventParamvalue);
        var webEditModalPopupLWC= component.find("webModalPopupLWC");
        //console.log('webEditorModalPopupLWC>>'+webEditModalPopupLWC);
        var webEditElement= webEditModalPopupLWC.getElement();
        //console.log('webEditElement>>'+webEditElement);
        webEditElement.doCallback();
        /*console.log('addFileEventParamvalue>>1'+addFileEventParamvalue.lightningComponentBundleId);
        var action = component.get('c.addFileApiCall');
        action.setParams({ "bundleId" : addFileEventParamvalue.lightningComponentBundleId, "filePath" : addFileEventParamvalue.filePath, "format" : addFileEventParamvalue.format });
        action.setCallback(this, function(response){
            var state = response.getState();
            if( (state === 'SUCCESS' || state ==='DRAFT') && component.isValid()){
                var responseValue = response.getReturnValue();
                // Parse the respose
                var obj = JSON.parse(responseValue);
                console.log('responseValue>>'+obj);
                var responseData = JSON.parse(obj);
                console.log('responseData>>'+responseData.success);
                if(responseData.success){
                    alert(addFileEventParamvalue.filePath+' is successfully created.');
                    //window.location.reload();
                    var webEditorEditLWC= component.find("webEditorHomeLWC");
                    var webEditorElement= webEditorEditLWC.getElement();
                    webEditorElement.viewCodeClick();
                }*/
                /*component.set("v.selectedLWCRecords",responseData.records);
                var webEditorEditLWC= component.find("webEditorEditLWC");
                var webEditorElement= webEditorEditLWC.getElement();
                webEditorElement.doCallback();*/
            /*} else if( state === 'INCOMPLETE'){
                alert("User is offline, device doesn't support drafts.");
                console.log("User is offline, device doesn't support drafts.");
            } else if( state === 'ERROR'){
                alert('Problem saving record, error: ' +JSON.stringify(response.getError()));
                console.log('Problem saving record, error: ' +JSON.stringify(response.getError()));
            } else{
                alert('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
                console.log('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
            }

        });
        $A.enqueueAction(action);*/
    },

    onHandleSaveFilePopupClick: function(component, event, helper) {
        var saveFilePopupEventParam = event.getParams("value");
        var saveFilePopupEventParamvalue= saveFilePopupEventParam.value;
        var action = component.get('c.addFileApiCall');
        action.setParams({ "bundleId" : saveFilePopupEventParamvalue.lightningComponentBundleId, "filePath" : saveFilePopupEventParamvalue.filePath, "format" : saveFilePopupEventParamvalue.format });
        action.setCallback(this, function(response){
            var state = response.getState();
            if( (state === 'SUCCESS' || state ==='DRAFT') && component.isValid()){
                var responseValue = response.getReturnValue();
                // Parse the respose
                var obj = JSON.parse(responseValue);
                console.log('responseValue>>'+obj);
                var responseData = JSON.parse(obj);
                console.log('responseData>>'+responseData.success);
                if(responseData.success){
                    alert(saveFilePopupEventParamvalue.filePath+' is successfully created.');
                    //window.location.reload();
                    var webEditorEditLWC= component.find("webEditorHomeLWC");
                    var webEditorElement= webEditorEditLWC.getElement();
                    webEditorElement.viewCodeClick();
                }
                /*component.set("v.selectedLWCRecords",responseData.records);
                var webEditorEditLWC= component.find("webEditorEditLWC");
                var webEditorElement= webEditorEditLWC.getElement();
                webEditorElement.doCallback();*/
            } else if( state === 'INCOMPLETE'){
                alert("User is offline, device doesn't support drafts.");
                console.log("User is offline, device doesn't support drafts.");
            } else if( state === 'ERROR'){
                alert('Problem saving record, error: ' +JSON.stringify(response.getError()));
                console.log('Problem saving record, error: ' +JSON.stringify(response.getError()));
            } else{
                alert('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
                console.log('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
            }

        });
        $A.enqueueAction(action);
    },

    onHandleDeleteFileClick: function(component, event, helper) {
        var deleteFileEventParam = event.getParams("value");
        var deleteFileEventParamvalue= deleteFileEventParam.value;
        console.log('deleteFileEventParamvalue>>1'+deleteFileEventParamvalue.id);
        var action = component.get('c.deleteFileApiCall');
        action.setParams({ "fileId" : deleteFileEventParamvalue.id });
        action.setCallback(this, function(response){
            var state = response.getState();
            if( (state === 'SUCCESS' || state ==='DRAFT') && component.isValid()){
                alert(deleteFileEventParamvalue.filePath+' is successfully deleted.');
                var webEditorEditLWC= component.find("webEditorHomeLWC");
                console.log('webEditorEditLWC>>'+webEditorEditLWC);
                var webEditorElement= webEditorEditLWC.getElement();
                console.log('webEditorElement>>'+webEditorElement);
                webEditorElement.viewCodeClick();
                /*var responseValue = response.getReturnValue();
                // Parse the respose
                var obj = JSON.parse(responseValue);
                console.log('responseValue>>'+obj);
                var responseData = JSON.parse(obj);
                console.log('responseData>>'+responseData.success);
                if(responseData.success){
                    alert(deleteFileEventParamvalue.filePath+' is successfully deleted.');
                    window.location.reload();
                }*/
                /*component.set("v.selectedLWCRecords",responseData.records);
                var webEditorEditLWC= component.find("webEditorEditLWC");
                var webEditorElement= webEditorEditLWC.getElement();
                webEditorElement.doCallback();*/
            } else if( state === 'INCOMPLETE'){
                alert("User is offline, device doesn't support drafts.");
                console.log("User is offline, device doesn't support drafts.");
            } else if( state === 'ERROR'){
                alert('Problem saving record, error: ' +JSON.stringify(response.getError()));
                console.log('Problem saving record, error: ' +JSON.stringify(response.getError()));
            } else{
                alert('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
                console.log('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
            }

        });
        $A.enqueueAction(action);
    },

    onHandleDeleteCompClick: function(component, event, helper) {
        var deleteCompEventParam = event.getParams("value");
        var deleteCompEventParamvalue= deleteCompEventParam.value;
        console.log('deleteFileEventParamvalue>>1'+deleteCompEventParamvalue);
        var action = component.get('c.deleteCompApiCall');
        action.setParams({ "compId" : deleteCompEventParamvalue});
        action.setCallback(this, function(response){
            var state = response.getState();
            if( (state === 'SUCCESS' || state ==='DRAFT') && component.isValid()){
                alert(deleteCompEventParamvalue +' is successfully deleted.');
                window.location.reload();
                /*var responseValue = response.getReturnValue();
                // Parse the respose
                var obj = JSON.parse(responseValue);
                console.log('responseValue>>'+obj);
                var responseData = JSON.parse(obj);
                console.log('responseData>>'+responseData.success);
                if(responseData.success){
                    alert(deleteFileEventParamvalue.filePath+' is successfully deleted.');
                    window.location.reload();
                }*/
                /*component.set("v.selectedLWCRecords",responseData.records);
                var webEditorEditLWC= component.find("webEditorEditLWC");
                var webEditorElement= webEditorEditLWC.getElement();
                webEditorElement.doCallback();*/
            } else if( state === 'INCOMPLETE'){
                alert("User is offline, device doesn't support drafts.");
                console.log("User is offline, device doesn't support drafts.");
            } else if( state === 'ERROR'){
                alert('Problem saving record, error: ' +JSON.stringify(response.getError()));
                console.log('Problem saving record, error: ' +JSON.stringify(response.getError()));
            } else{
                alert('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
                console.log('Unknown problem, state: ' + state +', error: ' + JSON.stringify(response.getError()));
            }

        });
        $A.enqueueAction(action);
    }
})