exports.version=1;

var Keyboard=new(function()
{
  var isInit=false;
  
  var key=[];
  var pressKey=[];
  var upKey=[];
  
  function keydown(e)
  {
    if(key[e.keyCode]!=1)
    {
      pressKey[e.keyCode]=1;
    }
    key[e.keyCode]=1;
  }
  function keyup(e)
  {
    key[e.keyCode]=0;
    upKey[e.keyCode]=1;
  }
  
  this.init=function()
  {
    if(!isInit)
    {
      window.addEventListener('keydown',keydown);
      window.addEventListener('keyup',keyup);
      window.onkeydown=function(e)
      {
        if(['F5','F11','F12'].indexOf(e.key)!=-1)
          return true;
        return false
      };
      window.onkeyup=function(){return false};
      isInit=true;
    }
  };
  this.clear=function()
  {
    pressKey=[];
    upKey=[]
  };
  this.start=function()
  {
    
  };
  this.stop=function()
  {
    
  };
  
  this.onKeyDown=function(code)
  {
    return key[code]==1;
  };
  this.onKeyUp=function(code)
  {
    return upKey[code]==1;
  };
  this.onKeyPress=function(code)
  {
    return pressKey[code]==1;
  };
  return this;
})();
exports.Keyboard=Keyboard;