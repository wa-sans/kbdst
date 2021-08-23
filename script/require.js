var require=(function()
{
  var __scope=new Map();
  return function(url,reload=false)
  {
    var name=url;
    if(url.split('/').length==1)
    {
      url='./modules/'+url+'.js'+(reload?'?t='+String(Date.now()):'');
    }
    var x;
    if(reload||!__scope.has(name))
    {
      x=new XMLHttpRequest();
      x.open('GET',url,false);
      x.send();
      if(x.status!=200)
      {
        throw 'require error : '+url+' not found';
      }
      return(function(__name,__code)
      {
        var exports={};
        eval(__code);
        __scope.set(__name,exports);
        return exports;
      })(name,x.response);
    }
    return __scope.get(name);
  };
})();