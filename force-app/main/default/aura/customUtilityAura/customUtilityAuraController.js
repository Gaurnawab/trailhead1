({
    doInit : function(component, event, helper){
           
           // Get the empApi component
           const empApi = component.find('empApi');
   
           // Uncomment below line to enable debug logging (optional)
           // empApi.setDebugFlag(true);
   
           // Replay option to get new events
           const replayId = -1;
    const channel = '/topic/LeadNotifications';
           
           // Subscribe to an event
           empApi.subscribe(channel, replayId, $A.getCallback(eventReceived => {

              
                   // Process event (this is called each time we receive an event)
                   console.log('Received event ', JSON.stringify(eventReceived));
                   console.log('eventReceived.data.sobject>>'+eventReceived.data.sobject);
                   component.set("v.lead", eventReceived.data.sobject);
                   var utilityAPI = component.find("utilitybar");
            utilityAPI.openUtility(utilityAPI.getEnclosingUtilityId());
   
           }))
           .then(subscription => {
        
                   // Confirm that we have subscribed to the event channel.
                   // We haven't received an event yet.

                   console.log('Subscribed to channel ', subscription.channel);
           });
           
       }
   })