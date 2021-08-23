exports.version=1;

var Storage=
{
  set:function(k,v)
  {
    window.localStorage.setItem(k,JSON.stringify(v));
  },
  get:function(k)
  {
    return JSON.parse(window.localStorage.getItem(k));
  }
}
exports.Storage=Storage;