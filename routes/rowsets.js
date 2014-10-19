var express = require('express');
var router = express.Router();
var _ = require('underscore');

var fs = require('fs');
var parse = require('csv-parse');

var debug = require('debug')('routes:rowsets');
var RowsetModel = require('../models/rowset');



function parseAndCreate(arguments) {

    // The path to some CSV file contains an data
    var file = require('path').normalize(__dirname + '/../datum/data_1.csv'),

        // Stream to read from file
        stream = null;

    /**
     * @function
     */
    var dataProceed = parse({delimiter: ';'}, function(err, data){

        var debug = require('debug')('routes:rowsets:row');

        // Occures some errors
        if (!_.isNull(err)) {
            throw new Error(err);
        }

        // Iterate over the provided data. The first row of these rowset is
        // a header of the CVS table present.
        _.each(data, function(row, index, rowset) {
            if (index == 0) {
                // First record is header being row. Should provide the
                // field's names presented by model. Here is DB table creating
                // if doesn't exists yet.
                // debug("header:", row.join(','));
                _.each(row, function(field_name) {
                    console.log(field_name)
                })
            } else {
                // The regular record - write down into the created table at
                // the previous iterate if its doesn't exists.
                debug("record:", row.join(','));
            }
        }, this);

    });

    debug("Trying to read data file on path %s.", file);

    if (!fs.existsSync(file)) {
        throw new Error("File in path " + file + " not found!")
    }

    debug("Open a stream to read");

    // Make a stream to read from file
    var stream = fs.createReadStream(file, {flags: 'r'});

    // Proccess incoming data
    stream.pipe(dataProceed);

}



/* GET rowset listing. */
router.get('/', function(req, res) {
    parseAndCreate();
    res.render('rowsets/table', {title: 'Тестовое задание EuroChem'});
});

/* POST rowset listing. */
router.post('/create/', function(req, res) {
	var parser = parse({delimiter: ';'}, function(err, data){
	   	console.log(data);
	});

	fs.createReadStream(__dirname + '/../datum/data_1.csv').pipe(parser);
  	res.send('Creating model');
});

module.exports = router;
