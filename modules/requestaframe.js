exports.version=1;

exports.requestAFrame=(function()
{
  return window.requestAnimationFrame||
    window.webkitRequestAnimationFrame||
    window.mozRequestAnimationFrame||
    window.oRequestAnimationFrame||
    function (callback)
    {
      return window.setTimeout(callback,1000/60);
    };
})();