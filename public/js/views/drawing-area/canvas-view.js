define([
  'jQuery',
  'Underscore',
  'Backbone',
  'event-aggregator',
  'models/canvas'
], function ($, _, Backbone, eventAggregator, CanvasModel) {

    var CanvasView = Backbone.View.extend({
        initialize: function () {
            this.leftButtonDown = false;
            this.rightButtonDown = false;
            this.model = new CanvasModel();

            eventAggregator.on("canvas:pixelSet", this.onPixelSet, this);
            eventAggregator.on("canvas:pixelErased", this.onPixelErased, this);
            eventAggregator.on("canvas:imageRefreshed", this.onImageRefreshed, this);
        },

        events: {
            "mousemove": "onMouseMove",
            "mousedown": "onMouseDown",
            "mouseup": "onMouseUp"
        },

        render: function () {
            this.$el.html('<canvas oncontextmenu="return false;" height="512" width="512"></canvas>');

            this.ctx = this.$el.find('canvas').get(0).getContext("2d");

            this.transparentImage = document.createElement("img");
            this.transparentImage.src = "imgs/transparent.png";

            var that = this;

            this.transparentImage.onload = function () {
                that.patternRepeat = that.ctx.createPattern(that.transparentImage, "repeat");
                that.ctx.fillStyle = that.patternRepeat;
                that.ctx.fillRect(0, 0, 16 * 32, 16 * 32);
                that.drawGrid();
            }

            return this;
        },

        drawGrid: function () {
            this.ctx.strokeStyle = '#333333';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();

            for (x = 0; x < this.model.data.width; x++) {
                this.ctx.moveTo(x * this.model.zoom, 0);
                this.ctx.lineTo(x * this.model.zoom, this.model.data.height * this.model.zoom);
            }

            for (y = 0; y < this.model.data.height; y++) {
                this.ctx.moveTo(0, y * this.model.zoom);
                this.ctx.lineTo(this.model.data.width * this.model.zoom, y * this.model.zoom);
            }

            this.ctx.stroke();
        },

        getPixelCoordinate: function (x, y) {
            var pixelX = Math.floor((x - this.$el.find('canvas').offset().left) / this.model.zoom);
            var pixelY = Math.floor((y - this.$el.find('canvas').offset().top) / this.model.zoom);

            return { x: pixelX, y: pixelY };
        },

        drawPixel: function (point, color) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(point.x * this.model.zoom + 1, point.y * this.model.zoom + 1, this.model.zoom - 1, this.model.zoom - 1);
        },

        erasePixel: function (point) {
            this.ctx.fillStyle = this.patternRepeat;
            this.ctx.fillRect(point.x * this.model.zoom + 1, point.y * this.model.zoom + 1, this.model.zoom - 1, this.model.zoom - 1);
        },

        onMouseMove: function (ev) {
            if (!this.model.zoom)
                return;

            if (!this.leftButtonDown && !this.rightButtonDown)
                return;

            var point = this.getPixelCoordinate(ev.pageX, ev.pageY);
            if (point.x < 0 || point.x >= this.model.data.width) return;
            if (point.y < 0 || point.y >= this.model.data.height) return;

            if (this.leftButtonDown) {
                this.model.moveTo(0, this.getPixelCoordinate(ev.pageX, ev.pageY));
            }

            if (this.rightButtonDown) {
                this.model.moveTo(1, this.getPixelCoordinate(ev.pageX, ev.pageY));
            }
        },

        onMouseDown: function (ev) {
            if (!this.model.zoom)
                return;

            if (ev.which === 1) this.leftButtonDown = true;
            if (ev.which === 3) this.rightButtonDown = true;

            var point = this.getPixelCoordinate(ev.pageX, ev.pageY);
            if (point.x < 0 || point.x >= this.model.data.width) return;
            if (point.y < 0 || point.y >= this.model.data.height) return;

            if (!this.leftButtonDown && !this.rightButtonDown)
                return;

            if (this.leftButtonDown) {
                this.model.beginApply(0, this.getPixelCoordinate(ev.pageX, ev.pageY));
            }

            if (this.rightButtonDown) {
                this.model.beginApply(1, this.getPixelCoordinate(ev.pageX, ev.pageY));
            }
        },

        onMouseUp: function (ev) {
            if (!this.model.zoom)
                return;

            if (ev.which === 1) this.leftButtonDown = false;
            if (ev.which === 3) this.rightButtonDown = false;
        },

        onClick: function (ev) {
        },

        onPixelSet: function (ev) {
            this.drawPixel(ev.point, ev.color);
        },

        onPixelErased: function (ev) {
            this.erasePixel(ev.point);
        },

        onImageRefreshed: function (ev) {
            this.render();

            var index = 0;

            for (x = 0; x < ev.width; x++) {
                for (y = 0; y < ev.height; y++) {
                    var col = ev.pixels[index];

                    if (col) {
                        this.drawPixel({ x: x, y: y }, col)
                    } else {
                        this.erasePixel({ x: x, y: y });
                    }
                    index++;
                }
            }

            this.drawGrid();
        }
    });

    return CanvasView;
});