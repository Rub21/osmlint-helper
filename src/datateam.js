var fs = require('fs');
var readline = require('readline');
var mbxusers = require('mapbox-data-team').getUsernames();
mbxusers = mbxusers.reduce(function(memo, currentValue) {
  memo[currentValue.toString()] = true;
  return memo;
}, {});

module.exports = {
  filter: function(file) {
    var rd = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    });
    rd.on('line', function(line) {
      var obj = JSON.parse(line);
      var users = {
        "type": "FeatureCollection",
        "features": []
      };
      obj.features.forEach(function(val) {
        if (mbxusers.hasOwnProperty(val.properties['@user'])) {
          users.features.push(val);
        }
      });
      if (users.features.length > 0) {
        process.stdout.write(JSON.stringify(users) + '\n');
      }
    }).on('close', function() {});
  },
  split: function(file) {
    var users = {};
    var rd = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    });
    rd.on('line', function(line) {
      var obj = JSON.parse(line);
      obj.features.forEach(function(val) {
        var user = val.properties['@user'];
        if (users[user]) {
          users[user].features.push(val);
        } else {
          users[user] = {
            "type": "FeatureCollection",
            "features": [val]
          };
        }
      });
    }).on('close', function() {
      for (var user in users) {
        fs.writeFile(user.replace(/ /g, '-') + '.geojson', JSON.stringify(users[user]));
      }
    });
  }
};