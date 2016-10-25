var fs = require('fs');
var _ = require('underscore');
var readline = require('readline');
var turf = require('turf');

module.exports = {
  merge: function(file) {
    var rd = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    });
    rd.on('line', function(line) {
      var obj = JSON.parse(line);
      var result = {};
      var features = obj.features;
      for (var i = 0; i < features.length; i++) {
        var val = features[i];
        if (val.geometry.type === 'Point') {
          var id = val.properties._fromWay + ',' + val.properties._toWay;
          if (!result[id]) {
            result[id] = [val];
          } else {
            result[id].push(val);
          }
        }
      }
      var geojson = {
        "type": "FeatureCollection",
        "features": []
      };
      _.each(result, function(val, key) {
        var points = {
          "type": "FeatureCollection",
          "features": val
        };
        var multipoints = turf.combine(points);
        multipoints.features[0].properties = val[0].properties;
        geojson.features.push(multipoints.features[0]);
      });
      process.stdout.write(JSON.stringify(geojson) + '\n');

    }).on('close', function() {});
  }
};