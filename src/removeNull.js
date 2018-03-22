var fs = require('fs')
var _ = require('underscore')
module.exports = function (file) {
  var newGeojson = {
    'type': 'FeatureCollection',
    'features': []
  }
  var geojson = fs.readFileSync(file, 'utf8')
  geojson = JSON.parse(geojson)
  for (var i = 0; i < geojson.features.length; i++) {
    var obj = replaceSC(geojson.features[i])
    newGeojson.features.push(obj)
  }
  process.stdout.write(JSON.stringify(newGeojson))
}

function replaceSC (obj) {
  if (_.isArray(obj)) {
    for (var k = 0; k < obj.length; k++) {
      obj[k] = replaceSC(obj[k])
    }
  } else {
    var keys = _.keys(obj)
    for (var i = 0; i < keys.length; i++) {
      if (_.isNull(obj[keys[i]])) {
        delete obj[keys[i]]
      } else {
        var key = keys[i].replace(/[^A-Za-z]/g, '_').replace(/__/g, '_').replace(/___/g, '_').replace(/g_/g, 'g')
        if (key !== keys[i]) {
          obj[key] = obj[keys[i]]
          delete obj[keys[i]]
        }
        /* eslint valid-typeof: "error" */
        if (_.isObject(obj[key]) && key !== 'geometry') {
          obj[key] = replaceSC(obj[key])
        } else if (typeof obj[key] === 'string' || obj[key] instanceof String) {
          obj[key] = obj[key].replace(/[^a-zA-Z0-9]/g, '_')
        }
      }
    }
  }
  return obj
}
