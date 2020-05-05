import { LightningElement, track, api } from 'lwc';

export default class WebEditorHomeLWC extends LightningElement {
    @api componentsize;
    @api lwcrecordlist;
    @track compSize;
    @track lwcRecords;
    @track selectedRecord;

    @api
    doCallback(){
        console.log('this.componentsize>>'+ this.componentsize);
        this.compSize = this.componentsize;
        this.lwcRecords = [];
        if(this.lwcrecordlist){
            this.lwcrecordlist.forEach(element=>{
                const lwcRecord={};
                lwcRecord.label= element.DeveloperName;
                lwcRecord.value= element.Id;
                this.lwcRecords.push(lwcRecord);
            });
        }
    }

    handleChange(event) {
        this.selectedRecord = event.detail.value;
        console.log('this.selectedRecord>>'+this.selectedRecord);
    }

    viewCodeClick(){
        if(this.selectedRecord){
            console.log('this.selectedRecord>>viewCodeClick'+this.selectedRecord);
            const selectedLWCRecordEvent = new CustomEvent('selectedlwcrecord',{ detail : {value: this.selectedRecord}, bubbles : true });
            this.dispatchEvent(selectedLWCRecordEvent);
        }
    }
}