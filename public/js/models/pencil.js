define([
    'Underscore',
    'Backbone',
    'event-aggregator'
], function (_, Backbone, eventAggregator) {
    var PencilModel = Backbone.Model.extend({
        initialize: function () {
            this.primaryPaletteIndex = 1;
            this.alternatePaletteIndex = 0;
            this.color = '#FFFFFF';
            this.isSelected = true;

            eventAggregator.on("palette:primaryColorSelected", this.onPrimaryColorSelected, this);
            eventAggregator.on("palette:alternateColorSelected", this.onAlternateColorSelected, this);
            eventAggregator.on("canvas:beginApply", this.onBeginApply, this);
            eventAggregator.on("canvas:moveTo", this.onMoveTo, this);
        },

        setPixel: function (d) {
            if (d.action == 0) {
                d.canvas.setPixel(d.point.x, d.point.y, this.primaryPaletteIndex);
            }
            else if (d.action == 1) {
                d.canvas.setPixel(d.point.x, d.point.y, this.alternatePaletteIndex);
            }
        },

        onBeginApply: function (ev) {
            if (!this.isSelected) return;
            this.setPixel(ev);
        },

        onMoveTo: function (ev) {
            if (!this.isSelected) return;
            this.setPixel(ev);
        },

        onPrimaryColorSelected: function (ev) {
            this.primaryPaletteIndex = ev.index;
            this.color = ev.hexval;
            this.trigger('primaryColorSet', { color: this.color });
        },

        onAlternateColorSelected: function (ev) {
            this.alternatePaletteIndex = ev.index;
            this.color = ev.hexval;
            this.trigger('alternateColorSet', { color: this.color });
        }

    });

    return PencilModel;
});