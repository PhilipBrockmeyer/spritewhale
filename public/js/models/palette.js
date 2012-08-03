define([
    'Underscore',
    'Backbone'
], function (_, Backbone) {
    var PaletteModel = Backbone.Model.extend({
        defaults: {
            data: {
                name: 'Default',
                colors: [
                    { hexval: '#FFFFFF', index: 0 },
                    { hexval: '#000000', index: 1 },
                    { hexval: '#FF0000', index: 2 },
                    { hexval: '#00FF00', index: 3 },
                    { hexval: '#0000FF', index: 4 },
                    { hexval: '#FFFF00', index: 5 }
                ]
            }
        },

        initialize: function () {
            this.selectedIndex = 0;
        },

        selectColor: function (index) {
            this.selectedIndex = index;
            Backbone.Events.trigger("palette:colorSelected", { index: selectedIndex, hexvalue: data.colors[index] });
        }
    });

    return PaletteModel;
});