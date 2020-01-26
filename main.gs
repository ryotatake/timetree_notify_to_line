var calendar_name = PropertiesService.getScriptProperties().getProperty("calendar_name");

// テスト用メソッド
function timtreeTest(){
  notifyTodayEvents();
}

function notifyTodayEvents() {
  var todayEvents = JSON.parse(timetreeGetUpcomingEventsByName(calendar_name)).data;
  var message = "今日の予定だよ!\n\n" + createMessage(todayEvents);
  //sendMessageToLine(message);
  Logger.log(message);
}

function createMessage(events) {
  var message = '';
  var eventsSize = events.length;
  
  events.forEach(function(event, index) {
    var allDay = event.attributes.all_day;
    var title = event.attributes.title;
    var startAt = formatDate(new Date(event.attributes.start_at), allDay);
    var endAt = formatDate(new Date(event.attributes.end_at), allDay);

    message += startAt + ' - ' + endAt + "\n" + title;
    
    if (index < eventsSize - 1) message += "\n\n";
  });
  
  return message;
}

function formatDate(date, allDay) {
  if (allDay) {
    return Utilities.formatDate(date, 'JST', 'MM/dd');
  } else {
    return Utilities.formatDate(date, 'JST', 'MM/dd HH:mm');
  }
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