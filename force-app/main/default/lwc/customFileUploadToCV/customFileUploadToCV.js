import { LightningElement, track } from 'lwc';

export default class CustomFileUploadToCV extends LightningElement {
    @track fileName = '';
    filesUploaded = [];
    file;
    fileContents;
    fileReader;
    content;
    boundary;
    
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
        /*this.fileReader= new FileReader();
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
        this.fileReader.readAsDataURL(this.file);*/
        this.saveToFile();
    }
    saveToFile(){
        var data = new FormData();
        data.append("entity_content", "{ \"PathOnClient\" : \"IMG_0400.jpg\", \"Title\": \"IMG_0400.jpg\"}");
        data.append("VersionData", this.file, "/C:/Users/Rishiraj_s/Downloads/carDetail.css");
        
        var xhr = new XMLHttpRequest();
        //xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
            } else{
                console.log(this.status);
            }
        });
        console.log('URL'+window.location.href.substring(0,window.location.href.indexOf('.')));
        xhr.open("POST", 	"https://efficiency-nosoftware-7192-dev-ed.cs6.my.salesforce.com/services/data/v37.0/sobjects/ContentVersion");
        xhr.setRequestHeader("Authorization", "Bearer 00DN0000000XpAj!AQcAQJbeb3_JuLt1lBvNbnHdxqMycm3rxukggmvf53fCwhY5T8NpmKCjSygp4xXnWf2bX5JpdHIfvHURXgOgdbhUdeCOHIkQ",true);
        //xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=a7V4kRcFA8E79pivMuV2tukQ85cmNKeoEgJgq");
        xhr.setRequestHeader("Accept", "*/*");
        //xhr.setRequestHeader("Access-Control-Allow-Origin","https://efficiency-nosoftware-7192-dev-ed.lightning.force.com");
        //xhr.setRequestHeader("Access-Control-Request-Method","POST");
        //xhr.setRequestHeader("Access-Control-Request-Headers","Content-Type");
        console.log('xhr'+xhr);
        xhr.send(data);
        /*var req = new XMLHttpRequest();
        this.boundary = '----a7V4kRcFA8E79pivMuV2tukQ85cmNKeoEgJgq';
        console.log('>>>>'+self.base + "/services/data/v39.0/sobjects/ContentVersion");
        req.open("POST",self.base + "/services/data39.0/sobjects/ContentVersion", true);
        req.setRequestHeader("Content-Type",  "application/json;charset=UTF-8");
        req.responseType = 'json'
        req.setRequestHeader("Authorization", self.bearer);
        //req.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + this.boundary);
        req.onload = function() {
            console.log('response.type1>>'+this.responseText);
            console.log('response.type3>>'+this.status);
        }
        console.log('b4 json:'+this.fileContents);
        var obj= {"PathOnClient":"xyz.jpg", "VersionData" : this.fileContents};
        var myJSON = JSON.stringify(obj);
        req.send(myJSON);
        //req.send(new Blob([this.getRequestDataPart1(), this.file, this.getRequestDataPart2()]));*/
    }
    /*getRequestDataPart1(){
        var item={
            "PathOnClient" : "${this.fileName}"
        }
        let data =
        `--a7V4kRcFA8E79pivMuV2tukQ85cmNKeoEgJgq
        Content-Disposition: form-data; name="entity_content";
        Content-Type: application/json
    
        {
            "ReasonForChange" : "Marketing materials updated", // not actually required
            "PathOnClient" : "${this.fileName}"
        }
    
        --a7V4kRcFA8E79pivMuV2tukQ85cmNKeoEgJgq
        Content-Type: ${this.mimeType}
        Content-Disposition: form-data; name="VersionData"; filename="${this.fileName}"
    
        `;
        return data;
    }

    getRequestDataPart2(){
        let data =
        `
    
        ----${this.boundary}--
        `;
        return data;
    }*/
}