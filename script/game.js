createObject('playNoti',
{
  step:function()
  {
    x=getMouse().x;
    y=getMouse().y;
    if(onKeyPress(13)||onMouseDown(0))
    {
      showScreen('game');
    }
  },
  draw:function()
  {
    drawText('시작하려면 앤터를 누루새요;;',x,y,30,'ffffff','center','middle',true);
  }
});

createObject('versionShow',
{
  version:'1.4.0',
  padding:5,
  draw:function()
  {
    drawText('ver '+version,1600-padding,900-padding,20,'ffffff','right','bottom',false);
  }
})

createObject('menuController',
{
  MapHeaderLoader:MapHeaderLoader,
  create:function()
  {
    var mapList=[];
    var xhr=new XMLHttpRequest();
    xhr.open('GET','./api/getmaps.json',false);
    xhr.send();
    mapList=JSON.parse(xhr.response);
    mapList=mapList.map(x=>({name:x,header:MapHeaderLoader('./map/'+x+'/'+x+'.kbdst')}));
    if(location.host!='rhythm2.matj.io')
    {
      mapList=mapList.filter(x=>x.header.ts==0);
    }
    var arcSize=8;
    var w=this.screen.canvas.width;
    var h=100;
    var menuY=0;
    var menuHeader=150;
    var menuBorder=10;
    
    var diffArcSize=4;
    function drawMenu(x,y,w,h,a)
    {
      beginPath();
      moveTo(x+a,y);
      lineTo(x+w-a,y);
      arc(x+w-a,y+a,a,1.5*Math.PI,0,false);
      lineTo(x+w,y+h-a);
      arc(x+w-a,y+h-a,a,0,0.5*Math.PI,false);
      lineTo(x+a,y+h);
      arc(x+a,y+h-a,a,0.5*Math.PI,Math.PI,false);
      lineTo(x,y+a);
      arc(x+a,y+a,a,Math.PI,1.5*Math.PI,false);
      stroke('ffffff');
    }
  },
  step:function()
  {
    menuY+=-getWheel()/126*h*1.5;
    if(mapList.length*h<this.screen.canvas.height||menuY>0)
    {
      menuY=0;
    }
  },
  draw:function()
  {
    for(var i=0;i<mapList.length;i++)
    {
      if(-h<menuY+menuBorder+i*h&&menuY+menuBorder+i*h<this.screen.canvas.height)
      {
        if(onMouseUp(0))
        {
          if(menuY+menuHeader+menuBorder+i*h<=getMouse().y&&getMouse().y<=menuY+menuHeader+menuBorder+i*h+h-menuBorder*2)
          {
            Global.set('playMap',
            {
              name:mapList[i].name,
              //difficulty:
            });
            showScreen('game');
          }
        }
        drawMenu(x+menuBorder,menuY+menuHeader+menuBorder+i*h,w-menuBorder*2,h-menuBorder*2,arcSize);
        drawMenu(x+menuBorder,menuY+menuHeader+menuBorder+i*h,w-menuBorder*2,h-menuBorder*2,diffArcSize);
        drawText(mapList[i].header.song,x+menuBorder+10,menuY+menuHeader+menuBorder+i*h+10,40,'ffffff','left','top',true);
        drawText(mapList[i].header.artist,x+menuBorder+10,menuY+menuHeader+menuBorder+i*h+50,22,'ffffff','left','top',true);
      }
    }
    fillRect(0,0,this.screen.canvas.width,menuHeader,'000000');
    /*
    drawText('화면 비율 : 16:9',this.screen.canvas.width/2,20,40,'ffffff','center','top',true);
    drawText('하얀색 노트 : 일반, 초록색 노트 : 홀드',this.screen.canvas.width/2,80,40,'ffffff','center','top',true);*/
  }
});

createObject('correctionButton',
{
  create:function()
  {
    var arcSize=8;
    var w=64;
    var h=64;
    function drawMenu(x,y,w,h,a)
    {
      beginPath();
      moveTo(x+a,y);
      lineTo(x+w-a,y);
      arc(x+w-a,y+a,a,1.5*Math.PI,0,false);
      lineTo(x+w,y+h-a);
      arc(x+w-a,y+h-a,a,0,0.5*Math.PI,false);
      lineTo(x+a,y+h);
      arc(x+a,y+h-a,a,0.5*Math.PI,Math.PI,false);
      lineTo(x,y+a);
      arc(x+a,y+a,a,Math.PI,1.5*Math.PI,false);
      stroke('ffffff');
    }
  },
  step:function()
  {
    var mx=getMouse().x;
    var my=getMouse().y;
    if(onMouseUp(0)&&x<=mx&&mx<=x+w&&y<=my&&my<=y+h)
    {
      showScreen('correction');
    }
  },
  draw:function()
  {
    drawMenu(x,y,w,h,arcSize);
    drawText('보정',x+w/2,y+h/2,32,'ffffff','center','middle',false);
  }
});

