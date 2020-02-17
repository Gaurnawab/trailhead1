public  class WebServiceController {
    public static String responseFormat='application/json';
    public static String bodyContentType='application/json';

@AuraEnabled
public static Response makeRequest(String url,  String method, String bodyContent) {
   System.debug('Making request httpResponse ' ); 
   HttpRequest request = buildRequest(url, method,bodyContent);
   HttpResponse httpRes = sendRequest(request);
   Response restRes = buildResponse(httpRes);
   return restRes;
}

private static HttpRequest buildRequest(String url, String method, String bodyContent) {
   HttpRequest request = new HttpRequest();
   System.debug('Making request httpResponse '+ url ); 
   request.setEndpoint(url);
   request.setMethod(method);
   request.setHeader('Content-Security-Policy', '*'); 

   if (bodyContent != null) {
       request.setBody(bodyContent);
       request.setHeader('Content-Type', bodyContentType); 
   }

   request.setHeader('ACCEPT', responseFormat);

   return request;
}

private static HttpResponse sendRequest(HttpRequest request) {    
   return new Http().send(request);
}

private static Response buildResponse(HttpResponse httpRes) {
   Response restRes = new Response();

   restRes.status = httpRes.getStatus();
   restRes.statusCode = httpRes.getStatusCode();
   restRes.body = httpRes.getBody();
           System.debug(' Status code is  ' + restRes.statusCode  ); 

   System.debug(' httpResponse ' + httpRes.getBody() ); 

   return restRes;
}

public class Response {

   @AuraEnabled
   public String status { get; set; }

   @AuraEnabled
   public Integer statusCode { get; set; }

   @AuraEnabled
   public String body { get; set; }
}
}