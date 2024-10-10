// save cache
// PropertiesService.getScriptProperties().setProperty(CACHE_PROPERTY, JSON.stringify(data));

// function todayDateArr()
// {
//   var d = new Date();
//   return [d.getMonth(), d.getDay(), d.getYear()];
// }

// var test = callStravaAPI('?after=1546300800&per_page=200&page=1');

// if (test.message == "Rate Limit Exceeded")
// if (!shouldUpdate)                // if a day hasn't passed & shouldn't get fresh data via API requests

// paste the values into the Sheet
// sheet.getRange(sheet.getLastRow() + 1, 1, stravaData.length, stravaData[0].length).setValues(stravaData);
// Logger.log(stravaData[0]);
// Logger.log(stravaData[stravaData.length - 1]);
// Logger.log(stravaData.length);

// var params = '?after=1546300800&per_page=200';
// var params = '?after=1546300800&per_page=200&page=4';

// Logger.log(JSON.stringify(data[0]));
// Logger.log(JSON.stringify(data[Math.round(data.length / 2)]));
// Logger.log(JSON.stringify(data[data.length - 1]));

// tempData = cache.getRange("A1:A1").getCell(1, 1).getValue();
// tempData = JSON.parse('{"hello":2}');

// function syncButtonHandler()
// {
//   onOpen();
//   var ui = SpreadsheetApp.getUi();

//   if (!shouldFetch)
//   {
//     var lastFetchedDate = PropertiesService.getScriptProperties().getProperty(FETCH_DATE_PROP);
//     ui.alert("Cannot Sync", "Data has already been synced once on " + lastFetchedDate + ". (The month is 1 step behind.)", ui.ButtonSet.OK);
//     return;
//   }

//   var response = ui.alert("Confirm sync?", "There is a limit to the number of times you can sync per day.", ui.ButtonSet.YES_NO_CANCEL);

//   if (response == ui.Button.YES)
//   {
//     ui.alert("Sync Successful", "", ui.ButtonSet.OK);
//     getStravaActivityData();
//   }
// }