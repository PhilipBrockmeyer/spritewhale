define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/menu',
  'text!templates/home/menu-view.html'
], function ($, _, Backbone, MenuModel, menuViewTemplate) {

    var MenuView = Backbone.View.extend({
        initialize: function () {
            this.model = new MenuModel();
            this.model.initialize();
        },

        events: {
            "click #menu-new": "create",
            "click #menu-save": "save",
            "click #menu-load": "load"
        },

        render: function () {

            var compiledTemplate = _.template(menuViewTemplate);
            $(this.el).html(compiledTemplate);
            return this;
        },

        create: function (ev) {
            this.model.create();
        },

        save: function (ev) {
            this.model.save();
        },

        load: function (ev) {
            this.model.load();
        }
    });
    return MenuView;
});