createObject('correctionEdit',
{
  create:function()
  {
    var arcSize=4;
    var w=48;
    var h=48;
    var w2=32;
    var h2=32;
    function drawMenu(x,y,w,h,a)
    {
      beginPath();
      moveTo(x+a,y);
      lineTo(x+w-a,y);
      arc(x+w-a,y+a,a,1.5*Math.PI,0,false);
      lineTo(x+w,y+h-a);
      arc(x+w-a,y+h-a,a,0,0.5*Math.PI,false);
      lineTo(x+a,y+h);
      arc(x+a,y+h-a,a,0.5*Math.PI,Math.PI,false);
      lineTo(x,y+a);
      arc(x+a,y+a,a,Math.PI,1.5*Math.PI,false);
      stroke('ffffff');
    }
  },
  step:function()
  {
    
  },
  draw:function()
  {
    drawMenu(1600/2-140-w2/2,80-h2/2,w2,h2,arcSize);
    drawMenu(1600/2-88-w/2,80-h/2,w,h,arcSize);
    drawMenu(1600/2+88-w/2,80-h/2,w,h,arcSize);
    drawMenu(1600/2+140-w2/2,80-h2/2,w2,h2,arcSize);
  }
});

createObject('correctionController',
{
  create:function()
  {
    var DEBUG=false;
    
    var audio0=new(getAudioOut())().sin(440,0.05,0.2).fadeOut(0.1);
    var audio1=new(getAudioOut())().sin(440,0.2,0.5).fadeOut(0.1);
    var audio2=new(getAudioOut())().sin(440,0.2,0.5).sin(880,0.2,0.5).fadeOut(0.1);
    var bpm=90;
    var time=0;
    var count=0;
    var bit8=false;
    
    var offset=0;
    
    var isEnd=false;
    
    function isKeyPress()
    {
      for(var i=65;i<91;i++)
      {
        if(onKeyPress(i))
        {
          return true;
        }
      }
      return false;
    }
    
    var pressPoint=[];
    
    var wc=this.screen.canvas.width/2;
    var hc=this.screen.canvas.height/2;
  },
  step:function()
  {
    if(isKeyPress())
    {
      if(!isEnd)
      {
        pressPoint.push(time/(60/bpm)+count);
      }
      else
      {
        Global.set('offset',Math.round(offset)/1000);
        getStorage().set('offset',Math.round(offset)/1000);
        showScreen(Global.get('roomStack').pop());
      }
      var sortPoint=pressPoint.sort();
      var mapPoint=[];
      var pointP=0;
      for(var i=1;i<sortPoint.length-1;i++)
      {
        var n=sortPoint[i];
        var l=(sortPoint[i+1]-n)+(n-sortPoint[i-1]);
        mapPoint.push([n,l]);
        pointP+=l;
      }
      pointP/=mapPoint.length;
      var pMap=[];
      var pN=0;
      var pL=0;
      for(var i=0;i<mapPoint.length;i++)
      {
        var n=mapPoint[i][0];
        var l=mapPoint[i][1];
        if(l<=pointP)
        {
          pN+=n;
          pL++;
        }
        if((l>pointP||mapPoint.length-1==i)&&pL>0)
        {
          pMap.push(pN/pL);
          pN=0;
          pL=0;
        }
      }
      var pOffset=0;
      for(var i=0;i<pMap.length;i++)
      {
        pOffset+=pMap[i]-Math.round(pMap[i]);
      }
      pOffset/=pMap.length;
      offset=pOffset*(60/bpm)*1000;
    }
    
    if(pressPoint.length<32)
    {
      time+=delta;
      if(!bit8&&time>60/bpm/2)
      {
        audio0.play();
        bit8=true;
      }
      if(time>60/bpm)
      {
        bit8=false;
        time-=60/bpm;
        count++;
        if(count<=3)
        {
          audio1.play();
        }
        else
        {
          audio2.play();
          count=0;
        }
      }
    }
    else if(!isEnd)
    {
      isEnd=true;
      time=0;
      count=0;
    }
  },
  draw:function()
  {
    if(!isEnd)
    {
      drawText('소리에 맞춰 아무 키나 눌러주세요',this.screen.canvas.width/2,this.screen.canvas.height/2,32,'ffffff','center','middle',false);
    }
    else
    {
      drawText('완료!',this.screen.canvas.width/2,this.screen.canvas.height/2,32,'ffffff','center','middle',false);
    }
    if(pressPoint.length>=12)
    {
      drawText(String(Math.round(offset))+'ms',this.screen.canvas.width/2,this.screen.canvas.height/2+60,32,'ffffff','center','middle',false);
    }
    else
    {
      drawText(String(pressPoint.length)+'/12...',this.screen.canvas.width/2,this.screen.canvas.height/2+60,32,'ffffff','center','middle',false);
    }
    
    beginPath();
    moveTo(wc-320,hc+100);
    lineTo(wc+320,hc+100);
    moveTo(wc-320,hc+160);
    lineTo(wc+320,hc+160);
    stroke('ffffff',2);
    
    beginPath();
    moveTo(wc-300,hc+130);
    lineTo(wc+300,hc+130);
    stroke('ffffff');
    
    for(var i=0;i<4;i++)
    {
      beginPath();
      moveTo(wc-300+(i+1)*(600/4),hc+120);
      lineTo(wc-300+(i+1)*(600/4),hc+140);
      if(i==3)
      {
        stroke('ffffff',2);
      }
      else
      {
        stroke('ffffff');
      }
    }
    
    if(!isEnd)
    {
      beginPath();
      moveTo(wc-300+(time/(60/bpm)+count)*(600/4),hc+115);
      lineTo(wc-300+(time/(60/bpm)+count)*(600/4),hc+145);
      if(isKeyPress())
      {
        stroke('ff0000',2);
      }
      else
      {
        stroke('ffffff',2);
      }
    }
    
    for(var i=0;i<pressPoint.length;i++)
    {
      beginPath();
      moveTo(wc-300+(pressPoint[i])*(600/4),hc+125);
      lineTo(wc-300+(pressPoint[i])*(600/4),hc+135);
      stroke('ff7f7f');
    }
    
    if(DEBUG)
    {
      beginPath();
      for(var i=0;i<mapPoint.length;i++)
      {
        var n=mapPoint[i][0];
        var l=mapPoint[i][1];
        if(i==0)
        {
          moveTo(wc-300+n*(600/4),hc+180+l*100);
        }
        else
        {
          lineTo(wc-300+n*(600/4),hc+180+l*100);
        }
      }
      stroke('ffffff');
      
      beginPath();
      for(var i=0;i<pMap.length;i++)
      {
        moveTo(wc-300+(pMap[i])*(600/4),hc+180);
        lineTo(wc-300+(pMap[i])*(600/4),hc+180+100);
      }
      stroke('7f7fff');
      
      beginPath();
      moveTo(wc-300,hc+180+pointP*100);
      lineTo(wc+300,hc+180+pointP*100);
      stroke('00ff00');
    }
  }
});

