var fs = require('fs');
var readline = require('readline');
var _ = require('underscore');
module.exports = {
  merge: function(file) {
    var geojson = JSON.parse(fs.readFileSync(file).toString());
    // console.log(geojson);
    var result = {};
    var features = geojson.features;
    for (var i = 0; i < features.length; i++) {
      if (result[features[i].properties['@id']]) {
        if (features[i].geometry.type == 'LineString') {
          var previous = result[features[i].properties['@id']].geometry.coordinates;
          var currently = features[i].geometry.coordinates;
          if (previous[previous.length - 1][0] === currently[0][0] && previous[previous.length - 1][1] === currently[0][1]) {
            result[features[i].properties['@id']].geometry.coordinates = previous;
          } else if (currently[currently.length - 1][0] === previous[0][0] && currently[currently.length - 1][1] === previous[0][1]) {
            currently = currently.concat(previous);
            result[features[i].properties['@id']].geometry.coordinates = currently;
          }
        }
      } else {
        result[features[i].properties['@id']] = features[i];
      }
    }
    _.values(result);
    var geo = {
      "type": "FeatureCollection",
      "features": _.values(result)
    };
    process.stdout.write(JSON.stringify(geo) + '\n');
  }
};