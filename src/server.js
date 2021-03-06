var express = require("express");
var cors = require("cors");
var path = require("path");
var logger = require('morgan');
var bodyParser = require('body-parser');
var smartAuth = require("./smart/auth");
var smartMetadata = require("./smart/metadata");
var reverseProxy = require("./smart/reverse-proxy");
var oauth = require('./smart/oauth-helpers');

var app = express();
module.exports = app;

app.use(cors());
app.use(logger('dev'));

app.use("/api/oauth", smartAuth);
app.use("/api/fhir", smartMetadata);
app.use("/api/fhir", oauth.populateToken, bodyParser.raw({ type: '*/*' }), reverseProxy);
app.use(express.static('static'));


