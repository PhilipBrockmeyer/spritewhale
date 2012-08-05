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
            "click #save": "save"
        },

        render: function () {

            var compiledTemplate = _.template(menuViewTemplate);
            $(this.el).html(compiledTemplate);
            return this;
        },

        save: function (ev) {
            this.model.save();
        }
    });
    return MenuView;
});