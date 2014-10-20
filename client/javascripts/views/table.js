var _ = require('underscore'),
    Marionette = require('backbone.marionette'),
    logger = require('debug')('views:table'),
    tableTemplate = require('../../../server/views/partials/table.jade'),
    rowTemplate = require('../../../server/views/partials/row.jade');

var RowView = Marionette.ItemView.extend({

    template: rowTemplate,

    tagName: "tr",

    serializeData: function(){
        return {
            'headers': this.model.getFieldNames(),
            'fields': this.model.attributes
        };
    }

});

var TableView = module.exports = Marionette.CompositeView.extend({

    template: tableTemplate,

    tagName: "table",

    className: "table",

    childView: RowView,

    childViewContainer: "tbody",

    collectionEvents: {
        "sync": "render"
    },

    serializeData: function() {
        // todo: Переделать!
        var firstModel = this.collection.first();
        return {'headers': firstModel ? firstModel.getFieldNames() : null};
    },

    initialize: function(options) {
        this.model = _.result(options, 'model');
        if (!_.has(options, "collection")) {
            throw new Error('You should provide an collection');
        }
        this.collection = _.result(options, 'collection');
        this.collection.on('sync', function(collection, data, xhr) {
            logger('Collection has been synced.', collection.length);
        }, this);
        Marionette.CollectionView.prototype.initialize.apply(this, arguments);
    }

});
