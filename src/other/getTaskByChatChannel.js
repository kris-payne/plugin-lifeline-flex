function sendResponse(data) {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Credentials", "true");
  response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.appendHeader("Content-Type", "application/json");
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setBody(data);
  return response;
}
exports.handler = function(context, event, callback) {
    const accountSid = context.ACCOUNT_SID;
    const authToken = context.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const response = new Twilio.Response();
    
    client.taskrouter.workspaces(context.taskrouterWorkspace)
      .tasks
      .list({
         evaluateTaskAttributes: `channelSid == "${event.channelSid}"`,
         limit: 20
       })
      .then(tasks => tasks.forEach(t => {
        console.log(t.sid);  
        client.taskrouter.workspaces(context.taskrouterWorkspace)
                     .tasks(t.sid)
                     .update({
                        assignmentStatus: 'wrapping',
                        reason: 'customer ended chat'
                      })
                     .then(task => {
                        response.setBody(t.sid);
                            return callback(null, sendResponse({
                                sid: t.sid
                            }));
                    }) 
                     .catch((error) => {
                        console.log('error'); 
                        response.setBody(error);
                        return callback(null, sendResponse({
                            error: error
                    }));
                });
        }))
        .catch((error) => {
            console.log('error2');
            response.setBody(error);
            return callback(null, sendResponse({
                error: error
            }));
        });
    };