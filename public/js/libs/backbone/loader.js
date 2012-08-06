define(['order!libs/jquery/jquery-min', 'order!libs/underscore/underscore-min', 'order!libs/backbone/backbone-min', 'order!libs/jquery-ui/jquery-ui-1.8.22.custom.min'],
function () {
    return {
        Backbone: Backbone.noConflict(),
        _: _.noConflict(),
        $: jQuery.noConflict()
    };
});