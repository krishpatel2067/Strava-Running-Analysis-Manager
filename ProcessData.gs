/* PURPOSE: Turn raw data into organized data for easier use. */

/* STRUCTURE

  {
    "run": [ { "Name": "", "Distance": 0, "Date": "" }, { Run2Data } ],   // all sorted by date
    "walk": []    // same as above
    "elliptical": []    // just a few activities anyway, but same as above
  }

*/
// TODO: finish & test this function
function getProcessedData() {
  let raw = sFetchData.getRawStravaActivityData();
  let processed = {};

  raw.forEach(function(activity, index) {
    let type = activity.type;

    if (processed[type] == null) 
      processed[type] = [];

    __insertInDateOrder(processed[type], activity);
  });
}

function __insertInDateOrder(arr, elem)
{
  let elemDate = new Date(elem.start_date);

  for (let i = 0; i < arr.length; i++)
  {
    let currDate = new Date(arr[i].start_date);

    if (elemDate <= currDate)
    {
      arr.splice(index, 0, elem);
      return;
    }
  }
}
