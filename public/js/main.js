require.config({
    paths: {
        loader: 'libs/backbone/loader',
        jQuery: 'libs/jquery/jquery',
        jQueryUI: 'libs/jquery-ui/jquery-ui',
        Underscore: 'libs/underscore/underscore',
        Backbone: 'libs/backbone/backbone',
        templates: '../templates'
    }
});

require([
  'app',
], function (App) {
    App.initialize();
});