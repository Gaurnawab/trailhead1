import { LightningElement, track, api } from 'lwc';

export default class WebEditorHomeLWC extends LightningElement {
    @api componentsize;
    @api lwcrecordlist;
    @track compSize;
    @track lwcRecords;

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
        //this.value = event.detail.value;
    }
    handleClick(){

    }
}