createObject('keyboard',
{
  MapLoader:MapLoader,
  score:0,
  combo:0,
  comboScore:0,
  maxCombo:0,
  perfect:0,
  good:0,
  bad:0,
  miss:0,
  create:function()
  {
    var browser=navigator.userAgent.toLowerCase().match(/chrome|firefox|edg|\.net/)[0]||'IDK';
    function getBrowserKeyCode(str)
    {
      var m=
      {
        'idk':0,
        'firefox':1,
        'chrome':2,
        'edg':2,
        '.net':0
      };
      var map=
      {
        '-':[0,173,189],
        '=':[0,61,187],
        '[':[0,219,219],
        ']':[0,221,221],
        ';':[0,59,186],
        '\'':[0,222,222],
        ',':[0,188,188],
        '.':[0,190,190],
        '/':[0,191,191]
      };
      return map[str]?map[str][m[browser.toLowerCase()]]:undefined;
    }
    var keyMap=
    [
      [(this.screen.canvas.width-80*15)/2,this.screen.canvas.height-80*5-10,80,80,5,5],
      [['',1],'1234567890',['-',1],['=',1],['',2]],
      [['',1.5],'QWERTYUIOP',['[',1],[']',1],['',1.5]],
      [['',1.8],'ASDFGHJKL',[';',1],['\'',1],['',2.2]],
      [['',2.3],'ZXCVBNM',[',',1],['.',1],['/',1],['',2.7]],
      [['',1.2],['',1.2],['',1.2],['SPACE',6.6,32],['',1.2],['',1.2],['',1.2],['',1.2]]
    ];
    var keyObjectMap={};
    for(let i=1;i<keyMap.length;i++)
    {
      let keyX=0;
      for(let j=0;j<keyMap[i].length;j++)
      {
        if(typeof keyMap[i][j]=='string')
        {
          for(let k=0;k<keyMap[i][j].length;k++)
          {
            let keyObject=createInstance('key',keyMap[0][0]+keyX,keyMap[0][1]+keyMap[0][3]*(i-1));
            let c=keyMap[i][j][k];
            keyObject.w=keyMap[0][2];
            keyObject.h=keyMap[0][3];
            keyObject.keyboard=this;
            keyObject.keyChar=c;
            keyObjectMap[c]=keyObject;
            keyObject.keyCode=c.charCodeAt(0);
            keyObject.x+=keyMap[0][4]/2;
            keyObject.y+=keyMap[0][5]/2;
            keyObject.w-=keyMap[0][4];
            keyObject.h-=keyMap[0][5];
            keyX+=keyMap[0][2];
          }
        }
        else
        {
          let keyObject=createInstance('key',keyMap[0][0]+keyX,keyMap[0][1]+keyMap[0][3]*(i-1));
          keyObject.w=keyMap[0][2];
          keyObject.h=keyMap[0][3];
          keyObject.keyboard=this;
          keyObject.keyChar=keyMap[i][j][0];
          keyObjectMap[(keyMap[i][j][2]?String.fromCharCode(keyMap[i][j][2]):0)||keyMap[i][j][0]||-1]=keyObject;
          keyObject.keyCode=keyMap[i][j][2]||getBrowserKeyCode(keyMap[i][j][0])||0;
          keyObject.w*=keyMap[i][j][1];
          keyObject.x+=keyMap[0][4]/2;
          keyObject.y+=keyMap[0][5]/2;
          keyObject.w-=keyMap[0][4];
          keyObject.h-=keyMap[0][5];
          keyX+=keyMap[0][2]*(keyMap[i][j][1]||1);
        }
      }
    }
    
    function scoreCalc(score,comboScore,note)
    {
      var m=100*note;
      return((score*0.9+comboScore/((note*note+note)/2)*(m/10))/m*1000000)||0;
    }
    
    function gameEnd()
    {
      if(mapData.sound)
      {
        mapData.sound.pause();
      }
      Global.set('resultData',
      {
        mapData:mapData,
        score:Math.floor(scoreCalc(score,comboScore,mapData.noteList.length)),
        maxCombo:maxCombo,
        perfect:perfect,
        good:good,
        bad:bad,
        miss:miss,
      });
      showScreen('result');
    }
    
    var noteIndex=0;
    var effectIndex=0;
    var play=false;
    var playMap=Global.get('playMap');
    var mapName=playMap.name;
    var diff=playMap.difficulty;
    var mapData=MapLoader('./map/'+mapName+'/'+mapName+/*'-'+diff+*/'.kbdst');
    var songoffset=Number(mapData.header.songoffset);
    var playTime=null;
    var spawnNoteList=[];
    var isEndEvent=false;
    if(mapData.sound)
    {
      mapData.sound.addEventListener("canplaythrough",function()
      {
        setTimeout(function()
        {
          mapData.sound.volume=Number(mapData.header.volume)/100;
          mapData.sound.play();
          play=true;
          if(mapData.header.endtime.type=='start')
          {
            setTimeout(gameEnd,1000+mapData.header.offset+mapData.header.endtime.time*1000);
          }
        },1000);
      });
    }
    else
    {
      playTime=0;
      if(mapData.header.endtime.type=='start')
      {
        setTimeout(gameEnd,1000+mapData.header.offset+mapData.header.endtime.time*1000);
      }
    }
  },
  step:function()
  {
    if(play)
    {
      for(let i=noteIndex;i<mapData.noteList.length;i++)
      {
        let note=mapData.noteList[i];
        if(mapData.sound.played.length&&mapData.sound.currentTime-Global.get('offset')>=note.time)
        {
          let o=keyObjectMap[note.keyChar.toUpperCase()];
          var newNote=createInstance(note.type,o.x+o.w/2,o.y+o.h/2);
          newNote.dx=o.w/2;
          newNote.dy=o.h/2;
          newNote.arcSize=o.arcSize;
          newNote.showDelay=note.showDelay;
          if(note.type=='holdNote')
          {
            newNote.holdTime=note.holdTime;
          }
          o.noteList.push(newNote);
          spawnNoteList.push(newNote);
          noteIndex++;
        }
      }
      for(let i=effectIndex;i<mapData.effectList.length;i++)
      {
        let effect=mapData.effectList[i];
        if(mapData.sound.currentTime+songoffset>=effect.time)
        {
          var newEffect=createInstance(effect.type,0,0);
          for(var e in effect)
          {
            switch(e)
            {
              case 'type':
              case 'time':
              break;
              
              default:
                newEffect[e]=effect[e];
              break;
            }
          }
          effectIndex++;
        }
      }
    }
    else if(playTime!==null)
    {
      for(let i=noteIndex;i<mapData.noteList.length;i++)
      {
        let note=mapData.noteList[i];
        if(playTime-songoffset>=note.time)
        {
          let o=keyObjectMap[note.keyChar.toUpperCase()];
          var newNote=createInstance(note.type,o.x+o.w/2,o.y+o.h/2);
          newNote.dx=o.w/2;
          newNote.dy=o.h/2;
          newNote.arcSize=o.arcSize;
          newNote.showDelay=note.showDelay;
          if(note.type=='holdNote')
          {
            newNote.holdTime=note.holdTime;
          }
          o.noteList.push(newNote);
          spawnNoteList.push(newNote);
          noteIndex++;
        }
      }
      playTime+=delta;
    }
    if(!isEndEvent&&(play||playTime!==null))
    {
      spawnNoteList=spawnNoteList.filter(x=>!x.isDestroyed);
      if(noteIndex==mapData.noteList.length&&spawnNoteList.length==0)
      {
        isEndEvent=true;
        if(mapData.header.endtime.type=='end')
        {
          setTimeout(gameEnd,mapData.header.endtime.time*1000);
        }
      }
    }
  },
  draw:function()
  {
    drawText('Keyboardist',this.screen.canvas.width/2,50,80,'ffffff','center','top',true);
    
    drawText(String(Math.floor(scoreCalc(score,comboScore,mapData.noteList.length))).padStart(7,'0')+'score',keyMap[0][0],keyMap[0][1],40,'ffffff','left','bottom');
    drawText('combo'+String(combo).padStart(6,'0'),keyMap[0][0]+keyMap[0][2]*15,keyMap[0][1],40,'ffffff','right','bottom');
  }
});

