var calendar_name = PropertiesService.getScriptProperties().getProperty("calendar_name");

// テスト用メソッド
function timtreeTest(){
  Logger.log(timetreeGetUpcomingEventsByName(calendar_name));
  //sendMessageToLine("テストだよ");
}

function timetreeGetUpcomingEventsByName(name) {
  var id = timetreeGetCalendarIdByName(name);
  return timetreeGetUpcomingEvents(id);
}

function timetreeGetUpcomingEvents(id) {
  var url = 'https://timetreeapis.com/calendars/' + id + '/upcoming_events?timezone=Asia/Tokyo';
  var method = 'GET'; 
  var payload = '';
  return timetreeAPI(url, method, payload);
}

function timetreeGetCalendars() {
  var url = 'https://timetreeapis.com/calendars';
  var method = 'GET';
  var payload = '';
  return timetreeAPI(url, method, payload);
}

function timetreeGetCalendarIdByName(name) {
  var response = timetreeGetCalendars();
  var calendars = JSON.parse(response);
  
  var calendar = calendars.data.filter(function(data){
    return data.attributes.name.toString() === name;
  });
  return calendar[0].id;
}
  
// TimeTree APIをコールするメソッド
function timetreeAPI(url, method, payload) {
 var accessToken = PropertiesService.getScriptProperties().getProperty('timetree_personal_access_token');
 var headers = {
   'Authorization': 'Bearer '+ accessToken
 };
 var options = {
   'method': method,
   'headers': headers,
   'payload': payload
 };
 
 var response = UrlFetchApp.fetch(url, options);
 return response;
}

function sendMessageToLine(message) {
  var url = 'https://notify-api.line.me/api/notify';
  var payload = "message=" + message;
  lineNotifyAPI(url, 'post', payload);
}

function lineNotifyAPI(url, method, payload){
  var accessToken = PropertiesService.getScriptProperties().getProperty('line_notify_access_token');
  var headers = {
   'Authorization': 'Bearer '+ accessToken
  };
  var options =
   {
     "method"  : method,
     "headers" : headers,
     "payload" : payload
   };

   return UrlFetchApp.fetch(url, options);
}