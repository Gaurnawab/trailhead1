({
    doInit : function(component, event, helper) {
        helper.onHandleInit(component, event, helper);
    },

    selectedLWCRecord: function(component, event, helper) {
        helper.onHandleViewClick(component, event, helper);
    },

    compNameChange: function(component, event, helper) {
        helper.onHandleCreateClick(component, event, helper);
    }
})