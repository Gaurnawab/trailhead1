public inherited sharing class LWCExampleController {
    
    @AuraEnabled
    public static ContentVersion saveFile(Id idParent, String strFileName, String base64Data) {
        // Decoding base64Data
        //base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        
        // inserting file
        /*ContentVersion cv = new ContentVersion();
        cv.Title = strFileName;
        cv.PathOnClient = '/' + strFileName;
        cv.FirstPublishLocationId = idParent;
        cv.VersionData = EncodingUtil.base64Decode(base64Data);
        cv.IsMajorVersion = true;
        Insert cv;
        return cv;*/
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://efficiency-nosoftware-7192-dev-ed.cs6.my.salesforce.com/services/data/v35.0/chatter/feed-elements');
        req.setHeader('Authorization','Bearer 00DN0000000XpAj!AQcAQG8.JdE6eF8nxrgR426MJv.FFasqvAWgy9Yty03V8OgR.DkVz.SUUoF4zYRap6dpnitJQnDMIhIytbegLc._aZVs8iRX');
        req.setHeader('Content-Type','multipart/form-data; boundary=a7V4kRcFA8E79pivMuV2tukQ85cmNKeoEgJgq');
        req.setHeader('Accept','*/*');
        req.setHeader('Content-Disposition','form-data; name="feedElementFileUpload"; filename="/'+strFileName+'"');
        req.setHeader('Content-Disposition','form-data; name="feedElement";{"body":{"messageSegments":[{"type":"Text","text":"Some Text file."}]},"capabilities":{"content":{"description":"Some css file","title":"carDetail.css"}},"feedElementType":"FeedItem","subjectId":"001N000001tvq0HIAQ"}');
        req.setMethod('POST');
        Http http = new Http();
        HTTPResponse res = http.send(req);
        System.debug(res.getStatus());
        System.debug(res.getBody());
        

        /*
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            // Cast the values in the 'animals' key as a list
            List<Object> animals = (List<Object>) results.get('animals');
            System.debug('Received the following animals:');
            for (Object animal: animals) {
                System.debug(animal);
            }
        }*/
        ContentVersion cv = new ContentVersion();
        cv.Title = strFileName;
        cv.PathOnClient = '/' + strFileName;
        cv.FirstPublishLocationId = idParent;
        cv.VersionData = EncodingUtil.base64Decode(base64Data);
        cv.IsMajorVersion = true;
        //Insert cv;
        return cv;
    }
    
    @AuraEnabled
    public static list<contentversion> releatedFiles(Id idParent){
        list<id> lstConDocs = new list<id>();
        for(ContentDocumentLink cntLink : [Select Id, ContentDocumentId From ContentDocumentLink Where LinkedEntityId =:idParent]) {
            lstConDocs.add(cntLink.ContentDocumentId);
        }
        if(!lstConDocs.isEmpty()) {
            return [SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs];
        }
        else {
            return null;
        }
     
    }
    
}