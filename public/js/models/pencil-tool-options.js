define([
    'Underscore',
    'Backbone'
], function (_, Backbone) {
    var PencilToolOptionsModel = Backbone.Model.extend({
        initialize: function () {
            this.paletteIndex = 0;
            this.color = '#FFFFFF';
        },

        setColor: function (paletteIndex, color) {
            this.paletteIndex = paletteIndex;
            this.color = color;
        }
    });

    return PencilToolOptionsModel;
});