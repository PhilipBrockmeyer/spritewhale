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
                    { hexval: '#000000', index: 1 },
                    { hexval: '#222222', index: 2 },
                    { hexval: '#444444', index: 3 },
                    { hexval: '#666666', index: 4 },
                    { hexval: '#888888', index: 5 },
                    { hexval: '#BBBBBB', index: 6 },
                    { hexval: '#FFFFFF', index: 7 },
                    { hexval: '#FF0000', index: 8 },
                    { hexval: '#FFFF00', index: 9 },
                    { hexval: '#FFFF00', index: 10 },
                    { hexval: '#FFFF00', index: 11 },
                    { hexval: '#FFFF00', index: 12 },
                    { hexval: '#FFFF00', index: 13 },
                    { hexval: '#FFFF00', index: 14 },
                    { hexval: '#FFFF00', index: 15 },
                    { hexval: '#FFFF00', index: 16 },
                    { hexval: '#FFFF00', index: 17 },
                    { hexval: '#FFFF00', index: 18 },
                    { hexval: '#FFFF00', index: 19 },
                    { hexval: '#FFFF00', index: 20 },
                    { hexval: '#FFFF00', index: 21 },
                    { hexval: '#FFFF00', index: 22 },
                    { hexval: '#FFFF00', index: 23 },
                    { hexval: '#FFFF00', index: 24 },
                    { hexval: '#FFFF00', index: 25 },
                    { hexval: '#FFFF00', index: 26 },
                    { hexval: '#FFFF00', index: 27 },
                    { hexval: '#FFFF00', index: 28 },
                    { hexval: '#FFFF00', index: 29 },
                    { hexval: '#FFFF00', index: 30 },
                    { hexval: '#FFFF00', index: 31 }
                ]
            }

            eventAggregator.trigger('palette:loaded', { data: this.data });
            this.selectColor(0, 1);
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