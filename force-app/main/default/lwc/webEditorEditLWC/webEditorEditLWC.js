import { LightningElement, track, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import CSS_FILE from '@salesforce/resourceUrl/customStylingCSS';

export default class WebEditorEditLWC extends LightningElement {
    @track lwcCode;
    @api selectedlwcrecord;
    @track lwcRecords;
    @track selectedTabValue;
    @track isSaved;

    @api
    doCallback(){
        this.lwcCode= this.selectedlwcrecord;
        this.lwcRecords= [];
        this.lwcCode.forEach(element=>{
            const lwcRecord={};
            lwcRecord.id= element.Id;
            lwcRecord.filePath= element.FilePath;
            lwcRecord.source= element.Source;
            lwcRecord.isSaved= true;
            this.lwcRecords.push(lwcRecord);
            //console.log('element.filePath>>'+element.filePath);
            //console.log('element.source.asByteArray>>'+element.source.asByteArray);
        });
        
    }

    tabChangeHandler(event){
        this.selectedTabValue = event.target.value;
        console.log('this.selectedTabValue>>'+event.target.value);
    }

    editCompClick(event){
        console.log('currentRecordId>>'+event.target.name);
        this.lwcRecords.forEach(element=>{
            console.log('element.Id>>'+element.id);
            if(element.id == event.target.name){
                element.isSaved= false;
            }
        });
    }
    
    saveCompClick(event){
        console.log('currentRecordId>>'+event.target.name);
        this.lwcRecords.forEach(element=>{
            console.log('element.Id>>'+element.id);
            if(element.id == event.target.name){
                element.isSaved= true;
            }
        });
    }

    saveAllCompClick(){
        this.lwcRecords.forEach(element=>{
            element.isSaved= true;
        });
    }

    connectedCallback() {
        loadStyle(this, CSS_FILE)
        .then(() => {});
    }

    
}