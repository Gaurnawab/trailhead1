import { LightningElement,track,wire } from 'lwc';
import {registerListener, unregisterAllListeners} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class PubsubDemo extends LightningElement {
    @track selectedTile={};
    @wire(CurrentPageReference) pageRef;

    connectedCallback(){
        registerListener('selectedtile', this.furnitureSelectHandler, this);
    }
    
    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    furnitureSelectHandler(payload){
        this.selectedTile = payload;
    }
}