var fs = require('fs')
var readline = require('readline')
var turf = require('turf')

module.exports = {
  multipoint: function (file) {
    var rd = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    })
    rd.on('line', function (line) {
      var obj = JSON.parse(line)
      var geojson = {
        'type': 'FeatureCollection',
        'features': []
      }
      for (var i = 0; i < obj.features.length; i++) {
        if (obj.features[i].geometry.type === 'LineString' || obj.features[i].geometry.type === 'Polygon') {
          var multipoints = turf.combine(turf.explode(obj.features[i]))
          multipoints.features[0].properties = obj.features[i].properties
          geojson.features.push(multipoints.features[0])
        } else {
          geojson.features.push(obj.features[i])
        }
      }
      process.stdout.write(JSON.stringify(geojson) + '\n')
    }).on('close', function () {})
  }
}
