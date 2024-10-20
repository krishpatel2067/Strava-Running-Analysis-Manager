// custom menu
let shouldFetch = false;

function onOpen() {
  let ui = SpreadsheetApp.getUi();
 
  ui.createMenu('Strava App')
    .addItem('Sync Latest', 'syncButtonHandler')
    .addToUi();
  
  let lastFetchedDateStr = PropertiesService.getScriptProperties().getProperty(FETCH_DATE_PROP);

  Logger.log("Last fetched: ");
  Logger.log(lastFetchedDateStr);

  if (lastFetchedDateStr == null || lastFetchedDateStr == "")
  {
    Logger.log("fetched property null or blank");
    shouldFetch = true;
    return;
  }

  let lastFetchedDate = sUtil.getDateFromStr(lastFetchedDateStr);
  Logger.log("last fetched date: ");
  Logger.log(lastFetchedDate);

  // compare fetched date to today's (disregard time so no need for 24-hour waits, just the next day)
  if (sUtil.getDateFromStr(sUtil.todayDateNoTime()) > lastFetchedDate)
  {
    shouldFetch = true;
  }
}

// TODO: button sync functionality that is mobile friendly