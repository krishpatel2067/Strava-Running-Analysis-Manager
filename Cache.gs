let rawCache = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RawCache");
let processedCache = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ProcessedCache");
let cacheRetrieved = false;

let ACTIVITY_TYPES = ["Run", "Walk", "Elliptical"]

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

function getCachedProcessedData()
{
  let processed = {};
  let numRows = processedCache.getDataRange().getNumRows();

  ACTIVITY_TYPES.forEach(function(actType, index)
  {
    processed[actType] = [];
    let range = processedCache.getRange(1, index + 1, numRows);

    for (let r = 1; r < numRows; r++)
    {
      let cellValue = range.getCell(r, 1).getValue();

      if (cellValue != "")
        processed[actType].push(JSON.parse(cellValue));
    }
  });
}

function setCacheProcesseData(processed)
{
  // iterate through all types of activities & assign diff column to each type
  // while rows fill up each activity of that type
  for (let k in processed)
  {
    let col = 1 + ACTIVITY_TYPES.indexOf(k);

    processed[k].forEach(function(activity, index)
    {
      let range = processedCache.getRange(index, col, 1);
      let cell = range.getCell(1, 1);
      cell.setValue(JSON.stringify(activity));
    });
  }
    Logger.log("Successfully cached all processed data")
}