createObject('key',
{
  w:0,
  h:0,
  arcSize:8,
  keyCode:0,
  keyChar:'',
  noteList:[],
  holdedNote:null,
  create:function()
  {
    var textDrawColorIndex=0;
    var lastNoteStatus=null;
    var self=this;
    function showJudgment(st)
    {
      textDrawColorIndex=['Perfect','Good','Bad','Miss'].indexOf(st)+1;
      var j=createInstance('noteStatus',self.screen.canvas.width/2,self.screen.canvas.height/2+20);
      j.status=st;
      lastNoteStatus=j;
    }
  },
  step:function()
  {
    if(holdedNote===null)
    {
      for(var i=0;i<noteList.length;i++)
      {
        let note=noteList[i];
        if(note.time<=0.5)
        {
          let t=Math.abs(note.time);
          switch(note.name)
          {
            case 'clickNote':
              if(onKeyPress(keyCode))
              {
                if(t<0.1)
                {
                  showJudgment('Perfect');
                  keyboard.combo++;
                  keyboard.maxCombo=Math.max(keyboard.maxCombo,keyboard.combo);
                  keyboard.perfect++;
                  keyboard.score+=100;
                  keyboard.comboScore+=keyboard.combo;
                }
                else if(t<0.2)
                {
                  showJudgment('Good');
                  keyboard.combo++;
                  keyboard.maxCombo=Math.max(keyboard.maxCombo,keyboard.combo);
                  keyboard.good++;
                  keyboard.score+=70;
                  keyboard.comboScore+=keyboard.combo;
                }
                else
                {
                  showJudgment('Bad');
                  keyboard.combo=0;
                  keyboard.bad++;
                  keyboard.score+=10;
                }
                note.destroy();
                noteList.splice(i,1);
                break;
              }
              if(-0.5>note.time)
              {
                showJudgment('Miss');
                keyboard.combo=0;
                keyboard.miss++;
                note.destroy();
                noteList.splice(i,1);
                break;
              }
            break;
            case 'bombNote':
              if(onKeyPress(keyCode))
              {
                if(t<0.1)
                {
                  showJudgment('Perfect');
                  keyboard.combo++;
                  keyboard.maxCombo=Math.max(keyboard.maxCombo,keyboard.combo);
                  keyboard.perfect++;
                  keyboard.score+=100;
                  keyboard.comboScore+=keyboard.combo;
                }
                else if(t<0.2)
                {
                  showJudgment('Good');
                  keyboard.combo++;
                  keyboard.maxCombo=Math.max(keyboard.maxCombo,keyboard.combo);
                  keyboard.good++;
                  keyboard.score+=70;
                  keyboard.comboScore+=keyboard.combo;
                }
                else
                {
                  showJudgment('Bad');
                  keyboard.combo=0;
                  keyboard.bad++;
                  keyboard.score+=10;
                }
                note.destroy();
                noteList.splice(i,1);
                break;
              }
              if(-0.5>note.time)
              {
                showJudgment('Miss');
                keyboard.combo=0;
                keyboard.miss++;
                note.destroy();
                noteList.splice(i,1);
                break;
              }
            break;
            case 'holdNote':
              if(onKeyPress(keyCode))
              {
                if(t<0.1)
                {
                  note.clickStatus='Perfect';
                }
                else if(t<0.2)
                {
                  note.clickStatus='Good';
                }
                else
                {
                  showJudgment('Bad');
                  keyboard.combo=0;
                  keyboard.bad++;
                  keyboard.score+=20;
                  note.destroy();
                  noteList.splice(i,1);
                  break;
                }
                holdedNote=noteList[i];
                break;
              }
              if(note.time<-0.5||note.isDestroyed)
              {
                showJudgment('Miss');
                keyboard.combo=0;
                keyboard.miss++;
                note.destroy();
                noteList.splice(i,1);
                break;
              }
            break;
          }
        }
      }
    }
    if(holdedNote!==null)
    {
      if(onKeyUp(keyCode)||holdedNote.isDestroyed)
      {
        let process=holdedNote.processTime/holdedNote.holdTime;
        if(process>0.2||holdedNote.processTime==null)
        {
          showJudgment('Bad');
          keyboard.combo=0;
          keyboard.bad++;
          keyboard.score+=20;
        }
        else if(process>0.1||holdedNote.clickStatus=='Good')
        {
          showJudgment('Good');
          keyboard.combo++;
          keyboard.maxCombo=Math.max(keyboard.maxCombo,keyboard.combo);
          keyboard.good++;
          keyboard.score+=70;
          keyboard.comboScore+=keyboard.combo;
        }
        else
        {
          showJudgment('Perfect');
          keyboard.combo++;
          keyboard.maxCombo=Math.max(keyboard.maxCombo,keyboard.combo);
          keyboard.perfect++;
          keyboard.score+=100;
          keyboard.comboScore+=keyboard.combo;
        }
        holdedNote.destroy();
        noteList.splice(noteList.indexOf(holdedNote),1);
        holdedNote=null;
      }
    }
  },
  draw:function()
  {
    var drawColor=onKeyDown(keyCode)?'ff0000':'ffffff';
    if(lastNoteStatus!==null&&lastNoteStatus.isDestroyed)
    {
      textDrawColorIndex=0;
    }
    drawText(keyChar,x+w/2,y+h/2,19,['ffffff','ffff00','007fff','ff0000','ff00ff'][textDrawColorIndex],'center','middle');
    
    if(keyChar=='F'||keyChar=='J')
    {
      var x2=x+w/2-w/2/1.8;
      var y2=y+h-h/5;
      var w2=w/1.8;
      var h2=3;
      var arcSize2=1.5;
      beginPath();
      moveTo(x2+arcSize2,y2);
      lineTo(x2+w2-arcSize2,y2);
      arc(x2+w2-arcSize2,y2+arcSize2,arcSize2,1.5*Math.PI,0,false);
      lineTo(x2+w2,y2+h2-arcSize2);
      arc(x2+w2-arcSize2,y2+h2-arcSize2,arcSize2,0,0.5*Math.PI,false);
      lineTo(x2+arcSize2,y2+h2);
      arc(x2+arcSize2,y2+h2-arcSize2,arcSize2,0.5*Math.PI,Math.PI,false);
      lineTo(x2,y2+arcSize2);
      arc(x2+arcSize2,y2+arcSize2,arcSize2,Math.PI,1.5*Math.PI,false);
      stroke(drawColor);
    }
    
    beginPath();
    moveTo(x+arcSize,y);
    lineTo(x+w-arcSize,y);
    arc(x+w-arcSize,y+arcSize,arcSize,1.5*Math.PI,0,false);
    lineTo(x+w,y+h-arcSize);
    arc(x+w-arcSize,y+h-arcSize,arcSize,0,0.5*Math.PI,false);
    lineTo(x+arcSize,y+h);
    arc(x+arcSize,y+h-arcSize,arcSize,0.5*Math.PI,Math.PI,false);
    lineTo(x,y+arcSize);
    arc(x+arcSize,y+arcSize,arcSize,Math.PI,1.5*Math.PI,false);
    stroke(drawColor);
  }
});

