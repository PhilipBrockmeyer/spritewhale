define([
  'jQuery',
  'Underscore',
  'Backbone',
  'event-aggregator',
  'models/fill',
  'text!templates/tools/fill-view.html'
], function ($, _, Backbone, eventAggregator, FillModel, fillViewTemplate) {

    var PencilView = Backbone.View.extend({
        initialize: function () {
            this.model = new FillModel();
            eventAggregator.on("toolbar:toolSelected", this.select, this);
            this.model.on("primaryColorSet", this.onPrimaryColorSelected, this);
            this.model.on("alternateColorSet", this.onAlternateColorSelected, this);
        },

        events: {

        },

        render: function () {
            var compiledTemplate = _.template(fillViewTemplate, {});
            this.$el.html(compiledTemplate);
            this.setColor(this.$el.find('.fill-color').get(0), this.model.color);

            return this;
        },

        select: function (ev) {
            if (ev.tool.name != 'fill') {
                this.model.isSelected = false;
                return false;
            }

            this.model.isSelected = true;
            this.render();
        },

        setColor: function (el, color) {
            if (color) {
                $(el).css('background-color', color)
                     .css('background-image', "");
            } else {
                $(el).css('background-color', "")
                     .css('background-image', "url('imgs/transparent.png')")
                     .css('background-repeat', 'repeat');
            }
        },

        onPrimaryColorSelected: function (ev) {
            this.setColor(this.$el.find('.fill-color').get(0), ev.color);
        },
    });

    return PencilView;
});