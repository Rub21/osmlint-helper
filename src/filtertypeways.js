var fs = require('fs');
var readline = require('readline');
module.exports = {
  filterbywaytype: function(file, type) {
    var types = ['major', 'minor', 'path', 'major-major', 'major-minor', 'major-path', 'minor-major', 'minor-minor', 'minor-path', 'path-major', 'path-minor', 'path-path'];
    if (type) {
      types = type.split(',');
    }
    var rd = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    });
    rd.on('line', function(line) {
      var obj = JSON.parse(line);
      var features = [];
      for (var i = 0; i < obj.features.length; i++) {
        if (types.indexOf(obj.features[i].properties._type) > -1) {
          features.push(obj.features[i]);
        }
      }
      if (features.length > 0) {
        var geojson = {
          type: 'FeatureCollection',
          features: features
        };
        process.stdout.write(JSON.stringify(geojson) + '\n');
      }
    }).on('close', function() {});
  }
};