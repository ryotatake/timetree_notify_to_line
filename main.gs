// calendar_nameを上書きする場合は、PropertiesService.getScriptProperties().setProperty("calendar_name","xxx"); を実行する
const calendar_name = PropertiesService.getScriptProperties().getProperty("calendar_name");
const weekday = ["日", "月", "火", "水", "木", "金", "土"];

// テスト用メソッド
function timtreeTest(){
  notifyTodayEvents();
}

function notifyTodayEvents() {
  const todayEvents = JSON.parse(timetreeGetUpcomingEventsByName(calendar_name)).data;
  const message = "今日の予定だよ!\n\n" + createMessage(todayEvents);

  sendMessageToLine(message);
  //Logger.log(message);
}

function createMessage(events) {
  let message = '';
  const eventsSize = events.length;
  
  if (eventsSize === 0) {
    return message += "予定はないよ"
  }
  
  events.forEach(function(event, index) {
    const allDay = event.attributes.all_day;
    const title = event.attributes.title;
    const startAt = formatDate(new Date(event.attributes.start_at), allDay);
    const endAt = formatDate(new Date(event.attributes.end_at), allDay);

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