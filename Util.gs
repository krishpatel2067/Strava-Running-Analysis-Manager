function getDateFromStr(str)
{
  var split = str.split("/");
  var d = new Date(parseInt(split[2]), parseInt(split[0]), parseInt(split[1]));
  return d;
}

function todayDateNoTime()
{
  var d = new Date();
  // return new Date(d.getYear(), d.getMonth(), d.getDate());
  return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
}

function metersToMiles(meters)
{
  return meters / 1609;
}

// time in s, distance in mi --> "mm:ss"
function getPace(time, distance)
{
  let pace = Math.round(time/distance);
  return (pace/60) + ":" + (pace%60);
}