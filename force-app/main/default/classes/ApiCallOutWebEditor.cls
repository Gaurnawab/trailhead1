public with sharing class ApiCallOutWebEditor {
    /*
 * @Name : - fetchUserSessionId
 * @Description: - Call the VF page and get the Log In Use Session Id
 * @Params : - none
 * @ReturnType : - String
 */
 public static String fetchUserSessionId(){
    String sessionId = '';
    // Refer to the Page
    PageReference reportPage = Page.GetSessionIdVF;
    // Get the content of the VF page
    String vfContent = reportPage.getContent().toString();
    System.debug('vfContent '+vfContent);
    // Find the position of Start_Of_Session_Id and End_Of_Session_Id
    Integer startP = vfContent.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
    endP = vfContent.indexOf('End_Of_Session_Id');
    // Get the Session Id
    sessionId = vfContent.substring(startP, endP);
    System.debug('sessionId '+sessionId);
    // Return Session Id
    return sessionId;
    }
    /*
    * @Name - makeAPICall
    * @Description - Responsible for making API Call out
    * @params - None
    * @ReturnType - String
    */
    @AuraEnabled
    public static String makeAPICall(){
        String sessionId = fetchUserSessionId();
        HTTP h = new HTTP();
        HTTPRequest req = new HTTPRequest();
        HttpResponse resp = new HttpResponse();
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + sessionId);
        req.setEndpoint(URL.getSalesforceBaseUrl().toExternalForm() + '/services/data/v48.0/tooling/query/?q=Select+Id,DeveloperName,CreatedBy.Name,CreatedDate,LastModifiedDate+From+LightningComponentBundle');
        resp = h.send(req);
        System.debug('#### Response Status '+resp.getStatus());
        System.debug('#### Response Status Code '+resp.getStatusCOde());
        System.debug(resp.getBody());
        return JSON.serialize(resp.getBody());
    }

    @AuraEnabled
    public static String makeAPICallOnClick(String lwcRecordId){
        if(lwcRecordId!=null){
            String sessionId = fetchUserSessionId();
            HTTP h = new HTTP();
            HTTPRequest req = new HTTPRequest();
            HttpResponse resp = new HttpResponse();
            req.setMethod('GET');
            req.setHeader('Authorization', 'Bearer ' + sessionId);
            req.setEndpoint(URL.getSalesforceBaseUrl().toExternalForm() + '/services/data/v48.0/tooling/query/?q=Select+Id,FilePath,Format,Source+From+LightningComponentResource+Where+LightningComponentBundleId=\''+lwcRecordId+'\'');
            resp = h.send(req);
            System.debug('#### Response Status '+resp.getStatus());
            System.debug('#### Response Status Code '+resp.getStatusCOde());
            System.debug(resp.getBody());
            System.debug(JSON.serialize(resp.getBody()));
            return JSON.serialize(resp.getBody());
        }
        return '';
    }

    @AuraEnabled
    public static string createCompoApiCall(String compName){
        if(compName!=null){
            String sessionId = fetchUserSessionId();
            HTTP h = new HTTP();
            HTTPRequest req = new HTTPRequest();
            HttpResponse resp = new HttpResponse();
            req.setHeader('Content-Type','application/json');
            req.setMethod('POST');
            req.setHeader('Authorization', 'Bearer ' + sessionId);
            req.setEndpoint(URL.getSalesforceBaseUrl().toExternalForm() + '/services/data/v48.0/tooling/sobjects/LightningComponentBundle');
            req.setBody(jsonBody(compName));
            resp = h.send(req);
            System.debug('#### Response Status '+resp.getStatus());
            System.debug('#### Response Status Code '+resp.getStatusCOde());
            System.debug(resp.getBody());
            return JSON.serialize(resp.getBody());
        }
        return '';
    }

    @AuraEnabled
    public static string saveCompApiCall(String id, String filePath, String format, String source){
        if(id!=null && filePath!=null && format!=null && source!=null ){
            String sessionId = fetchUserSessionId();
            HTTP h = new HTTP();
            HTTPRequest req = new HTTPRequest();
            HttpResponse resp = new HttpResponse();
            req.setHeader('Content-Type','application/json');
            //req.setHeader('X-HTTP-Method-Override','PATCH');
            req.setMethod('POST');
            req.setHeader('Authorization', 'Bearer ' + sessionId);
            req.setEndpoint(URL.getSalesforceBaseUrl().toExternalForm() + '/services/data/v48.0/tooling/sobjects/LightningComponentResource/Id/'+id+'?_HttpMethod=PATCH');
            req.setBody(saveCompJsonBody(filePath,format,source));
            resp = h.send(req);
            System.debug('#### Response Status '+resp.getStatus());
            System.debug('#### Response Status Code '+resp.getStatusCOde());
            System.debug(resp.getBody());
            return JSON.serialize(resp.getBody());
        }
        return '';
    }

    @AuraEnabled
    public static string addFileApiCall(String bundleId, String filePath, String format){
        if(bundleId!=null && filePath!=null && format!=null ){
            String sessionId = fetchUserSessionId();
            HTTP h = new HTTP();
            HTTPRequest req = new HTTPRequest();
            HttpResponse resp = new HttpResponse();
            req.setHeader('Content-Type','application/json');
            //req.setHeader('X-HTTP-Method-Override','PATCH');
            req.setMethod('POST');
            req.setHeader('Authorization', 'Bearer ' + sessionId);
            req.setEndpoint(URL.getSalesforceBaseUrl().toExternalForm() + '/services/data/v48.0/tooling/sobjects/LightningComponentResource');
            req.setBody(addFileJsonBody(bundleId,filePath,format));
            resp = h.send(req);
            System.debug('#### Response Status '+resp.getStatus());
            System.debug('#### Response Status Code '+resp.getStatusCOde());
            System.debug(resp.getBody());
            return JSON.serialize(resp.getBody());
        }
        return '';
    }



    public static String jsonBody(String compName){
        return '{"FullName" : "'+compName+'","Metadata" : {"apiVersion" : 48.0,"isExposed" : true,"lwcResources" : {"lwcResource" : [ {"filePath" : "lwc/'+compName+'/'+compName+'.js","source" : "aW1wb3J0IHsgTGlnaHRuaW5nRWxlbWVudCB9IGZyb20gJ2x3Yyc7DQoNCmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRDb21wIGV4dGVuZHMgTGlnaHRuaW5nRWxlbWVudCB7ICAgICAgIA0KDQp9"		}, {"filePath" : "lwc/'+compName+'/'+compName+'.html","source" : "PHRlbXBsYXRlPiAgICAgICAgDQoNCjwvdGVtcGxhdGU+"} ]  }}}';
    }

    public static String saveCompJsonBody(String filePath, String format, String source){
        String str= JSON.serialize(source);
        return '{"FilePath" : "'+filePath+'","Format" : "'+format+'","Source" : '+str+'}';
    }

    public static String addFileJsonBody(String id, String filePath, String format){
        String str= JSON.serialize('h1{}');
        return '{"LightningComponentBundleId" : "'+id+'","FilePath" : "'+filePath+'","Format" : "'+format+'","Source" : '+str+'}';
    }
}
