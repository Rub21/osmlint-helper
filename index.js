#!/usr/bin/env node

'use strict'
var program = require('commander')
var argv = require('minimist')(process.argv.slice(2))
var datateam = require('./src/datateam')
var lastday = require('./src/lastday')
var togeojson = require('./src/togeojson')
var merge = require('./src/merge')
var featureinline = require('./src/featureinline')
var filterpergeometry = require('./src/filterpergeometry')
var filtertypeways = require('./src/filtertypeways')
var comparehash = require('./src/comparehash')
var tomultipoint = require('./src/tomultipoint')
var mergegeobyid = require('./src/mergegeobyid')
var mergeArray = require('./src/mergeArray')
var clip = require('./src/clip')

program
  .version('0.0.1')
  .option('-y, --yesterday', 'filter yesterday changes')
  .option('-f, --filterdatateam', 'Filter data from mapbox data team')
  .option('-s, --splitperuser', 'Split json file into small geojson files')
  .option('-g, --togeojson', 'Convert osmlint output to geojson')
  .option('-m, --merge', 'merger all chunk ways in a geojson')
  .option('-l, --featureinline', 'Put each feature in line')
  .option('-t, --filterpergeometry', 'filter a osmlint output file for geometry')
  .option('-w, --filtertypeways', 'filter type of ways according osmlint classifications')
  .option('-c, --comparehash', 'compare hash, between not and error issues from to-fix and new detection from osmlint, the output are the issues which are not equal to the hash')
  .option('-p, --tomultipoint', 'convert Linestring, Polygons to multipoints')
  .option('-o, --mergegeobyid', 'merge points to multipoint - overlaphighways- fix later')
  .option('-r, --mergearrayfiles', 'merge teo array files into one')
  .option('-u, --mergearrayfilesandurl', 'merge teo array files into one')
  .option('-i, --clip', 'clip the layer')

.parse(process.argv)

var file = process.argv.slice(2)[1]
if (program.yesterday) {
  lastday.filter(file)
}
if (program.filterdatateam) {
  datateam.filter(file)
}
if (program.splitperuser) {
  datateam.split(file)
}
if (program.togeojson) {
  togeojson.convert(file)
}
if (program.merge) {
  merge.merge(file)
}
if (program.featureinline) {
  featureinline.toline(file, argv.type)
}
if (program.filterpergeometry) {
  filterpergeometry.filterbygeometrytype(file, argv.type)
}
if (program.filtertypeways) {
  filtertypeways.filterbywaytype(file, argv.type)
}
if (program.comparehash) {
  comparehash.compare(file, argv.file)
}
if (program.tomultipoint) {
  tomultipoint.multipoint(file, argv.url)
}
if (program.mergegeobyid) {
  mergegeobyid.merge(file, argv.url)
}
if (program.mergearrayfiles) {
  mergeArray.mergeArrayFiles(file, argv.file)
}
if (program.mergearrayfilesandurl) {
  mergeArray.mergeArrayFileURL(file, argv.url)
}

if (program.clip) {
  var imputFile = process.argv.slice(2)[1]
  var clipFile = process.argv.slice(2)[2]
  clip.clip(imputFile, clipFile)
}
