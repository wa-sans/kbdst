var {Global}=require('global');

function versionCheck(data)
{
  var failModule=[];
  for(var e in data)
  {
    if(require(e).version!=data[e])
    {
      failModule.push(
      {
        name:e,
        version:require(e).version
      });
    }
  }
  return failModule;
}

function main()
{
  var versionList=
  {
    'screen':2,
    'canvas':1,
    'sprite':1,
    'obj':1,
    'fileload':2,
    'keyboard':1,
    'mouse':1,
    'requestaframe':1,
    'maploader':2,
    'globalvar':1,
    'global':1,
    'audioout':1,
    'storage':1,
    'instance':2
  };
  var versionData=versionCheck(versionList);
  if(versionData.length>0)
  {
    versionData.forEach(x=>require(x.name,true));
    versionData=versionCheck(versionList);
    if(versionData.length>0)
    {
      var p=document.createElement('p');
      p.innerText=versionData.map(x=>'"'+x.name+'"').join(',')+' 모듈의 버전이 낮습니다.\n';
      p.innerHTML+='<a href="https://discord.gg/GE5hBfu">https://discord.gg/GE5hBfu</a>로 문의해주세요.';
      document.body.appendChild(p);
    }
    else
    {
      engine();
    }
  }
  else
  {
    engine();
  }
}

async function engine()
{
  var {Screen}=require('screen');
  var Canvas=new(require('canvas').Canvas)();
  var {Sprite}=require('sprite');
  var {Obj}=require('obj');
  var {AudioOut}=require('audioout');
  var {FileLoad}=require('fileload');
  var {Keyboard}=require('keyboard');
  var {Mouse}=require('mouse');
  var {requestAFrame}=require('requestaframe');
  var {MapLoader,MapHeaderLoader}=require('maploader');
  var {GlobalVar}=require('globalvar');
  var {Storage}=require('storage');

  var spriteMap=new Map();
  function loadSprite(json)
  {
    for(var name in json)
    {
      spriteMap.set(name,json[name]);
    }
  }
  
  var objectMap=new Map();
  GlobalVar.set('objectMap',objectMap);
  function createObject(name,json)
  {
    json.name=name;
    objectMap.set(name,new Obj(json));
  }
  
  var screenMap=new Map();
  var pShowedScreen=null;
  var showedScreen=null;
  function createScreen(name)
  {
    if(screenMap.has(name))
    {
      throw 'This room already exists.';
    }
    var scr=new Screen(name,Canvas.canvas);
    scr.showScreen=showScreen;
    screenMap.set(name,scr);
    return scr;
  }
  function pushObject(screen,name,x,y)
  {
    screenMap.get(screen).objectList.push(
    {
      object:objectMap.get(name),
      x:x,
      y:y
    });
  }
  function showScreen(name)
  {
    showedScreen=screenMap.get(name);
  }
  
  eval(FileLoad('./script/game.js'));
  eval(FileLoad('./script/room.js'));
  
  var spriteMapE=spriteMap.entries(),sprite,tempMap=new Map();
  while((sprite=spriteMapE.next().value)!==undefined)
  {
    var img=new Image();
    await(function()
    {
      return new Promise(function(resolve)
      {
        img.onload=resolve;
        img.src='./image/'+sprite[1];
      });
    })();
    tempMap.set(sprite[0],new Sprite(img));
  }
  spriteMap=tempMap;
  GlobalVar.set('spriteMap',spriteMap);
  
  (function()
  {
    Keyboard.init();
    Mouse.init();
    
    var ff=0;
    var ft=Date.now();
    
    var lastTime=Date.now();
    function step(processScreen)
    {
      ff++;
      if(Date.now()-ft>1000)
      {
        ft=Date.now();
        document.title=ff;
        ff=0;
      }
      if(processScreen!==null)
      {
        var deltaTime=Date.now()-lastTime;
        lastTime+=deltaTime;
        processScreen.step(deltaTime/1000);
      }
    }
    
    function rendering()
    {
      try
      {
        if(showedScreen!=pShowedScreen)
        {
          if(showedScreen!==null)
          {
            showedScreen.hide();
          }
          showedScreen.show();
          pShowedScreen=showedScreen;
        }
        var processScreen=showedScreen;
        step(processScreen);
        if(processScreen!==null)
        {
          processScreen.draw();
        }
        Keyboard.clear();
        Mouse.clear();
        requestAFrame(rendering);
      }
      catch(e)
      {
        alert('Error');
        console.log(e);
      }
    }
    rendering();
  })();
}

window.addEventListener('load',main);