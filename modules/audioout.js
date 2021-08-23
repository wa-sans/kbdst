exports.version=1;

function AudioOut()
{
  this.audioCtx=new AudioContext();
  
  this.buffer=null;
  
  this.sin=function(x,l,v)
  {
    if(this.buffer===null)
    {
      var soundBuffer=new Float32Array(this.audioCtx.sampleRate*l);
    }
    else
    {
      var soundBuffer=new Float32Array(this.audioCtx.sampleRate*l);
      for(var i=0;i<this.buffer.length;i++)
      {
        soundBuffer[i]=this.buffer[i];
      }
    }
    for(var i=0;i<this.audioCtx.sampleRate*l;i++)
    {
      soundBuffer[i]+=Math.sin(i*Math.PI/this.audioCtx.sampleRate*2*x)/2*v;
    }
    this.buffer=soundBuffer;
    return this;
  };
  
  this.fadeOut=function(length)
  {
    for(var i=this.buffer.length-this.audioCtx.sampleRate*length;i<this.buffer.length;i++)
    {
      this.buffer[i]*=(this.buffer.length-i)/(this.audioCtx.sampleRate*length);
    }
    return this;
  };
  
  this.play=function()
  {
    var audioBuffer=this.audioCtx.createBuffer(1,this.buffer.length,this.audioCtx.sampleRate);
    for(var channel=0;channel<audioBuffer.numberOfChannels;channel++)
    {
      var nowBuffering=audioBuffer.getChannelData(channel);
      for(var i=0;i<this.buffer.length;i++)
      {
        nowBuffering[i]=this.buffer[i];
      }
    }
    var source=this.audioCtx.createBufferSource();
    source.buffer=audioBuffer;
    source.connect(this.audioCtx.destination);
    source.start();
    return this;
  };
  return this;
}
exports.AudioOut=AudioOut;