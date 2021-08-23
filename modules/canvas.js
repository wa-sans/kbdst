exports.version=1;

var {GlobalVar}=require('globalvar');

function Canvas()
{
  var canvas=document.createElement('canvas');
  this.canvas=canvas;
  var canvasMulti=1.2;
  canvas.width=1920/canvasMulti;
  canvas.height=1080/canvasMulti;
  canvas.style.position='absolute';
  function resize()
  {
    if(canvas.width/window.innerWidth>canvas.height/window.innerHeight)
    {
      var top=(window.innerHeight-canvas.height/(canvas.width/window.innerWidth))/2;
      canvas.style.left='';
      canvas.style.top=String(top)+'px';
      canvas.style.width=String(window.innerWidth)+'px';
      canvas.style.height='';
      GlobalVar.set('canvasData',
      {
        x:0,
        y:top,
        w:window.innerWidth,
        h:canvas.height/(canvas.width/window.innerWidth),
        r:canvas.width/window.innerWidth
      });
    }
    else
    {
      var left=(window.innerWidth-canvas.width/(canvas.height/window.innerHeight))/2;
      canvas.style.left=String(left)+'px';
      canvas.style.top='';
      canvas.style.width='';
      canvas.style.height=String(window.innerHeight)+'px';
      GlobalVar.set('canvasData',
      {
        x:left,
        y:0,
        w:window.innerWidth/(canvas.height/window.innerHeight),
        h:window.innerHeight,
        r:canvas.height/window.innerHeight
      });
    }
  }
  resize();
  window.addEventListener('resize',resize);
  document.body.appendChild(canvas);
  return this;
}
exports.Canvas=Canvas;