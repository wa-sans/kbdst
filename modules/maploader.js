exports.version=2;

var {FileLoad}=require('fileload');

function MapLoader(url)
{/*
  return new Promise(function(resolve)
  {*/
    var rawData=FileLoad(url).split(/\r\n|\r|\n/);
    var rawHeader;
    var header=
    {
      bpm:120,
      offset:0,
      link:'',
      song:'',
      songoffset:0,
      composer:'',
      endtime:'+3'
    };
    var data;
    for(var i=0;i<rawData.length;i++)
    {
      if(rawData[i].length==0)
      {
        rawHeader=rawData.slice(0,i);
        data=rawData.slice(i+1);
        break;
      }
    }
    
    for(var i=0;i<rawHeader.length;i++)
    {
      let str=rawHeader[i];
      header[str.split(':')[0]]=str.split(':').slice(1).join(':');
    }
    var timeList=[];
    var lastBeat=0;
    var noteList=[];
    var effectList=[];
    var startDelay=Number(header.offset)/1000;
    var currentBpm=header.bpm;
    var showDelay=1;
    data.filter(x=>x.length>0).forEach(function(x)
    {
      if(isNaN(x.split(' ')[0]))
      {
        return;
      }
      var timer=startDelay+60*(Number(x.split(' ')[0])-lastBeat)/currentBpm;
      for(var i=0;i<timeList.length;i++)
      {
        timer+=timeList[i];
      }
      function C(note)
      {
        note.split('').forEach(c=>
          noteList.push(
          {
            type:'clickNote',
            keyChar:c,
            time:timer-showDelay,
            showDelay:showDelay
          })
        );
      }
      function H(note,time)
      {
        note.split('').forEach(c=>
          noteList.push(
          {
            type:'holdNote',
            keyChar:c,
            holdTime:60*time/currentBpm,
            time:timer-showDelay,
            showDelay:showDelay
          })
        );
      }
      function TEXT(string,time)
      {
        effectList.push(
        {
          type:'textEffect',
          text:string,
          showTime:60*time/currentBpm,
          time:timer
        });
      }
      function BPM(bpm)
      {
        currentBpm=bpm;
        timeList.push(timer);
        lastBeat=timer;
      }
      eval(x.split(' ').slice(1).join(' '));
    });
    var localPath=url.split('/');
    localPath=localPath.slice(0,localPath.length-1).join('/');
    if(header.offset)
    {
      header.offset=Number(header.offset);
    }
    if(header.endtime[0]=='+')
    {
      header.endtime=
      {
        type:'end',
        time:Number(header.endtime)||3
      };
    }
    else
    {
      header.endtime=
      {
        type:'start',
        time:Number(header.endtime)||0
      };
    }
    return(
    {
      header:header,
      sound:header.link.length>0?new Audio(localPath+'/'+header.link):undefined,
      noteList:noteList,
      effectList:effectList
    });
  //});
}
exports.MapLoader=MapLoader;
function MapHeaderLoader(url)
{
  var rawData=FileLoad(url).split(/\r\n|\r|\n/);
  var rawHeader;
  var header=
  {
    bpm:120,
    offset:0,
    link:'',
    song:'',
    songoffset:0,
    composer:'',
    endtime:'+3',
    ts:0
  };
  var data;
  for(var i=0;i<rawData.length;i++)
  {
    if(rawData[i].length==0)
    {
      rawHeader=rawData.slice(0,i);
      data=rawData.slice(i+1);
      break;
    }
  }
  
  for(var i=0;i<rawHeader.length;i++)
  {
    let str=rawHeader[i];
    header[str.split(':')[0]]=str.split(':').slice(1).join(':');
  }
  return header;
}
exports.MapHeaderLoader=MapHeaderLoader;