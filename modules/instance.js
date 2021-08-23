exports.version=2;

var {GlobalVar}=require('globalvar');
var {Keyboard}=require('keyboard');
var {Mouse}=require('mouse');
var {AudioOut}=require('audioout');
var {Storage}=require('storage');

function Instance()
{
  var self=this;
  
  this.name=null;
  
  this.x=0;
  this.y=0;
  this.baseX=0;
  this.baseY=0;
  this.base=null;
  this.sprite=null;
  this.xsize=1;
  this.ysize=1;
  this.imageDirection=0;
  this.imageAlpha=1;
  this.imageBlend='';
  
  this.screen=null;
  this.ctx=null;
  
  this.isDestroyed=false;
  
  this.onKeyDown=function(keyCode)
  {
    return Keyboard.onKeyDown(keyCode);
  };
  this.onKeyUp=function(keyCode)
  {
    return Keyboard.onKeyUp(keyCode);
  };
  this.onKeyPress=function(keyCode)
  {
    return Keyboard.onKeyPress(keyCode);
  };
  
  this.getMouse=function()
  {
    return Mouse;
  };
  this.onMouseDown=function(code)
  {
    return Mouse.onMouseDown()==code;
  };
  this.onMouseUp=function(code)
  {
    return Mouse.onMouseUp()==code;
  };
  this.onMousePress=function(code)
  {
    return Mouse.onMousePress()==code;
  };
  this.getWheel=function()
  {
    return Mouse.getWheel();
  };
  
  this.createInstance=function(inst,x,y)
  {
    inst=this.screen.createInstance(GlobalVar.get('objectMap').get(inst),x,y);
    return inst;
  };
  this.destroy=function(inst)
  {
    if(inst===undefined)
    {
      this.isDestroyed=true;
    }
    else
    {
      inst.isDestroyed=true;
    }
  };
  
  this.getAudioOut=function()
  {
    return AudioOut;
  };
  
  this.getStorage=function()
  {
    return Storage;
  };
  
  this.getCtx=function()
  {/*
    var upCaller=this.getCtx;
    while(upCaller.name!='runDraw')
    {
      upCaller=upCaller.caller;
      if(upCaller===null)
      {
        return null;
      }
    }
    return upCaller.arguments[0];*/
    return this.ctx;
  };
  this.drawSelf=function()
  {
    if(this.sprite!=null)
    {
      var drawSprite=GlobalVar.get('spriteMap').get(this.sprite);
      var drawX;
      var drawY;
      switch(this.base)
      {
        case 'center':
          drawX=drawSprite.width/2;
          drawY=drawSprite.height/2;
        break;
        case '%':
          drawX=drawSprite.width*this.baseX;
          drawY=drawSprite.height*this.baseY;
        break;
        default:
          drawX=this.baseX;
          drawY=this.baseY;
        break;
      }
      drawSprite.draw(this.ctx,this.x-drawX,this.y-drawY,this.xsize,this.ysize,this.imageDirection,this.imageAlpha,this.imageBlend);
    }
  };
  this.drawSpriteSize=function(sprite,x,y,xsize,ysize)
  {
    var drawSprite=GlobalVar.get('spriteMap').get(sprite);
    drawSprite.draw(this.ctx,x,y,xsize,ysize,this.imageDirection,this.imageAlpha,this.imageBlend);
  };
  this.drawText=function(text,x,y,size=12,color='000000',xpos='left',ypos='top',bold=false)
  {
    var ctx=this.ctx;
    ctx.font=(bold?'bold ':'')+String(size)+'px exo-thin,SCDream2';
    ctx.textAlign=xpos;
    ctx.textBaseline=ypos;
    ctx.fillStyle='#'+color;
    ctx.fillText(text,x,y);
  };
  this.setAlpha=function(a)
  {
    var ctx=this.ctx;
    ctx.globalAlpha=a;
  };
  this.beginPath=function()
  {
    var ctx=this.ctx;
    ctx.beginPath();
  };
  this.moveTo=function(x,y)
  {
    var ctx=this.ctx;
    ctx.moveTo(x,y);
  };
  this.lineTo=function(x,y)
  {
    var ctx=this.ctx;
    ctx.lineTo(x,y);
  };
  this.arc=function(x,y,r,s,e,c=true)
  {
    var ctx=this.ctx;
    ctx.arc(x,y,r,s,e,c);
  };
  this.fill=function(color)
  {
    var ctx=this.ctx;
    ctx.fillStyle='#'+color;
    ctx.fill();
  };
  this.stroke=function(color,width=1)
  {
    var ctx=this.ctx;
    ctx.strokeStyle='#'+color;
    ctx.lineWidth=width;
    ctx.stroke();
  };
  this.fillRect=function(x,y,w,h,color)
  {
    var ctx=this.ctx;
    ctx.fillStyle='#'+color;
    ctx.fillRect(x,y,w,h);
  };
  this.clearRect=function(x,y,w,h)
  {
    var ctx=this.ctx;
    ctx.clearRect(x,y,w,h);
  };
  
  this.showScreen=function(name)
  {
    this.screen.showScreen(name);
    Global.get('roomStack').push(this.screen.name);
  };
  
  function runCreate()
  {
    this.createScope=new Function('with(this){'+this.create.toString().match(/\{(.*)\}/s)[1]+'\nthis.step=('+this.step.toString().replace(/\(\)/,'(delta)')+');this.draw=('+this.draw.toString()+'\n);}');
    this.createScope();
  };
  this.runCreate=runCreate;
  function runStep(delta)
  {
    this.step(delta);
  };
  this.runStep=runStep;
  function runDraw(ctx)
  {
    this.draw();
  };
  this.runDraw=runDraw;
  
  this.create=function()
  {
    
  };
  this.step=function()
  {
    
  };
  this.draw=function()
  {
    drawSelf();
  };
  
  return this;
}
exports.Instance=Instance;