define([
    'jQuery',
    'Underscore',
    'Backbone',
    'event-aggregator'
], function ($, _, Backbone, eventAggregator) {
    var CanvasModel = Backbone.Model.extend({

        initialize: function () {
            eventAggregator.on('palette:loaded', this.onPaletteLoaded, this);
            eventAggregator.on('image:create', this.onImageCreated, this);
            eventAggregator.on('menu:save', this.onSave, this);

            this.data =
            {
                width: 16,
                height: 16
            };
        },

        beginApply: function (action, point) {
            eventAggregator.trigger("canvas:beginApply", { action: action, point: point, data: this.data, canvas: this });
        },

        moveTo: function (action, point) {
            eventAggregator.trigger("canvas:moveTo", { action: action, point: point, data: this.data, canvas: this });
        },

        setPalette: function (paletteData) {
            this.paletteData = paletteData;
        },

        setPixel: function (x, y, paletteIndex) {
            this.data.pixels[y * this.data.width + x] = paletteIndex;

            if (paletteIndex > 0) {
                eventAggregator.trigger("canvas:pixelSet", { point: { x: x, y: y }, color: this.paletteData.colors[paletteIndex].hexval });
            } else {
                eventAggregator.trigger("canvas:pixelErased", { point: { x: x, y: y} });
            }
        },

        refresh: function () {
            if (typeof this.paletteData === "undefined") return;

            var that = this;
            var pixels =
                _.map(this.data.pixels,
                      function (index) {
                          return that.paletteData.colors[index].hexval
                      });

            pixels = _.toArray(pixels);

            eventAggregator.trigger("canvas:imageRefreshed",
                {
                    width: this.data.width,
                    height: this.data.height,
                    pixels: pixels
                });
        },

        erasePixel: function (x, y) {
            this.data.pixels[y * this.data.width + x] = 0;
            eventAggregator.trigger("canvas:pixelErased", { point: { x: x, y: y} });
        },

        onPaletteLoaded: function (ev) {
            this.setPalette(ev.data);
            this.refresh();
        },

        onImageCreated: function (ev) {
            this.data =
            {
                width: 16,
                height: 16,

                pixels: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]
            };

            this.zoom = 32;
            this.refresh();
        },

        onSave: function (ev) {
            $.ajax({
                type: 'POST',
                url: '/sprite',
                data: this.data,
                success: function (ev) { },
                dataType: 'json'
            });
        }
    });

    return CanvasModel;
});