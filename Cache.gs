let cache = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Cache");
let cacheRange = cache.getRange("A:A");
let cacheRetrieved = false;

function getCachedData()
{
    Logger.log("Retrieving cache...");
    // retrieve cache
    let data = [];
    let dataRange = cache.getDataRange();
    let activityObj;

    for (let r = 1; r <= dataRange.getLastRow(); r++)
    {
        activityObj = JSON.parse(dataRange.getCell(r, 1).getValue());
        data.push(activityObj);
    }

    cacheRetrieved = true;
    Logger.log("Got cache");
}

function setCache(index, data)
{
    cacheRange.getCell(index + 1, 1).setValue(JSON.stringify(data));
}

