define([
    'Underscore',
    'Backbone',
    'event-aggregator',
    'models/pencil'
], function (_, Backbone, eventAggregator, PencilModel) {
    var ToolbarModel = Backbone.Model.extend({
        
        initialize: function () {
            this.data =
                {
                    tools: [
                        { index: 0, name: 'pencil', img: 'pencil.png', model: new PencilModel() },
                        { index: 1, name: 'fill', img: 'fill.png', model: new PencilModel() },
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