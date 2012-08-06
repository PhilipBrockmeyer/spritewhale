define([
  'jQuery',
  'Underscore',
  'Backbone',
  'event-aggregator',
  'models/palette',
  'text!templates/palette/palette-view.html'
], function ($, _, Backbone, eventAggregator, PaletteModel, paletteViewTemplate) {

    var PaletteView = Backbone.View.extend({
        initialize: function () {
            this.model = new PaletteModel();
            eventAggregator.on('palette:created', this.onPaletteLoaded, this);
        },

        events: {
            "mousedown li": "onClick"
        },

        render: function () {
            if (!this.model.data)
                return;

            var data = {
                palette: this.model.data,
                _: _
            };

            var compiledTemplate = _.template(paletteViewTemplate, data);
            $(this.el).html(compiledTemplate);
            
            return this;
        },

        onClick: function (ev) {
            var col = $(ev.target).val();

            if (ev.which === 1) this.model.selectColor(0, col);
            if (ev.which === 3) this.model.selectColor(1, col);
        },

        onPaletteLoaded: function (ev) {
            this.render();
        }
    });
    return PaletteView;
});