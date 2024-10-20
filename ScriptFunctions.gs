// script functions (to organize them)
let sFetchData = {
  "getRawStravaActivityData": getRawStravaActivityData
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