exports.version=2;

function FileLoad(url)
{
  var x=new XMLHttpRequest();
  x.open('GET',url+'?t='+String(Date.now()),false);
  x.send();
  return x.response;
}
exports.FileLoad=FileLoad;