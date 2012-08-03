define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/palette/palette-view',
  'views/tools/toolbar-view',
  'text!templates/home/main.html'
], function ($, _, Backbone, paletteView, toolbarView, mainHomeTemplate) {

    var mainHomeView = Backbone.View.extend({
        el: $("#content"),

        render: function () {
            this.el.html(mainHomeTemplate);

            paletteView.el = $('#palette').get(0);
            paletteView.render();

            toolbarView.el = $('#tools').get(0);
            toolbarView.render();
        }
    });
    return new mainHomeView;
});