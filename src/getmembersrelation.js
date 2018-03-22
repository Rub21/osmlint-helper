var fs = require('fs')

module.exports = {
  getmembers: function (file) {
    var geojson = JSON.parse(fs.readFileSync(file).toString())
    var geo = {
      'type': 'FeatureCollection',
      'features': []
    }
    var features = geojson.features
    for (var i = 0; i < features.length; i++) {
      var f = features[i]
      if (f.properties.relations) {
        var relations = f.properties.relations
        for (var k = 0; k < relations.length; k++) {
          geo.features.push(relations[k])
        }
        delete f.properties.relations
      }
      geo.features.push(f)
    }
    process.stdout.write(JSON.stringify(geo) + '\n')
  }
}
