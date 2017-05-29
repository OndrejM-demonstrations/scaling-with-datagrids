/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var rootDir = path.join(__dirname, path.join("..", "static-resources"));
if (!fs.existsSync(rootDir)) {
    var rootDir = __dirname + "/../../../target/static-resources";
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// static files
app.use('/app', express.static(path.join(rootDir, 'app')));
app.use('/assets', express.static(path.join(rootDir, 'assets')));
app.get('/*', function (req, res) {
    res.sendfile(path.join(rootDir, 'index.html'));
});

// START THE SERVER
// =============================================================================

//startServer();
testHz();

function startServer() {
    app.listen(port);
    console.log('Magic happens on port ' + port);
}

function testHz() {
    var HazelcastClient = require('hazelcast-client').Client;
    var Config = require('hazelcast-client').Config;
    var config = new Config.ClientConfig();
    config.networkConfig.addresses = [
        {host: '127.0.0.1', port: '5900'},
        {host: '127.0.0.1', port: '5901'},
        {host: '127.0.0.1', port: '5902'}];
    config.groupConfig.name = "development";
    config.groupConfig.password = "D3v3l0pm3nt";
    var map = {};
    HazelcastClient
            .newHazelcastClient(config)
            .then(function (hazelcastClient) {
                map = hazelcastClient.getMap("cachedSchedules");
                return map.size();
                // do stuff with map
            })
            .then(function (size) {
                console.log("Map size: " + size);
                return map.keySet();
            })
            .then(function (keySet) {
                console.log("keys: " + keySet);
                return map.values();
            })
            .then(function (values) {
                console.log("Values: " + values);
            })
            ;

}