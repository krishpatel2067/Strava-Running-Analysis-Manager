/* PURPOSE: Turn raw data into organized data for easier use. */

/* STRUCTURE

  {
    "run": [ { "Name": "", "Distance": 0, "Date": "" }, { Run2Data } ],   // all sorted by date
    "walk": []    // same as above
    "elliptical": []    // just a few activities anyway, but same as above
  }

*/

let i = 0;

// TODO: cache the ordered data (takes forever to create one every time lol)
function getProcessedData() {
  let raw = sFetchData.getRawStravaActivityData();
  let processed = {};

  raw.forEach(function(activity) {
    let type = activity.type;

    if (processed[type] == null) 
      processed[type] = [];

    if (i >= 0) {
      Logger.log("Activity getProcessedData");
      Logger.log(activity);
      let index = __getIndexToMaintainDateOrder(processed[type], activity);
      processed[type].splice(index, 0, activity);
      Logger.log(processed[type]);
      i++;
    }
  });

  return processed;
}

function __getIndexToMaintainDateOrder(arr, elem)
{
  let elemDate = new Date(elem.start_date);

  for (let i = 0; i < arr.length; i++)
  {
    let currDate = new Date(arr[i].start_date);

    if (elemDate <= currDate)
    {
      return index;
    }
  }
}
