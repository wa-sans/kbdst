Global.set('roomStack',[]);
if(Storage.get('offset')===undefined)
{
  Storage.set('offset',0);
}
Global.set('offset',Storage.get('offset'));

createScreen('main');
pushObject('main','playNoti',0,0);

createScreen('menu');
pushObject('menu','versionShow',0,0);
pushObject('menu','menuController',0,0);
pushObject('menu','correctionEdit',0,0);
pushObject('menu','correctionButton',1600-64-10,10);

createScreen('correction');
pushObject('correction','correctionController',0,0);

createScreen('game');
pushObject('game','keyboard',0,0);

createScreen('result');
pushObject('result','resultController',0,0);

showScreen('menu');