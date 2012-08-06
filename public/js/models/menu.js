define([
    'Underscore',
    'Backbone',
    'event-aggregator'
], function (_, Backbone, eventAggregator) {
    var MenuModel = Backbone.Model.extend({

        initialize: function () {

        },

        create: function () {
            eventAggregator.trigger("image:create", { name: 'untitled', width: 16, height: 16 } );
        },

        save: function () {
            eventAggregator.trigger("menu:save");
        },

        load: function () {

        }
    });

    return MenuModel;
});