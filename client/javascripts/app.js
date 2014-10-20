// Include external libs.
var $ = require("jquery"),
    Backbone = require("backbone"),
    debug = require("debug");

// The app logger
var logger = debug("app");

// Backbone-jQuery shim. Backbone doesn't support jQuery if used browesrify,
// couse of that is part of backbone's code:
// ```javascript
//     // Next for Node.js or CommonJS. jQuery may not be needed as a module.
//     ...
//     factory(root, exports, _);
// ```
// We should to expand Backbone by knowlarge of the jQuery.
Backbone.$ = $;

// Collection of the models
var RowsetCollection = require("./collections/rowset");

// Mainly view
var TableView = require("./views/table");

(function(global) {

    // Turnon debug
    debug.enable("*");

    // Declare an content-wrapper element to be used for a views render
    // result inserting.
    var resultElement = $(".result-table");

    // Client-side application.
    var App = module.exports = global.App = {};

    // Backbone collection contains number of models.
    var rowsets = App.rowsets = new RowsetCollection();

    // Create table view to display data of collection.
    var tableView = new TableView({
        collection: rowsets
    });

    // Getting expected class name of the element from view.
    var viewClassName = tableView.className;

    // Finding element by class on the resultElement.
    var viewElement = resultElement.find("." + viewClassName);

    if (viewElement.size() === 0) {
        // View element is apsent in resultElement. Then render view
        // immediately. The result of view.render write down into `$el`
        // variable.
        viewElement = tableView.render().$el;

        // Appending obtained DOM structure into the content-wrapper element.
        // After that element will be refreshed by view any time
        // collection changed.
        viewElement.appendTo(resultElement);

        logger("View's element (%o) created and appended.", viewElement.get(0));

        // The view"s element not founded and collection obviously blank. That"s
        // why fetching collection data from server.
        logger("Fetching RowsetCollection (%o) collection.", rowsets);
        rowsets.fetch();

    } else {
        // View"s element founded in resultElement. Delegate element to view.
        tableView.setElement(viewElement);

        logger("View's element (%o) founded on resultElement.", viewElement.get(0));

        // Somehow need to realize silence fetching, without triggering any
        // events e.g.`request`, `sync` or `add` as well.
        // rowsets.fetch();
    }

})(window);
