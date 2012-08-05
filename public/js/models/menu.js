define([
    'Underscore',
    'Backbone',
    'event-aggregator'
], function (_, Backbone, eventAggregator) {
    var MenuModel = Backbone.Model.extend({

        initialize: function () {

        },

        save: function () {
            eventAggregator.trigger("menu:save" );
        },

        load: function () {

        }
    });

    return MenuModel;
});