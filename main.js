// using togeojson in nodejs

var tj = require('./node_modules/@mapbox/togeojson/togeojson.js'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom
    // @ts-ignore
    DOMParser = require('xmldom').DOMParser;

// get a list of files from "./lingbian" directory
var files = fs.readdirSync('./data/lingbian');

// convert the kml files in the directory to geojson
files.forEach(function(file) {
    // @ts-ignore
    var kml = new DOMParser().parseFromString(fs.readFileSync
        ('./data/lingbian/' + file, 'utf8'));
    var converted = tj.kml(kml);
    var json = JSON.stringify(converted);
    fs.writeFile
        ('./data/lingbianjson/' + file.replace('.kml', '.json'), json, 'utf8', function(err) {
            if (err) {
                console.log(err);
            }
        });
});