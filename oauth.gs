/*
Script from:
  benlcollins:  
    Website: https://www.benlcollins.com/spreadsheets/strava-api-with-google-sheets/.
    Repository: https://github.com/benlcollins/strava-sheets-integration
*/

var CLIENT_ID = '128095';
var CLIENT_SECRET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Secret").getRange("A1:A1").getCell(1, 1).getValue();
 
// configure the service
function getStravaService() {
  return OAuth2.createService('Strava')
    .setAuthorizationBaseUrl('https://www.strava.com/oauth/authorize')
    .setTokenUrl('https://www.strava.com/oauth/token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope('activity:read_all');
}
 
// handle the callback
function authCallback(request) {
  var stravaService = getStravaService();
  var isAuthorized = stravaService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}