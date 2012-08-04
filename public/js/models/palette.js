define([
    'Underscore',
    'Backbone',
    'event-aggregator'
], function (_, Backbone, eventAggregator) {
    var PaletteModel = Backbone.Model.extend({

        initialize: function () {
            eventAggregator.on("image:create", this.onImageCreated, this);
        },

        reset: function () {
            this.data = {
                name: 'Default',
                colors: [
                    { hexval: undefined, index: 0 },
                    { hexval: '#FFFFFF', index: 1 },
                    { hexval: '#000000', index: 2 },
                    { hexval: '#FF0000', index: 3 },
                    { hexval: '#00FF00', index: 4 },
                    { hexval: '#0000FF', index: 5 },
                    { hexval: '#FFFF00', index: 6 }
                ]
            }

            eventAggregator.trigger('palette:loaded', { data: this.data });
            this.selectColor(0, 2);
            this.selectColor(1, 0);
        },

        selectColor: function (slot, index) {
            if (slot == 0) {
                this.primarySelectedIndex = index
                eventAggregator.trigger("palette:primaryColorSelected", { index: index, hexval: this.data.colors[index].hexval });
            }
            else if (slot == 1) {
                this.alternateSelectedIndex = index
                eventAggregator.trigger("palette:alternateColorSelected", { index: index, hexval: this.data.colors[index].hexval });
            }
        },

        onImageCreated: function (ev) {
            this.reset();
        }
    });

    return PaletteModel;
});