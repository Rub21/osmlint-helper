var fs = require('fs');
var readline = require('readline');
var _ = require('underscore');
var request = require('request');

module.exports = {
  mergeArrayFiles: function(file1, file2) {
    var mergedArray = [];
    fs.readFile(file1, 'utf8', function(err, data1) {
      if (err) {
        data1 = [];
      } else {
        data1 = JSON.parse(data1);
      }
      mergedArray = mergedArray.concat(data1);
      fs.readFile(file2, 'utf8', function(err, data2) {
        if (err) {
          data2 = [];
        } else {
          data2 = JSON.parse(data2);
        }
        mergedArray = mergedArray.concat(data2);
        console.log(JSON.stringify(_.unique(mergedArray)));
      });
    });
  },
  mergeArrayFileURL: function(file, url) {
    var mergedArray = [];
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        mergedArray = JSON.parse(body);
      }
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
          data = [];
        }
        data = JSON.parse(data);
        mergedArray = mergedArray.concat(data);
        console.log(JSON.stringify(_.unique(mergedArray)));
      });
    });
  }
}