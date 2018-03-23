# osmlint-helper

Helpers to handle the output from[osmlint](https://github.com/osmlab/osmlint) and [osmlint-osmium](https://github.com/osmlab/osmlint-osmium).

## Install

```
git clone https://github.com/osmlab/osmlint-helper.git
cd osmlint-helper
npm install && npm link

```

or

```
npm install osmlint-helper -g

```

### CLI usage

- **Filter yesterday changes**

`osmlinth -y unconnectedhighways.tofix.json > unconnectedhighways.json`

- **Filter data from Mapbox data team**

`osmlinth -f unconnectedhighways.tofix.json > data-team.json`

- **Split JSON into GeoJSON per user**

`osmlinth -f unconnectedhighways.tofix.json`

*Output :* GeoJSON files for each user. 

- **Convert osmlint output JSON to GeoJSON**

`osmlinth -g unconnectedhighways.tofix.json > unconnectedhighways.geojson`

- **Merger all chunk ways in a GeoJSON**

*The osmlint output can be contained to or more ways which are the same way but on different Tiles,  `merge` allow merge these ways in just one.*


`osmlinth -m unconnectedhighways.tofix.json > osmlinth -m unconnectedhighways.tofix.json2`

- **Put each feature in line**

`osmlinth -l unconnectedhighways.tofix.json --type Point > unconnectedhighways.json` 

or

`osmlinth -l unconnectedhighways.tofix.json --type Point,MultiPoint,LineString > unconnectedhighways.json`

- **Filter osmlint output by geometry**

`osmlinth -t unconnectedhighways.tofix.json --type Point,MultiPoint > unconnectedhighways.json`


- **Filter osmlint output by type of highway**

```
'major', 'minor', 'path', 'major-major', 'major-minor', 'major-path', 'minor-major', 'minor-minor', 'minor-path', 'path-major', 'path-minor', 'path-path'
```

`osmlinth -w unconnectedhighways.tofix.json --type major,minor > unconnectedhighways-type.json`


- **Filter osmlint output according the hash which is coming from the to-fix API**

`osmlinth -c unconnectedhighways.tofix.json --url http://localhost:8000/tasks/crossinghighwaysnpa/items/action/noterror > unconnectedhighways-filter.json`

- **Clip GeoJSON from a polygon**

```
osmlinth -i input.geojson clipfile.geojson > output.geojson
```

- **Remove null elements**

```
osmlinth -n input.geojson >  output.geojson
```

- **Get members from relations**

This functionality is basically for osm [osmlint-osmium](https://github.com/osmlab/osmlint-osmium) output, 
most of this outputs contain the members in `properties.relations`

```
osmlinth -b input.geojson >  output.geojson

```


- **Filter objects by tag**

Filter the objects according tags (properties in the geojson).

e.g

```
osmlinth -a atlanta-objs.geojson --type="restriction" > atlanta-tr.geojson

or 

osmlinth -filterbytag atlanta-objs.geojson --type="restriction" > atlanta-tr.geojson

```

- **Count tags (properties) in a GeoJSON**

Count all properties(tags) from geojson files.

e.g


```
osmlinth --count atlanta-tr.geojson > atlanta-num-objs.json

```

the output would be like this:


```
{
    "members": {
        "created": 0,
        "modified": 341
    },
    "implicit": {
        "created": 0,
        "modified": 53
    },
    "restriction": {
        "created": 0,
        "modified": 325
    },
    "type": {
        "created": 0,
        "modified": 341
    },
    "restriction:conditional": {
        "created": 0,
        "modified": 16
    },
    "name": {
        "created": 0,
        "modified": 1
    }
}
```
