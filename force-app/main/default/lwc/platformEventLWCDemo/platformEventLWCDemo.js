import { LightningElement, track } from 'lwc';
import { subscribe, unsubscribe } from 'lightning/empApi';

export default class PlatformEventLWCDemo extends LightningElement {
    @track message;
    
}