import { LightningElement, track } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';

export default class CustomUtilityBar extends LightningElement {
    @track leadName;
    @track leadStatus;
    channel = '/topic/LeadNotifications';
    connectedCallback(){
        const messageCallback =function(response){
            console.log('New message received: '+JSON.stringify(response));
            console.log('Successfully subscribed to :', JSON.stringify(response.channel));
            this.leadName = repsonse.data.sObject.name;
            this.leadStatus = response.data.sObject.status;
        };

        subscribe(this.channel,-1,messageCallback).then(response =>{
            
        });
    }

}