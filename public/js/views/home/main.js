define([
  'jQuery',
  'Underscore',
  'Backbone',
  'event-aggregator',
  'views/palette/palette-view',
  'views/tools/toolbar-view',
  'views/tools/pencil-view',
  'views/drawing-area/canvas-view',
  'text!templates/home/main.html'
], function ($, _, Backbone, eventAggregator, PaletteView, ToolbarView, PencilView, CanvasView, mainHomeTemplate) {

    var MainHomeView = Backbone.View.extend({
        render: function () {
            this.$el.html(mainHomeTemplate);

            var paletteView = new PaletteView({ el: $('#palette').get(0) });
            var toolbarView = new ToolbarView({ el: $('#tools').get(0) });
            var pencilView = new PencilView({ el: $('#tool-options').get(0) });
            var canvasView = new CanvasView({ el: $('#drawing-area').get(0) });

            paletteView.render();
            toolbarView.render();
            pencilView.render();
            canvasView.render();

            eventAggregator.trigger('image:create', { x: 16, y: 16 });
        }
    });

    return MainHomeView;
});