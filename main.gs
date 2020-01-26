var calendar_name = PropertiesService.getScriptProperties().getProperty("calendar_name");
var weekday = ["日", "月", "火", "水", "木", "金", "土"];

// テスト用メソッド
function timtreeTest(){
  notifyTodayEvents();
}

function notifyTodayEvents() {
  var todayEvents = JSON.parse(timetreeGetUpcomingEventsByName(calendar_name)).data;
  var message = "今日の予定だよ!\n\n" + createMessage(todayEvents);

  sendMessageToLine(message);
  //Logger.log(message);
}

function createMessage(events) {
  var message = '';
  var eventsSize = events.length;
  
  if (eventsSize === 0) {
    return message += "予定はないよ"
  }
  
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
    return Utilities.formatDate(date, 'JST', 'MM/dd(' + weekday[date.getDay()] + ')');
  } else {
    return Utilities.formatDate(date, 'JST', 'MM/dd(' + weekday[date.getDay()] + ') HH:mm');
  }
}