(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore', 'jquery'], function(Backbone, _, $) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      return factory(root, exports, Backbone, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    return factory(exports, Backbone, _);

  // Finally, as a browser global.
  } else {
    return factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

    "use strict";

    var RowsetModel = Backbone.Model.extend({

      // Database connection and table name are specified with the urlRoot
      urlRoot: 'postgres://username:password@localhost:27017/projects',

      // Schema defines the fields for the model's table
      schema: {
        created_at: 'DateTime',
        type: ['Integer', {nullable: false}],
        name: ['String', {unique: true, indexed: true}]
      }
    });

    // Kick it off by setting the model's sync to an SQLSync
    RowsetModel.prototype.sync = require('backbone-sql').sync(RowsetModel);

    return RowsetModel;

}));
