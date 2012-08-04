define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/toolbar',
  'text!templates/tools/toolbar-view.html'
], function ($, _, Backbone, ToolBarModel, toolbarViewTemplate) {

    var ToolbarView = Backbone.View.extend({
        initialize: function () {
            this.model = new ToolBarModel();
            this.model.initialize();
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

        select: function (ev) {
            var index = $(ev.target).closest('li').attr('val');
            this.model.selectTool(index);
        }
    });
    return ToolbarView;
});