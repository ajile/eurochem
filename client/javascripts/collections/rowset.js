var Backbone = require('backbone');
var RowsetModel = require('../models/rowset');
var RowsetCollection = module.exports = Backbone.Collection.extend({

    url: '/rowsets',

    model: RowsetModel

});
