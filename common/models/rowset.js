// Include Backbone
var Backbone = require('backbone');

/**
 * Model of the abstract purpose, with unknown number of fields.
 * @class RowsetModel
 */
var RowsetModel = Backbone.Model.extend({

    // Schema defines the fields for the model's table
    // schema: {
    //     type: ['String', {nullable: false}],
    //     name: ['String', {unique: true, indexed: true}],
    //     created_at: 'timestamp'
    // }

    getFieldNames: function() {
        return Object.keys(this.attributes);
    }

});

module.exports = RowsetModel;
