define([
    'Underscore',
    'Backbone',
    'event-aggregator',
    'models/pencil',
    'models/fill'
], function (_, Backbone, eventAggregator, PencilModel, FillModel) {
    var ToolbarModel = Backbone.Model.extend({
        
        initialize: function () {
            this.data =
                {
                    tools: [
                        { index: 0, name: 'pencil', img: 'pencil.png' },
                        { index: 1, name: 'fill', img: 'fill.png' },
                    ]
                };

            this.selectTool(0);
        },

        selectTool: function (index) {
            this.selectedTool = index;
            eventAggregator.trigger("toolbar:toolSelected", { "tool": this.data.tools[index] });
        }
    });

    return ToolbarModel;
});