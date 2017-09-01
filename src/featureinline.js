var fs = require('fs')
var readline = require('readline')

module.exports = {
  toline: function (file, type) {
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
      obj.features.forEach(function (val) {
        if (types.indexOf(val.geometry.type) > -1) {
          process.stdout.write(JSON.stringify(val) + '\n')
        }
      })
    }).on('close', function () {})
  }
}
