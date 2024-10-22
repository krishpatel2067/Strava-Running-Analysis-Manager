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
  let shouldFetch = sCache.shouldFetchNewData();
  let hasCache = sCache.hasProcessedCache();
  let processed = {};

  // actually process if new data was collected (or no cache exists), otherwise just resort to the cache
  if (!hasCache) {
    Logger.log("Cache exists? " + hasCache);
    Logger.log("Processing data...");
    raw.forEach(function (activity) {
      let type = activity.type;

      if (processed[type] == null)
        processed[type] = [];

      if (i >= 0) {
        Logger.log("Activity getProcessedData");
        // Logger.log(activity);
        let index = __getIndexToMaintainDateOrder(processed[type], activity);
        processed[type].splice(index, 0, activity);
        // Logger.log(processed[type]);
        i++;
      }
    });

    sCache.setCacheProcesseData(processed);
  } else {
    Logger.log("Falling back on processed cache")
    processed = sCache.getCachedProcessedData();
  }
  return processed;
}

function __getIndexToMaintainDateOrder(arr, elem) {
  let elemDate = new Date(elem.start_date);

  for (let i = 0; i < arr.length; i++) {
    let currDate = new Date(arr[i].start_date);

    if (elemDate <= currDate) {
      return index;
    }
  }
}
