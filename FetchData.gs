// code pasted from: https://www.benlcollins.com/spreadsheets/strava-api-with-google-sheets/
// TODO: set up button interactions (to not have to run this from the script side)
/*
[x] sync
[ ] graphs
[ ] search an activity
*/

var FETCH_DATE_PROP = "LastFetchedOn";       // date last fetched from Strava in mm/dd/yyyy where mm starts at 0
var MS_IN_A_DAY = 1000 * 3600 * 24;

function cleanupProp()
{
  var prop = PropertiesService.getScriptProperties().getProperty(FETCH_DATE_PROP);
  Logger.log(prop);
  PropertiesService.getScriptProperties().setProperty(FETCH_DATE_PROP, "");
  Logger.log(PropertiesService.getScriptProperties().getProperty(FETCH_DATE_PROP));
}
 
// Get athlete activity data
function getStravaActivityData(shouldFetch) {
  onOpen();
    
  // call the Strava API to retrieve data
  var data = [];
  var tempData = null;
  var page = 1;
  
  if (!shouldFetch)
  {
    data = sCache.getCachedData();

    // no data
    if (data.length == 0)
    {
      Logger.log("No cache found even after rate limit exceeded. Wait until tomorrow.")
      return;
    }    
  }
  else
  {
    Logger.log("Fetching fresh new data.");

    while (tempData == null || tempData.length > 0)
    {
      Logger.log("data");
      Logger.log(JSON.stringify(data));
      
      if (tempData != null)
      {
        data = data.concat(tempData);
      }
      
      tempData = callStravaAPI('?after=1546300800&per_page=200&page=' + page);
      Logger.log("tempData");
      Logger.log(JSON.stringify(tempData));
      page++;
    }

  }

  // TODO: test
   
  // empty array to hold activity data
  var stravaData = [];
     
  // loop over activity data and add to stravaData array for Sheet
  data.forEach(function(activity, index) {
    var arr = [];
    arr.push(
      activity.id,
      activity.name,
      activity.type,
      activity.distance
    );
    stravaData.push(arr);

    // if got fresh new data, cache it
    if (!cacheRetrieved)
    {
      sCache.setCache(index, activity);
    }
  });  

  if (shouldFetch)
  {
    PropertiesService.getScriptProperties().setProperty(FETCH_DATE_PROP, sUtil.todayDateNoTime());
    Logger.log("New fetched date: ");
    Logger.log(PropertiesService.getScriptProperties().getProperty(FETCH_DATE_PROP));
  }

  Logger.log("There are a total of " + stravaData.length + " activities.");
  return data;
}
 
// call the Strava API
function callStravaAPI(params) {
   
  // set up the service
  var service = sOath.getStravaService();
   
  if (service.hasAccess()) {
    Logger.log('App has access.');
     
    // TODO: create loop to get all acitivties
    var endpoint = 'https://www.strava.com/api/v3/athlete/activities';
 
    var headers = {
      Authorization: 'Bearer ' + service.getAccessToken()
    };
     
    var options = {
      headers: headers,
      method : 'GET',
      muteHttpExceptions: true
    };
     
    var response = JSON.parse(UrlFetchApp.fetch(endpoint + params, options));
    return response;  
  }
  else {
    Logger.log("App has no access yet.");
     
    // open this url to gain authorization from github
    var authorizationUrl = service.getAuthorizationUrl();
     
    Logger.log("Open the following URL and re-run the script: %s",
        authorizationUrl);
  }
}