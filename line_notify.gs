function sendMessageToLine(message) {
  const url = 'https://notify-api.line.me/api/notify';
  const payload = "message=" + message;
  lineNotifyAPI(url, 'post', payload);
}

function lineNotifyAPI(url, method, payload){
  const accessToken = PropertiesService.getScriptProperties().getProperty('line_notify_access_token');
  const headers = {
  　'Authorization': 'Bearer '+ accessToken
  };
  const options = {
    "method"  : method,
    "headers" : headers,
    "payload" : payload
  };

   return UrlFetchApp.fetch(url, options);
}