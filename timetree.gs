function timetreeGetUpcomingEventsByName(name) {
  const id = timetreeGetCalendarIdByName(name);
  return timetreeGetUpcomingEvents(id);
}

function timetreeGetUpcomingEvents(id) {
  const url = 'https://timetreeapis.com/calendars/' + id + '/upcoming_events?timezone=Asia/Tokyo';
  const method = 'GET'; 
  const payload = '';
  return timetreeAPI(url, method, payload);
}

function timetreeGetCalendars() {
  const url = 'https://timetreeapis.com/calendars';
  const method = 'GET';
  const payload = '';
  return timetreeAPI(url, method, payload);
}

function timetreeGetCalendarIdByName(name) {
  const response = timetreeGetCalendars();
  const calendars = JSON.parse(response).data;
  
  const calendar = calendars.filter(function(data){
    return data.attributes.name.toString() === name;
  });
  return calendar[0].id;
}

function timetreeAPI(url, method, payload) {
 const accessToken = PropertiesService.getScriptProperties().getProperty('timetree_personal_access_token');
 const headers = {
   'Authorization': 'Bearer '+ accessToken
 };
 const options = {
   'method': method,
   'headers': headers,
   'payload': payload
 };
 
 const response = UrlFetchApp.fetch(url, options);
 return response;
}