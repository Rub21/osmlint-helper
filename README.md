# osmlint-filter

Help to handle the output [osmlint](https://github.com/osmlab/osmlint) files

## Install

```
git clone https://github.com/Rub21/osmlint-filter.git
cd osmlint-filter
npm install && npm link

```

### Command line

- **Filter yesterday changes**

`osmlint-filter -y unconnectedhighways.tofix.json > unconnectedhighways.json`

- **Filter data from mapbox data team**

`osmlint-filter -f unconnectedhighways.tofix.json > data-team.json`

- **Split json file into small geojson files per user**

`osmlint-filter -f unconnectedhighways.tofix.json`

*Output :* Geojson files for each user. 

- **Convert osmlint output json file to geojson file**

`osmlint-filter -g unconnectedhighways.tofix.json > unconnectedhighways.geojson`

- **Merger all chunk ways in a geojson**


*The osmlint output can be contained to or more ways which are the same way but on different Tiles,  `merge` allow merge these ways in just one.*


`osmlint-filter -m unconnectedhighways.tofix.json > osmlint-filter -m unconnectedhighways.tofix.json2`

- **Put each feature in line**

`osmlint-filter -l unconnectedhighways.tofix.json --type Point > unconnectedhighways.json` 
or

`osmlint-filter -l unconnectedhighways.tofix.json --type Point,MultiPoint,LineString > unconnectedhighways.json`


- **fFilter a osmlint output file for geometry**

`osmlint-filter -t unconnectedhighways.tofix.json --type Point,MultiPoint > unconnectedhighways.json`