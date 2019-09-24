const getParams = function(search) {
  search = search
    .replace(/^\s+/, "")
    .replace(/\s+$/, "")
    .match(/([^?#]*)(#.*)?$/);
  if (!search) {
    return {};
  }
  var searchStr = search[1];
  var searchHash = searchStr.split("&");
  var ret = {};
  searchHash.forEach(function(pair) {
    var temp = pair.split("=", 1)[0] || "";
    if (temp) {
      var key = decodeURIComponent(temp);
      var value = pair.substring(key.length + 1);
      if (value !== undefined) {
        value = decodeURIComponent(value);
      }
      if (key in ret) {
        if (ret[key].constructor !== Array) {
          ret[key] = [ret[key]];
        }
        ret[key].push(value);
      } else {
        ret[key] = value;
      }
    }
  });
  return ret;
};
var utils = {
  getParams: getParams
};

export default utils;
