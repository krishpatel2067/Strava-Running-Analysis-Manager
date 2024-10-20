// custom menu

function onOpen() {
  let ui = SpreadsheetApp.getUi();
 
  ui.createMenu('Strava App')
    .addItem('Sync Latest', 'syncButtonHandler')
    .addItem('Update Summary', "summary")
    .addToUi();
}

// TODO: button sync functionality that is mobile friendly