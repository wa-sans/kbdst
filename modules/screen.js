exports.version=2;

function Screen(name,canvas)
{
  var self=this;
  
  this.name=name;
  this.objectList=[];
  var instanceList=[];
  
  this.canvas=canvas;
  var ctx=canvas.getContext('2d');
  
  function createInstance(inst,x,y)
  {
    inst=new inst();
    inst.x=x;
    inst.y=y;
    inst.screen=self;
    inst.ctx=ctx;
    instanceList.push(inst);
    inst.runCreate();
    return inst;
  }
  this.createInstance=createInstance;
  function show()
  {
    instanceList=[];
    for(var i=0;i<this.objectList.length;i++)
    {
      let o=this.objectList[i];
      createInstance(o.object,o.x,o.y);
    }
  };
  this.show=show;
  function hide()
  {
    
  };
  this.hide=hide;
  function step(delta)
  {
    var tempList=[];
    for(var i=0;i<instanceList.length;i++)
    {
      tempList[i]=instanceList[i];
    }
    for(var i=0;i<tempList.length;i++)
    {
      tempList[i].runStep(delta);
      if(tempList[i].isDestroyed)
      {
        instanceList.splice(instanceList.indexOf(tempList[i]),1);
      }
    }
  };
  this.step=step;
  function draw()
  {
    var tempList=[];
    for(var i=0;i<instanceList.length;i++)
    {
      tempList[i]=instanceList[i];
    }
    ctx.fillStyle='#000000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<tempList.length;i++)
    {
      tempList[i].runDraw(ctx);
    }
  };
  this.draw=draw;
  
  return this;
}
exports.Screen=Screen;