var express = require('express');
var router = express.Router();
var data =  require('../models/data');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Zemoga test', data: data });
});

module.exports = router;
