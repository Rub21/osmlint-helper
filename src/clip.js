var fs = require('fs');
var _ = require('underscore');
var turf = require('turf');

module.exports = {
  clip: function(imputfile, clipfile) {

    fs.readFile(imputfile, 'utf8', function(err, features) {
      if (err) {
        features = [];
      } else {
        features = JSON.parse(features);
      }

      var output = {
        "type": "FeatureCollection",
        "features": []
      };

      fs.readFile(clipfile, 'utf8', function(err, poly) {
        if (err) {
          poly = [];
        } else {
          poly = JSON.parse(poly).features[0];
        }
        for (var i = 0; i < features.features.length; i++) {
          var centroid = turf.centroid(features.features[i]);
          if (turf.inside(centroid, poly)) {
            output.features.push(features.features[i]);
          }
        }
        console.log(JSON.stringify(output));
      });
    });
  }
};