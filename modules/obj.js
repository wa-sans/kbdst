exports.version=1;

var {Instance}=require('instance');

function deepClone(obj)
{
  if(obj===null||typeof obj!=='object')
  {
    return obj;
  }
  const result=Array.isArray(obj)?[]:{};
  for(let key of Object.keys(obj))
  {
    result[key]=deepClone(obj[key]);
  }
  return result;
}

function Obj(json)
{
  return(function()
  {
    var inst=new Instance();
    var cloneJson=deepClone(json);
    for(var key in cloneJson)
    {
      inst[key]=cloneJson[key];
    }
    return inst;
  });
}
exports.Obj=Obj;