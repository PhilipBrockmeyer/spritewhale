define([
    'Underscore',
    'Backbone',
    'event-aggregator'
], function (_, Backbone, eventAggregator) {
    var FillModel = Backbone.Model.extend({
        initialize: function () {
            this.paletteIndex = 1;
            this.color = '#000000';
            this.isSelected = false;

            eventAggregator.on("palette:primaryColorSelected", this.onPrimaryColorSelected, this);
            eventAggregator.on("canvas:beginApply", this.onBeginApply, this);
        },

        fillPixels: function (d) {
            var paletteIndex = 0;

            if (d.action == 0) {
                paletteIndex = this.paletteIndex;
            } else {
                return;
            }


            var visitedPixels = new Array();
            var pixelsToVisit = new Array();
            var nextIndex = 0;
            var paintedPaletteIndex = d.data.pixels[d.point.x + d.point.y * d.data.height];

            pixelsToVisit.push({ x: d.point.x, y: d.point.y });

            while (nextIndex < pixelsToVisit.length) {
                var pixel = pixelsToVisit[nextIndex];
                visitedPixels.push(pixel);

                d.canvas.setPixel(pixel.x, pixel.y, paletteIndex);

                this.queuePixelIfRequired(visitedPixels, pixelsToVisit, pixel.x + 1, pixel.y, d.data, paintedPaletteIndex);
                this.queuePixelIfRequired(visitedPixels, pixelsToVisit, pixel.x - 1, pixel.y, d.data, paintedPaletteIndex);
                this.queuePixelIfRequired(visitedPixels, pixelsToVisit, pixel.x, pixel.y + 1, d.data, paintedPaletteIndex);
                this.queuePixelIfRequired(visitedPixels, pixelsToVisit, pixel.x, pixel.y - 1, d.data, paintedPaletteIndex);
                nextIndex++;
            }
        },

        queuePixelIfRequired: function (visited, queue, x, y, canvasData, paintedPaletteIndex) {
            if (x < 0 || x >= canvasData.width)
                return;

            if (y < 0 || y >= canvasData.height)
                return;

            if (canvasData.pixels[x + y * canvasData.width] != paintedPaletteIndex)
                return;

            if (!_.any(visited, function (p) { return p.x == x && p.y == y; })) {
                if (!_.any(queue, function (p) { return p.x == x && p.y == y; })) {
                    queue.push({ x: x, y: y });
                }
            }
        },

        onBeginApply: function (ev) {
            if (!this.isSelected) return;
            this.fillPixels(ev);
        },

        onPrimaryColorSelected: function (ev) {
            this.paletteIndex = ev.index;
            this.color = ev.hexval;
            this.trigger('primaryColorSet', { color: this.color });
        }

    });

    return FillModel;
});