createObject('clickNote',
{
  time:Infinity,
  showDelay:1,
  create:function()
  {
  },
  step:function()
  {
    if(time==Infinity)
    {
      time=showDelay;
    }
    time-=delta;
  },
  draw:function()
  {
    if(time>0)
    {
      beginPath();
      var w=dx*(1-time/showDelay);
      var h=dy*(1-time/showDelay);
      var darc=arcSize;
      if(w<arcSize||w<h)
      {
        darc=w;
      }
      else if(h<arcSize)
      {
        darc=h;
      }
      moveTo(x-w+darc,y-h);
      lineTo(x+w-darc,y-h);
      arc(x+w-darc,y-h+darc,darc,1.5*Math.PI,0,false);
      lineTo(x+w,y+h-darc);
      arc(x+w-darc,y+h-darc,darc,0,0.5*Math.PI,false);
      lineTo(x-w+darc,y+h);
      arc(x-w+darc,y+h-darc,darc,0.5*Math.PI,Math.PI,false);
      lineTo(x-w,y-h+darc);
      arc(x-w+darc,y-h+darc,darc,Math.PI,1.5*Math.PI,false);
      stroke('ffffff');
    }
  }
});

createObject('holdNote',
{
  time:Infinity,
  showDelay:1,
  holdTime:3,
  processTime:null,
  create:function()
  {
  },
  step:function()
  {
    if(time==Infinity)
    {
      time=showDelay;
    }
    time-=delta;
    if(time<=0&&processTime==null)
    {
      processTime=holdTime+time;
    }
    if(processTime!=null)
    {
      processTime-=delta;
      if(processTime<=0)
      {
        destroy();
      }
    }
  },
  draw:function()
  {
    if(time>0)
    {
      beginPath();
      var w=dx*(1-time/showDelay);
      var h=dy*(1-time/showDelay);
      var darc=arcSize;
      if(w<arcSize||w<h)
      {
        darc=w;
      }
      else if(h<arcSize)
      {
        darc=h;
      }
      moveTo(x-w+darc,y-h);
      lineTo(x+w-darc,y-h);
      arc(x+w-darc,y-h+darc,darc,1.5*Math.PI,0,false);
      lineTo(x+w,y+h-darc);
      arc(x+w-darc,y+h-darc,darc,0,0.5*Math.PI,false);
      lineTo(x-w+darc,y+h);
      arc(x-w+darc,y+h-darc,darc,0.5*Math.PI,Math.PI,false);
      lineTo(x-w,y-h+darc);
      arc(x-w+darc,y-h+darc,darc,Math.PI,1.5*Math.PI,false);
      fill('ffffff');
    }
    else
    {
      var process=processTime/holdTime;
      beginPath();
      if(process>(dy*2-arcSize)/(dy*2))
      {
        var arcS=(dy*2-arcSize)/(dy*2);
        var arcP=(process-arcS)/(1-arcS);
        var len=Math.sqrt(-Math.pow(arcP,2)+1);
        var dir=Math.asin(len);
        len=(1-len)*arcSize;
        moveTo(x-dx+len,y-dy+dy*2*(1-process));
        lineTo(x+dx-len,y-dy+dy*2*(1-process));
        arc(x+dx-arcSize,y-dy+arcSize,arcSize,1.5*Math.PI+dir,0,false);
        lineTo(x+dx,y+dy-arcSize);
        arc(x+dx-arcSize,y+dy-arcSize,arcSize,0,0.5*Math.PI,false);
        lineTo(x-dx+arcSize,y+dy);
        arc(x-dx+arcSize,y+dy-arcSize,arcSize,0.5*Math.PI,Math.PI,false);
        lineTo(x-dx,y-dy+arcSize);
        arc(x-dx+arcSize,y-dy+arcSize,arcSize,Math.PI,1.5*Math.PI-dir,false);
      }
      else if(process>(arcSize)/(dy*2))
      {
        moveTo(x-dx,y-dy+dy*2*(1-process));
        lineTo(x+dx,y-dy+dy*2*(1-process));
        arc(x+dx-arcSize,y+dy-arcSize,arcSize,0,0.5*Math.PI,false);
        lineTo(x-dx+arcSize,y+dy);
        arc(x-dx+arcSize,y+dy-arcSize,arcSize,0.5*Math.PI,Math.PI,false);
        lineTo(x-dx,y-dy+dy*2*(1-process));
      }
      else
      {
        var arcS=arcSize/(dy*2);
        var arcP=(process-arcS)/arcS;
        var len=Math.sqrt(-Math.pow(arcP,2)+1);
        var dir=Math.asin(len);
        len=(1-len)*arcSize;
        moveTo(x-dx+len,y-dy+dy*2*(1-process));
        lineTo(x+dx-len,y-dy+dy*2*(1-process));
        arc(x+dx-arcSize,y+dy-arcSize,arcSize,Math.PI*0.5-dir,0.5*Math.PI,false);
        lineTo(x-dx+arcSize,y+dy);
        arc(x-dx+arcSize,y+dy-arcSize,arcSize,0.5*Math.PI,Math.PI*0.5+dir,false);
        lineTo(x-dx+len,y-dy+dy*2*(1-process));
      }
      fill('ffffff');
    }
  }
});

