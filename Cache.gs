let cache = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RawCache");
let cacheRange = cache.getRange("A:A");
let cacheRetrieved = false;

function shouldFetchNewData()
{
  let lastFetchedDateStr = PropertiesService.getScriptProperties().getProperty(FETCH_DATE_PROP);

  Logger.log("Last fetched: ");
  Logger.log(lastFetchedDateStr);

  if (lastFetchedDateStr == null || lastFetchedDateStr == "")
  {
    Logger.log("Fetched property null or blank");
    return true;
  }

  let lastFetchedDate = sUtil.getDateFromStr(lastFetchedDateStr);
  Logger.log("Last fetched date: ");
  Logger.log(lastFetchedDate);

  // compare fetched date to today's (disregard time so no need for 24-hour waits, just the next day)
  if (sUtil.getDateFromStr(sUtil.todayDateNoTime()) > lastFetchedDate)
  {
    Logger.log("All good to fetch: it is at least the next day")
    return true;
  }

  return false;
}

function getCachedData()
{
    Logger.log("Retrieving cache...");
    // retrieve cache
    let data = [];
    let dataRange = cache.getDataRange();
    let activityObj;

    for (let r = 1; r <= dataRange.getLastRow(); r++)
    {
      let raw = dataRange.getCell(r, 1).getValue();
      if (raw == "") continue;
      activityObj = JSON.parse(raw);
      data.push(activityObj);
    }

    cacheRetrieved = true;
    Logger.log("Got cache");

    return data;
}

function setCache(index, data)
{
    cacheRange.getCell(index + 1, 1).setValue(JSON.stringify(data));
}

