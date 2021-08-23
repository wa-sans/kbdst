exports.version=1;

var tempCanvas=document.createElement('canvas');
var tempCtx=tempCanvas.getContext('2d');

function Sprite(image)
{
  this.image=image;
  this.width=image.width;
  this.height=image.height;
  this.draw=function(ctx,x,y,xsize,ysize,direction,alpha,blend)
  {
    if(/[0-9a-f]{6}/i.test(blend))
    {
      let w=tempCanvas.width=this.width;
      let h=tempCanvas.height=this.height;
      tempCtx.clearRect(0,0,w,h);
      tempCtx.drawImage(this.image,0,0);
      tempCtx.globalCompositeOperation='multiply';
      tempCtx.fillStyle='#'+blend.toString();
      tempCtx.fillRect(0,0,w,h);
      tempCtx.globalCompositeOperation='destination-in';
      tempCtx.drawImage(this.image,0,0);
      tempCtx.globalCompositeOperation='source-over';
      
      ctx.scale(xsize,ysize);
      ctx.globalAlpha=alpha;
      ctx.drawImage(tempCanvas,x/xsize,y/ysize);
      ctx.globalAlpha=1;
      ctx.setTransform(1,0,0,1,0,0);
    }
    else
    {
      ctx.scale(xsize,ysize);
      ctx.globalAlpha=alpha;
      ctx.drawImage(this.image,x/xsize,y/ysize);
      ctx.globalAlpha=1;
      ctx.setTransform(1,0,0,1,0,0);
    }
  };
  return this;
}
exports.Sprite=Sprite;