createObject('bombNote',
{
  time:Infinity,
  showDelay:1,
  create:function()
  {
  },
  step:function()
  {
    if(time==Infinity)
    {
      time=showDelay;
    }
    time-=delta;
  },
  draw:function()
  {
    if(time>0)
    {
      beginPath();
      var w=dx*(1-time/showDelay);
      var h=dy*(1-time/showDelay);
      var darc=arcSize;
      if(w<arcSize||w<h)
      {
        darc=w;
      }
      else if(h<arcSize)
      {
        darc=h;
      }
      moveTo(x-w+darc,y-h);
      lineTo(x+w-darc,y-h);
      arc(x+w-darc,y-h+darc,darc,1.5*Math.PI,0,false);
      lineTo(x+w,y+h-darc);
      arc(x+w-darc,y+h-darc,darc,0,0.5*Math.PI,false);
      lineTo(x-w+darc,y+h);
      arc(x-w+darc,y+h-darc,darc,0.5*Math.PI,Math.PI,false);
      lineTo(x-w,y-h+darc);
      arc(x-w+darc,y-h+darc,darc,Math.PI,1.5*Math.PI,false);
      stroke('ff4d3d');
    }
  }
});

createObject('textEffect',
{
  showTime:1,
  _time:null,
  step:function()
  {
    if(_time==null)
    {
      _time=showTime;
    }
    _time-=delta;
    if(_time<=0)
    {
      destroy();
    }
  },
  draw:function()
  {
    drawText(text,this.screen.canvas.width/2,this.screen.canvas.height-80*5-60,60,'ffffff','center','bottom',true);
  }
});

