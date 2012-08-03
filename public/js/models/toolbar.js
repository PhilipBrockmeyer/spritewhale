define([
    'Underscore',
    'Backbone'
], function (_, Backbone) {
    var ToolbarModel = Backbone.Model.extend({
        defaults: {
            data: {
                tools: [
                    { name: 'pencil', img: 'pencil.png' },
                    { name: 'fill', img: 'fill.png' },
                ]
            }
        },

        initialize: function () {
            this.selectedTool = 'pencil';
        },

        selectTool: function (tool) {
            this.selectedTool = tool;
            Backbone.Events.trigger("toolbar:toolselected", { selectedTool: this.selectedTool });
        }
    });

    return ToolbarModel;
});