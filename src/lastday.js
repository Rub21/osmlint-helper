#!/usr/bin/env node

var fs = require('fs');
var readline = require('readline');
var d = new Date();
d.setDate(d.getDate() - 1);
d.setHours(0, 0, 0, 0);
yesterday = Math.floor(d.getTime() / 1000);

module.exports = {
  filter: function(file) {
    var rd = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    });
    rd.on('line', function(line) {
      var obj = JSON.parse(line);
      var lastedits = {
        "type": "FeatureCollection",
        "features": []
      };
      obj.features.forEach(function(val) {
        if (val.properties['@timestamp'] > yesterday) {
          lastedits.features.push(val);
        }
      });
      if (lastedits.features.length > 0) {
        process.stdout.write(JSON.stringify(lastedits) + '\n');
      }
    }).on('close', function() {});
  }
};