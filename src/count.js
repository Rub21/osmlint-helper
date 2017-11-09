var fs = require('fs')
var _ = require('underscore')

module.exports = {
  count: function(imputfile) {
    var countObjs = {}
    fs.readFile(imputfile, 'utf8', function(err, geojson) {
      if (err) console.log(err)
      geojson = JSON.parse(geojson)
      for (var i = 0; i < geojson.features.length; i++) {
        var keys = _.keys(geojson.features[i].properties)
        for (var k = 0; k < keys.length; k++) {
          if (keys[k].indexOf('@') === -1) {
            if (countObjs[keys[k]]) {
              if (geojson.features[i].properties['@version'] === 1 ) {
                countObjs[keys[k]].created++
              } else {
                countObjs[keys[k]].modifited++
              }
            } else {
              countObjs[keys[k]] = {
                created: geojson.features[i].properties['@version'] === 1 ? 1 : 0,
                modifited: geojson.features[i].properties['@version'] !== 1 ? 1 : 0
              }
            }
          }
        }
      }
      console.log(JSON.stringify(countObjs))
    })
  }
}