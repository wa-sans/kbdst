exports.drawSelf=function()
{
  if(self.sprite!=null)
  {
    self.sprite.draw(self.x,self.y,self.xsize,self.ysize,self.imageDirection,self.alpha);
  }
}