#!/usr/bin/env node

'use strict';

var program = require('commander');
var datateam = require('./src/datateam');
var lastday = require('./src/lastday');
var togeojson = require('./src/togeojson');

program
  .version('0.0.1')
  .option('-y, --yesterday', 'filter daya from las day')
  .option('-f, --filterdatateam', 'Filter data from mapbox data team')
  .option('-s, --splitperuser', 'Split json file into small geojson files')
  .option('-g, --togeojson', 'Convert osmlint output to geojson')
  .parse(process.argv);

var file = process.argv.slice(2)[1];
if (program.yesterday) {
  lastday.filter(file);
}
if (program.filterdatateam) {
  datateam.filter(file);
}
if (program.splitperuser) {
  datateam.split(file);
}
if (program.togeojson) {
  togeojson.convert(file);
}