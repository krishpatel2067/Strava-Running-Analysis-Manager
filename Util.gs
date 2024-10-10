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