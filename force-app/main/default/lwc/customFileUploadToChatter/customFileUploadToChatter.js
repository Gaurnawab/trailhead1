import { LightningElement, track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CustomFileUploadToChatter extends LightningElement {
    @track fileName = '';
    filesUploaded = [];
    file;
    fileContents;
    fileReader;
    handleFilesChange(event){
        if(event.target.files.length > 0) {
            this.filesUploaded = event.target.files;
            this.fileName = event.target.files[0].name;
        }
    }
    handleSave(){
        if(this.filesUploaded.length > 0) {
            this.uploadHelper();
        }
    }
    uploadHelper(){
        this.file = this.filesUploaded[0];
        console.log('this.file>>'+this.file.size);
        this.fileReader= new FileReader();
        // set onload function of FileReader object  
        this.fileReader.onloadend = (() => {
            this.fileContents = this.fileReader.result;
            console.log('this.fileContents1>>'+this.fileContents);
            let base64 = 'base64,';
            this.content = this.fileContents.indexOf(base64) + base64.length;
            this.fileContents = this.fileContents.substring(this.content);
            
            // call the uploadProcess method 
            this.saveToFile();
        });
        this.fileReader.readAsDataURL(this.file);
        
    }
    saveToFile(){
        var item = 
        {
            "body":
            {
                "messageSegments" : [{"type":"Text","text":"Some Text file."}]
            },
            "feedElementType" : "FeedItem",
            "subjectId" : "001N000001tvq0HIAQ"
        };
        console.log('this.fileContents2>>'+this.fileContents);
        if(this.fileContents)
        {
            item.capabilities =
            {
                "content" :
                {
                    "description": "File attachment from Clienteling",
                    "title": "Some File"
                }
            };
            console.log('this.fileContents3>>'+this.fileContents);
            var data = new FormData();
            data.append("feedElement", JSON.stringify(item));
            data.append("feedElementFileUpload", this.fileContents);
            console.log('Data>>'+data);
            var req = new XMLHttpRequest();
            console.log('Data2>>'+data);
            /*req.addEventListener("load", function(event)
                {
                    success(req);
                    console.log('Data3>>'+data);
                }, false);
            req.addEventListener("error", fail, false);*/
            console.log('Data4>>'+data);
            req.open("POST",self.base + "/feed-elements", true);
            req.setRequestHeader("Authorization", self.bearer);
            console.log('request1>>'+req);
            req.onload = function() {
                console.log('response.type1>>'+this.responseText);
                console.log('response.type3>>'+this.status);
            }
            req.send(data);
            
            console.log('request2>>'+req);
            //console.log('response.type2>>'+this.responseText);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: this.fileName + ' - Uploaded Successfully!!!',
                    variant: 'success',
                }),
            );
        }
    }
}