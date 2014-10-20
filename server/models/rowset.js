var _ = require('underscore'),
    ServerModelMixin = require('./mixins/server'),
    BaseRowsetModel = require('../../common/models/rowset');


var debug = require('debug');
var logger = debug('server:models:rowsets');

var slug = require('slug');
var fs = require('fs');

var getData = function() {

    // Pulling data from a file
    var getContent = _.memoize(function(path) {
        return fs.readFileSync(path, 'utf8');
    });

    // CSV file path (used for memorized function)
    var path = require('path').normalize(__dirname + '/../datum/data_1.csv'),

        content = getContent(path),

        lines = content.split("\n"),

        data = [],

        headers = [];

    _.each(lines, function(line, index) {
        var cells = line.split(',');
        if (index === 0) {
            // Header row
            headers = _.object(
                _.map(cells, function(cell) { return slug(cell, '_').toLowerCase(); }),
                cells
            );
        } else {
            // Regular row
            data.push(_.object(Object.keys(headers), cells));
        }
    });

    return {headers: headers, data: data};
};

// Table name
var tableName = 't';

var RowsetModel = BaseRowsetModel.extend(ServerModelMixin).extend({

    // Table name
    tableName: tableName,

    // Schema defines the fields for the model's table
    schema: function() {

        // In this static property we going to put schema data
        RowsetModel.fileHeaders = RowsetModel.fileHeaders || {};

        // If model's schema doesn't filled up
        if (_.isEmpty(RowsetModel.fileHeaders)) {

            logger("Filling model's schema.");
        
            var headers = getData().headers;
            var slugHeaders = Object.keys(headers);

            // Fill out fields
            _.each(slugHeaders, function(fieldName) {

                logger('field name', fieldName);

                // Append to fields
                RowsetModel.fileHeaders[fieldName] = ['String', {indexed: true}];
            });

        }

        return RowsetModel.fileHeaders;
    }

});

// _.extend(RowsetModel.prototype, ServerModelMixin);

RowsetModel.prototype.sync = require('backbone-sql').sync(RowsetModel);
RowsetModel.prototype.tableName = tableName;

// Database
db = RowsetModel.db();

db.hasTable().then(function(has) {
    if (!has) {
        // Table doesn't exists. Create and fill it.
        logger("Create RowsetModel's table");
        // Create table...
        db.ensureSchema(function(err) {
            logger("Fill up the table");
            // ...and fill.
            var data = getData().data;
            _.each(data, function(row) {
                var r = new RowsetModel(row);
                r.save();
            });
        });
    } else {
        // The table already exists. Do nothing.
        logger("RowsetModel's table already created");
    }
});

module.exports = RowsetModel;
