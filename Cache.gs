let rawCache = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RawCache");
let processedCache = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ProcessedCache");
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
    Logger.log("Retrieving raw cache...");
    let data = [];
    let dataRange = rawCache.getDataRange();
    let activityObj;

    for (let r = 1; r <= dataRange.getLastRow(); r++)
    {
      let raw = dataRange.getCell(r, 1).getValue();
      if (raw == "") continue;
      activityObj = JSON.parse(raw);
      data.push(activityObj);
    }

    cacheRetrieved = true;
    Logger.log("Got raw cache");

    return data;
}

function setCache(index, data)
{
    cache.getRange("A:A").getCell(index + 1, 1).setValue(JSON.stringify(data));
}

function setCacheProcesseData(processed)
{
  // iterate through all types of activities & assign diff column
  for (let k in processed)
  {
    
  }
}