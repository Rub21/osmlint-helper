'use strict';
var fs = require('fs');
var request = require('request');
var readline = require('readline');
var sha1 = require('sha1');

module.exports = {
  compare: function(file, url) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var hashItems = JSON.parse(body);
        var rd = readline.createInterface({
          input: fs.createReadStream(file),
          output: process.stdout,
          terminal: false
        });
        rd.on('line', function(line) {
          var geojson = {
            type: 'FeatureCollection',
            features: []
          };
          var newitems = JSON.parse(line);
          for (var i = 0; i < newitems.features.length; i++) {
            var hash = sha1(JSON.stringify(newitems.features[i]));
            if (hashItems.indexOf(hash) === -1) {
              geojson.features.push(newitems.features[i]);
            }
          }
          process.stdout.write(JSON.stringify(geojson) + '\n');
        });
      }
    });
  }
};