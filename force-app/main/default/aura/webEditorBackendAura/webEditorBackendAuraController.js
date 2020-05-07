({
    doInit : function(component, event, helper) {
        helper.onHandleInit(component, event, helper);
    },

    selectedLWCRecord: function(component, event, helper) {
        helper.onHandleViewClick(component, event, helper);
    },

    compNameChange: function(component, event, helper) {
        helper.onHandleCreateClick(component, event, helper);
    },

    saveCompEvent: function(component, event, helper) {
        helper.onHandleSaveClick(component, event, helper);
    },

    addFileEvent: function(component, event, helper) {
        helper.onHandleAddFileClick(component, event, helper);
    },

    saveFilePopupEvent: function(component, event, helper) {
        helper.onHandleSaveFilePopupClick(component, event, helper);
    },

    deleteFileCompEvent: function(component, event, helper) {
        helper.onHandleDeleteFileClick(component, event, helper);
    },

    deleteCompEvent: function(component, event, helper) {
        helper.onHandleDeleteCompClick(component, event, helper);
    }
    
})