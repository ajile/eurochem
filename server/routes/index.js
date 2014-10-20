var _ = require('underscore');
var express = require('express');
var router = express.Router();

var debug = require('debug')('server:routes:rowsets');
var RowsetModel = require('../models/rowset');

// Index page
router.get('/', function(req, res) {
    // var rm = new RowsetModel();
    // rm.set({type: 2, name: _.now()});
    // rm.save();

    // Get all items with is_active = true
    RowsetModel.find({}, function(err, rows) {

        debug('Founded %d records', rows.length);

        // Prepare rowsets to rendering
        var data = _.pluck(rows, 'attributes');

        // Headers
        var headers = rows[0].getFieldNames();

        // Page render
        res.render('rowsets', {headers: headers, data: data});

    }).catch(function() {

        // Page render
        res.render('rowsets', {headers: headers, data: []});

    });

});

/* POST rowset listing. */
router.post('/', function(req, res) {});

module.exports = router;
