
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongodb = require('mongodb');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/sprite', function (req, res) {
    console.log('save requested..');

    var mongo;
    if (process.env.VCAP_SERVICES) {
        var env = JSON.parse(process.env.VCAP_SERVICES);
        mongo = env['mongodb-2.0'][0]['credentials'];
    }
    else {
        mongo = {
            "hostname": "localhost",
            "port": 27017,
            "username": "",
            "password": "",
            "name": "",
            "db": "spritewhale"
        }
    }

    var generate_mongo_url = function (obj) {
        obj.hostname = (obj.hostname || 'localhost');
        obj.port = (obj.port || 27017);
        obj.db = (obj.db || 'test');

        if (obj.username && obj.password) {
            return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
        else {
            return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
    }

    var mongourl = generate_mongo_url(mongo);
    console.log('database url: ' + mongourl);

    console.log('creating database object...');
    mongodb.connect(mongourl, function (err, conn) {
        conn.collection('sprites', function (err, coll) {

            console.log('writting document to database...');
            coll.insert(req.body, { safe: true }, function (err) {
                console.log('document saved...');
                /*res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });*/

                res.send({ result: 'success', id: 1 });
            });
        });
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
