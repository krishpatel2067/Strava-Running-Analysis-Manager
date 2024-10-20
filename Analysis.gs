// for runs only
function summary() {
  let data = sProcessData.getProcessedData();
  let START_ROW = 2;
  let TITLE_COL = "A";
  let VALUE_COL = "B";
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Summary");

  let summaryData = {
    totalDistance: 0,                   // in mi
    totalTime: "",                      // as "x h y m"
    // weeklyAverage: 0,                   // in mi/week
    percentDistanceRunning: 0,          // in % (how much of total distance is just running)
    averagePace: "",                    // in min/mile
  };

  let grandTotalDistance = 0;
  let totalTimeS = 0;                   // in s

  // for each run
  data.Run.forEach(function(activity, index) {
    summaryData.totalDistance += sUtil.metersToMiles(activity.distance);
    totalTimeS += activity.movingTime;
  });

  grandTotalDistance = summaryData.totalDistance;

  // for each non-run
  for (let key in data)
  {
    if (key == "Run") continue;
    let activities = data[key];
    activities.forEach(function(act) {
      Logger.log(act);
      grandTotalDistance += act.distance;
    });
  }
  
  summaryData.totalTime = Math.floor(totalTimeS/3600) + " h " + Math.floor((totalTimeS%3600) / 60) + " m"
  summaryData.percentDistanceRunning = Math.round(100 * (summaryData.totalDistance/grandTotalDistance) * 100) / 100;
  summaryData.averagePace = sUtil.getPace(totalTimeS, summaryData.totalDistance);

  let row = START_ROW;

  // update sheet
  for (let title in summaryData)
  {
    let value = summaryData[title];
    let titleCell = sheet.getRange(TITLE_COL+row+":"+TITLE_COL+row).getCell(1, 1);
    let valueCell = sheet.getRange(VALUE_COL+row+":"+VALUE_COL+row).getCell(1, 1);
    titleCell.setValue(title);
    valueCell.setValue(value);
    row++;
  }
  Logger.log(summaryData);
}
