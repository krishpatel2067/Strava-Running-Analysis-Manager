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
  "shouldFetchNewData": shouldFetchNewData
};
let sUtil = {
  "getDateFromStr": getDateFromStr,
  "todayDateNoTime": todayDateNoTime
};