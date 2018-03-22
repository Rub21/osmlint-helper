var fs = require('fs')

module.exports = {
  filterbytag: function (imputfile, tags) {
    var geo = {
      'type': 'FeatureCollection',
      'features': []
    }
    fs.readFile(imputfile, 'utf8', function (err, geojson) {
      if (err) console.log(err)
      geojson = JSON.parse(geojson)
      for (var i = 0; i < geojson.features.length; i++) {
        if (hasTag(geojson.features[i].properties, tags)) {
          geo.features.push(geojson.features[i])
        }
      }
      process.stdout.write(JSON.stringify(geo))
    })
  }
}

function hasTag (properties, tags) {
  for (var prop in properties) {
    if (tags[prop] === properties[prop]) {
      return true
    }
  }
  return false
}
