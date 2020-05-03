public with sharing class GetSobjectRecordsApi {
    private Contact con;
    public GetSobjectRecordsApi(sObject sobj, Integer numberOfRowsToReturn, Integer numberOfRowsToSkip) {
        this.con = (Contact)sobj;
    }
    @AuraEnabled
    public static String getCalloutResponseContents(String url) {
        
        // Instantiate a new http object
        Http h = new Http();
        
        // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        
        // Send the request, and return a response
        HttpResponse res = h.send(req);
        WeatherResponse obj = WeatherResponse.parse(res.getBody());
        String s = json.serialize(obj);
        System.debug('*****response: ' + WeatherResponse.parse(res.getBody()));
        return s;
    }
}
