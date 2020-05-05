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
            return JSON.serialize(resp.getBody());
        }
        return '';
    }

}
