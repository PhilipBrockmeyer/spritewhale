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
                    { hexval: '#330000', index: 8 },
                    { hexval: '#770000', index: 9 },
                    { hexval: '#BB0000', index: 10 },
                    { hexval: '#FF0000', index: 11 },
                    { hexval: '#003300', index: 12 },
                    { hexval: '#007700', index: 13 },
                    { hexval: '#00BB00', index: 14 },
                    { hexval: '#0FF000', index: 15 },
                    { hexval: '#000033', index: 16 },
                    { hexval: '#000077', index: 17 },
                    { hexval: '#0000BB', index: 18 },
                    { hexval: '#0000FF', index: 19 },
                    { hexval: '#333300', index: 20 },
                    { hexval: '#777700', index: 21 },
                    { hexval: '#BBBB00', index: 22 },
                    { hexval: '#FFFF00', index: 23 },
                    { hexval: '#003333', index: 24 },
                    { hexval: '#007777', index: 25 },
                    { hexval: '#00BBBB', index: 26 },
                    { hexval: '#00FFFF', index: 27 },
                    { hexval: '#330033', index: 28 },
                    { hexval: '#770077', index: 29 },
                    { hexval: '#BB00BB', index: 30 },
                    { hexval: '#FF00FF', index: 31 }
                ]
            }

            eventAggregator.trigger('palette:created', { data: this.data });
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