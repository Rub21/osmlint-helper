# osmlint-helper

Help to handle the output [osmlint](https://github.com/osmlab/osmlint) and [osmlint-osmium](https://github.com/osmlab/osmlint-osmium) files.

## Install

```
git clone https://github.com/Rub21/osmlint-helper.git
cd osmlint-helper
npm install && npm link

```

or

```
npm install osmlint-helper -g

```

### Command line

- **Filter yesterday changes**

`osmlinth -y unconnectedhighways.tofix.json > unconnectedhighways.json`

- **Filter data from mapbox data team**

`osmlinth -f unconnectedhighways.tofix.json > data-team.json`

- **Split json file into small geojson files per user**

`osmlinth -f unconnectedhighways.tofix.json`

*Output :* Geojson files for each user. 

- **Convert osmlint output json file to geojson file**

`osmlinth -g unconnectedhighways.tofix.json > unconnectedhighways.geojson`

- **Merger all chunk ways in a geojson**


*The osmlint output can be contained to or more ways which are the same way but on different Tiles,  `merge` allow merge these ways in just one.*


`osmlinth -m unconnectedhighways.tofix.json > osmlinth -m unconnectedhighways.tofix.json2`

- **Put each feature in line**

`osmlinth -l unconnectedhighways.tofix.json --type Point > unconnectedhighways.json` 
or

`osmlinth -l unconnectedhighways.tofix.json --type Point,MultiPoint,LineString > unconnectedhighways.json`


- **Filter a osmlint output file for geometry**

`osmlinth -t unconnectedhighways.tofix.json --type Point,MultiPoint > unconnectedhighways.json`


- **Filter a osmlint output according the type of highway**

```
'major', 'minor', 'path', 'major-major', 'major-minor', 'major-path', 'minor-major', 'minor-minor', 'minor-path', 'path-major', 'path-minor', 'path-path'
```

`osmlinth -w unconnectedhighways.tofix.json --type major,minor > unconnectedhighways-type.json`


- **Filter a osmlint output according the hash which is coming from the to-fix API**


`
osmlinth -c unconnectedhighways.tofix.json --url http://localhost:8000/tasks/crossinghighwaysnpa/items/action/noterror > unconnectedhighways-filter.json`


- **Clip**

```
osmlinth -i imputfile.geojson clipfile.geojson > output.geojson
```


