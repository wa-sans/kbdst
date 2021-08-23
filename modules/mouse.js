exports.version=1;

var {GlobalVar}=require('globalvar');

var Mouse=new(function()
{
  var self=this;
  
  var isInit=false;
  
  this.x=0;
  this.y=0;
  var y=0;
  var mouse=-1;
  var pressMouse=-1;
  var upMouse=-1;
  var wheel=0;
  
  function mousemove(e)
  {
    var canvasData=GlobalVar.get('canvasData');
    self.x=(e.clientX-canvasData.x)*canvasData.r;
    self.y=(e.clientY-canvasData.y)*canvasData.r;
  }
  function mousedown(e)
  {
    mousemove(e);
    mouse=e.button;
    pressMouse=e.button;
  }
  function mouseup(e)
  {
    mousemove(e);
    mouse=-1;
    pressMouse=-1;
    upMouse=e.button;
  }
  function mousewheel(e)
  {
    wheel=e.deltaY;
  }
  
  this.init=function()
  {
    if(!isInit)
    {
      window.addEventListener('mousemove',mousemove);
      window.addEventListener('mousedown',mousedown);
      window.addEventListener('mouseup',mouseup);
      window.addEventListener('wheel',mousewheel);
      window.onmousemove=function(){return false};
      window.onmousedown=function(){return false};
      window.onmouseup=function(){return false};
      window.oncontextmenu=function(){return false};
      isInit=true;
    }
  };
  this.clear=function()
  {
    pressMouse=-1;
    upMouse=-1;
    wheel=0;
  };
  this.start=function()
  {
    
  };
  this.stop=function()
  {
    
  };
  
  this.onMouseDown=function()
  {
    return mouse;
  };
  this.onMouseUp=function()
  {
    return upMouse;
  };
  this.onMousePress=function()
  {
    return pressMouse;
  };
  this.getWheel=function()
  {
    return wheel;
  };
  return this;
})();
exports.Mouse=Mouse;