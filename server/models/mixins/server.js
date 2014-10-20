var conf = require('../../config.js');
var _ = require('underscore');
var Backbone = require('backbone');
var SQLSync = require('backbone-sql').sync;

var dbp = [conf.get('database.type'), ":", conf.get('database.user'),
           ":", conf.get('database.password'), "@", conf.get('database.host'),
           "/", conf.get('database.name')].join('');


var ServerModelMixin = {

    tableName: null,

    // Database connection and table name are specified with the urlRoot
    urlRoot: function() {
        var tn = _.result(this, 'tableName');
        return dbp + '/' + tn;
    }

};

module.exports = ServerModelMixin;