createObject('noteStatus',
{
  status:'none',
  create:function()
  {
    var life=0.5;
  },
  step:function()
  {
    life-=delta;
    if(life<=0)
    {
      destroy();
    }
  },
  draw:function()
  {
    var color;
    switch(status)
    {
      case 'Perfect':
        color='ffff00';
      break;
      case 'Good':
        color='007fff';
      break;
      case 'Bad':
        color='ff0000';
      break;
      case 'Miss':
        color='ff00ff';
      break;
      default:
        color='909090';
      break;
    }
    setAlpha(0.8);
    drawText(status,x,y,30,color,'center','middle',true);
    setAlpha(1);
  }
});

createObject('resultController',
{
  create:function()
  {
    var data=Global.get('resultData');
    var mapData=data.mapData;
    var score=data.score;
    var maxCombo=data.maxCombo;
    var perfect=data.perfect;
    var good=data.good;
    var bad=data.bad;
    var miss=data.miss;
    
    var scoreText;
    
    if(score==1000000)
    {
      scoreText='추카';
    }
    else if(score>=950000)
    {
      scoreText='S';
    }
    else if(score>=900000)
    {
      scoreText='A';
    }
    else if(score>=800000)
    {
      scoreText='B';
    }
    else if(score>=700000)
    {
      scoreText='C';
    }
    else
    {
      scoreText='못함';
    }
    
    var buttonPadding=30;
    var buttonWidth=100;
    var buttonHeight=50;
    var buttonArc=8;
    function drawButton(x,y,w,h,a)
    {
      beginPath();
      moveTo(x+a,y);
      lineTo(x+w-a,y);
      arc(x+w-a,y+a,a,1.5*Math.PI,0,false);
      lineTo(x+w,y+h-a);
      arc(x+w-a,y+h-a,a,0,0.5*Math.PI,false);
      lineTo(x+a,y+h);
      arc(x+a,y+h-a,a,0.5*Math.PI,Math.PI,false);
      lineTo(x,y+a);
      arc(x+a,y+a,a,Math.PI,1.5*Math.PI,false);
      stroke('ffffff');
    }
  },
  step:function()
  {
    var m=getMouse();
    if(onMouseUp(0))
    {
      if(
        buttonPadding<=m.x&&
        m.x<=buttonPadding+buttonWidth&&
        this.screen.canvas.height-buttonPadding-buttonHeight<=m.y&&
        m.y<=this.screen.canvas.height-buttonPadding-buttonHeight+buttonHeight)
      {
        showScreen('game');
      }
      if(
        this.screen.canvas.width-buttonPadding-buttonWidth<=m.x&&
        m.x<=this.screen.canvas.width-buttonPadding-buttonWidth+buttonWidth&&
        this.screen.canvas.height-buttonPadding-buttonHeight<=m.y&&
        m.y<=this.screen.canvas.height-buttonPadding-buttonHeight+buttonHeight)
      {
        showScreen('menu');
      }
    }
  },
  draw:function()
  {
    drawText(mapData.header.song,this.screen.canvas.width/2,50,120,'ffffff','center','top',false);
    drawText(mapData.header.artist,this.screen.canvas.width/2,180,60,'ffffff','center','top',false);
    
    drawText(String(score).padStart(7,'0'),this.screen.canvas.width/2,this.screen.canvas.height-250,50,'ffffff','center','bottom',false);
    drawText('best combo : '+String(maxCombo).padStart(4,'0'),this.screen.canvas.width/2,this.screen.canvas.height-190,50,'ffffff','center','bottom',false);
    
    drawText('perfect',this.screen.canvas.width/2-360,800,40,'ffffff','center','bottom',false);
    drawText('good',this.screen.canvas.width/2-360+240,800,40,'ffffff','center','bottom',false);
    drawText('bad',this.screen.canvas.width/2+360-240,800,40,'ffffff','center','bottom',false);
    drawText('miss',this.screen.canvas.width/2+360,800,40,'ffffff','center','bottom',false);
    
    drawText(perfect,this.screen.canvas.width/2-360,800,40,'ffffff','center','top',false);
    drawText(good,this.screen.canvas.width/2-360+240,800,40,'ffffff','center','top',false);
    drawText(bad,this.screen.canvas.width/2+360-240,800,40,'ffffff','center','top',false);
    drawText(miss,this.screen.canvas.width/2+360,800,40,'ffffff','center','top',false);
    
    drawText(scoreText,this.screen.canvas.width/2,450,240,'ffffff','center','middle',false);
    
    drawButton(buttonPadding,this.screen.canvas.height-buttonPadding-buttonHeight,buttonWidth,buttonHeight,buttonArc);
    drawText('retry',buttonPadding+buttonWidth/2,this.screen.canvas.height-buttonPadding-buttonHeight+buttonHeight/2,40,'ffffff','center','middle',false);
    drawButton(this.screen.canvas.width-buttonPadding-buttonWidth,this.screen.canvas.height-buttonPadding-buttonHeight,buttonWidth,buttonHeight,buttonArc);
    drawText('exit',this.screen.canvas.width-buttonPadding-buttonWidth+buttonWidth/2,this.screen.canvas.height-buttonPadding-buttonHeight+buttonHeight/2,40,'ffffff','center','middle',false);
  }
});