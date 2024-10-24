// script functions (to organize them)
let sFetchData = {
  "getRawStravaActivityData": getRawStravaActivityData
}
let sProcessData = {
  "getProcessedData": getProcessedData
}
let sOauth = {
  "getStravaService": getStravaService
}
let sCache = {
  "getCachedData": getCachedData,
  "setCache": setCache,
  "shouldFetchNewData": shouldFetchNewData,
  "hasProcessedCache": hasProcessedCache,  
  "getCachedProcessedData": getCachedProcessedData,
  "setCacheProcesseData": setCacheProcesseData,
};
let sUtil = {
  "getDateFromStr": getDateFromStr,
  "todayDateNoTime": todayDateNoTime,
  "metersToMiles": metersToMiles,
  "getPace": getPace,
};
let sAnalysis = {
  "summary": summary,
}