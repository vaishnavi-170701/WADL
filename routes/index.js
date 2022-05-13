var express = require('express')
var app = express()
var ObjectId = require('mongodb').ObjectId

app.get('/', function(req, res) {
	// render to views/index.ejs template file
	res.render('index', {title: 'My Node.js Application'})
})
module.exports = app;

