const getJpnDate = function(yyyymmdd){
  return String(yyyymmdd).substr(0,4)+'年'+String(yyyymmdd).substr(4,2)+'月'+String(yyyymmdd).substr(6,2)+'日'
}

// DBのデータがおかしかった
const replaceDubbleQw = function(str){
  return str.replace('"', '').replace('"', '')
}

module.exports = {getJpnDate: getJpnDate, replaceDubbleQw: replaceDubbleQw}