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
        },

        events: {
            "click li": "select"
        },

        render: function () {
            var data = {
                toolbar: this.model.toJSON().data,
                _: _
            };

            var compiledTemplate = _.template(toolbarViewTemplate, data);
            $(this.el).html(compiledTemplate);
            return this;
        },

        select: function (ev) {
            var col = $(ev.target).val();
            this.model.selectColor(col);
        }
    });
    return new ToolbarView;
});