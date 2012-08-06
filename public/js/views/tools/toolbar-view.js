define([
  'jQuery',
  'Underscore',
  'Backbone',
  'event-aggregator',
  'models/toolbar',
  'text!templates/tools/toolbar-view.html'
], function ($, _, Backbone, eventAggregator, ToolBarModel, toolbarViewTemplate) {

    var ToolbarView = Backbone.View.extend({
        initialize: function () {
            this.model = new ToolBarModel();
            this.model.initialize();

            eventAggregator.on("image:create", this.onImageCreated, this);
        },

        events: {
            "click li": "select"
        },

        render: function () {
            var data = {
                toolbar: this.model.data,
                _: _
            };

            var compiledTemplate = _.template(toolbarViewTemplate, data);
            $(this.el).html(compiledTemplate);
            return this;
        },

        onImageCreated: function (ev) {
            this.render();
        },

        select: function (ev) {
            var index = $(ev.target).closest('li').attr('val');
            this.model.selectTool(index);
        }
    });
    return ToolbarView;
});