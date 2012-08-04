define([
  'jQuery',
  'Underscore',
  'Backbone',
  'event-aggregator',
  'models/pencil',
  'text!templates/tools/pencil-view.html'
], function ($, _, Backbone, eventAggregator, PencilModel, pencilViewTemplate) {

    var PencilView = Backbone.View.extend({
        initialize: function () {
            this.model = new PencilModel();
            eventAggregator.on("toolbar:toolSelected", this.select, this);
            this.model.on("primaryColorSet", this.onPrimaryColorSelected, this);
            this.model.on("alternateColorSet", this.onAlternateColorSelected, this);
        },

        events: {

        },

        render: function () {
            var compiledTemplate = _.template(pencilViewTemplate, {});
            this.$el.html(pencilViewTemplate);

            if (this.model.color)
                this.$el.find('#pencil-color').css('background-color', this.model.color);
            return this;
        },

        select: function (ev) {
            if (ev.tool.name != 'pencil') {
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
            this.setColor(this.$el.find('#pencil-primary-color').get(0), ev.color);
        },

        onAlternateColorSelected: function (ev) {
            this.setColor(this.$el.find('#pencil-alternate-color').get(0), ev.color);
        }
    });

    return PencilView;
});