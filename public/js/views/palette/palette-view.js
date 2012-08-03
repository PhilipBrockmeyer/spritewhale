define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/palette',
  'text!templates/palette/palette-view.html'
], function ($, _, Backbone, PaletteModel, paletteViewTemplate) {

    var PaletteView = Backbone.View.extend({
        initialize: function () {
            this.model = new PaletteModel();
        },

        events: {
            "click li": "select"
        },

        render: function () {
            var data = {
                palette: this.model.toJSON().data,
                _: _
            };

            var compiledTemplate = _.template(paletteViewTemplate, data);
            $(this.el).html(compiledTemplate);

            $(this.el).find('li').each(function () {
                var col = $(this).text();

                $(this).text('')
                       .css({ 'background-color': col });
            })

            return this;
        },

        select: function (ev) {
            var col = $(ev.target).val();
            this.model.selectColor(col);
        }
    });
    return new PaletteView;
});