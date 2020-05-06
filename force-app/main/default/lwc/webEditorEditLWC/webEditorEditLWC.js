import { LightningElement, track, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import CSS_FILE from '@salesforce/resourceUrl/customStylingCSS';

export default class WebEditorEditLWC extends LightningElement {
    @track lwcCode;
    @api selectedlwcrecord;
    @track lwcRecords;
    @track selectedTabValue;
    @track isSaved;
    @api lwcbundlerecordid;

    @api
    doCallback(){
        this.lwcCode= this.selectedlwcrecord;
        this.lwcRecords= [];
        this.lwcCode.forEach(element=>{
            const lwcRecord={};
            lwcRecord.id= element.Id;
            lwcRecord.filePath= element.FilePath;
            lwcRecord.format= element.Format;
            lwcRecord.source= element.Source;
            lwcRecord.isSaved= true;
            this.lwcRecords.push(lwcRecord);
            //console.log('element.filePath>>'+element.filePath);
            //console.log('element.source.asByteArray>>'+element.source.asByteArray);
        });
        
    }

    tabChangeHandler(event){
        this.selectedTabValue = event.target.value;
        //console.log('this.selectedTabValue>>'+event.target.value);
    }

    editCompClick(event){
        //console.log('currentRecordId>>'+event.target.name);
        this.lwcRecords.forEach(element=>{
            //console.log('element.Id>>'+element.id);
            if(element.id == event.target.name){
                element.isSaved= false;
            }
        });
    }
    
    saveCompClick(event){
        //console.log('currentRecordId>>'+event.target.name);
        this.lwcRecords.forEach(element=>{
            //console.log('element.Id>>'+element.id);
            if(element.id == event.target.name){
                element.isSaved= true;
                const saveCompEvent = new CustomEvent('savecompevent',{detail : {value : element}, bubbles : true});
                this.dispatchEvent(saveCompEvent);
            }
        });
    }

    saveAllCompClick(){
        this.lwcRecords.forEach(element=>{
            //console.log('element.Id>>'+element.id);
                element.isSaved= true;
                const saveCompEvent = new CustomEvent('savecompevent',{detail : {value : element}, bubbles : true});
                this.dispatchEvent(saveCompEvent);
        });
    }

    cancelCompClick(event){
        this.lwcRecords.forEach(element=>{
            //console.log('element.Id>>'+element.id);
            if(element.id == event.target.name){
                element.isSaved= true;
                /*const saveCompEvent = new CustomEvent('savecompevent',{detail : {value : element}, bubbles : true});
                this.dispatchEvent(saveCompEvent);*/
            }
        });
    }

    cancelAllCompClick(){
        this.lwcRecords.forEach(element=>{
            //console.log('element.Id>>'+element.id);
                element.isSaved= true;
                //const saveCompEvent = new CustomEvent('savecompevent',{detail : {value : element}, bubbles : true});
                //this.dispatchEvent(saveCompEvent);
        });
    }

    addNewFileClick(){
        var readyToCreate = true;
        this.lwcRecords.forEach(element=>{
            if(element.isSaved == false){
                readyToCreate= false;
            }
        });
        if(readyToCreate){
            var filename = prompt("Please enter file name with its extension. (Ex: defaultComp.css/js/html/xml/json/svg):", "defaultComp.css");
            const fileElement = {};
            fileElement.lightningComponentBundleId = this.lwcbundlerecordid;
            console.log('fileElement.lightningComponentBundleId>>'+fileElement.lightningComponentBundleId);
            var n = filename.indexOf(".");
            var folderName = filename.substring(0, n);
            fileElement.filePath = 'lwc/'+folderName+'/'+filename;
            console.log('fileElement.filePath>>'+fileElement.filePath);
            var ind = filename.indexOf(".");
            var n = filename.length;
            var format = filename.substring(ind+1,n);
            fileElement.format= format;
            console.log('fileElement.format>>'+fileElement.format);
            const addFileEvent = new CustomEvent('addfileevent',{detail : {value : fileElement}, bubbles : true});
            this.dispatchEvent(addFileEvent);
        } else{
            alert("Please save all the open files before creating a new file.");
        }
    }

    codeChangeHandler(event){
        //console.log('source>>'+event.detail.value);
        this.lwcRecords.forEach(element=>{
            //console.log('element.Id>>'+element.id);
            if(element.id == event.target.name){
                element.source= event.detail.value;
            }
        });
    }

    connectedCallback() {
        loadStyle(this, CSS_FILE)
        .then(() => {});
    }

    
}