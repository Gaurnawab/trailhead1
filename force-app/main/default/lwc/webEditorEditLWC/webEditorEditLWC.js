import { LightningElement, track, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import CSS_FILE from '@salesforce/resourceUrl/customStylingCSS';

export default class WebEditorEditLWC extends LightningElement {
    @track lwcCode;
    @api selectedlwcrecord;
    @track lwcRecords;

    @api
    doCallback(){
        this.lwcCode= this.selectedlwcrecord;
        this.lwcRecords= [];
        this.lwcCode.forEach(element=>{
            const lwcRecord={};
            lwcRecord.id= element.Id;
            lwcRecord.filePath= element.FilePath;
            lwcRecord.source= element.Source;
            this.lwcRecords.push(lwcRecord);
            //console.log('element.filePath>>'+element.filePath);
            //console.log('element.source.asByteArray>>'+element.source.asByteArray);
        });
        
    }
    
    connectedCallback() {
        loadStyle(this, CSS_FILE)
        .then(() => {});
    }

    
}