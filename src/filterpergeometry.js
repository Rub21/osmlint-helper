var fs = require('fs')
var readline = require('readline')
module.exports = {
  filterbygeometrytype: function (file, type) {
    var types = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon']
    if (type) {
      types = type.split(',')
    }
    var rd = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    })
    rd.on('line', function (line) {
      var obj = JSON.parse(line)
      var features = []
      for (var i = 0; i < obj.features.length; i++) {
        if (types.indexOf(obj.features[i].geometry.type) > -1) {
          features.push(obj.features[i])
        }
      }
      if (features.length > 0) {
        var geojson = {
          type: 'FeatureCollection',
          features: features
        }
        process.stdout.write(JSON.stringify(geojson) + '\n')
      }
    }).on('close', function () {})
  }
}
