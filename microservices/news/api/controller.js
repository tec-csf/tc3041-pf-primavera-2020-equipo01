'use strict';

var news = require('../service/news');

var controllers = {
    getNews: function(req, res){
        news.find(req, res, function(err, news) {
            if(err){
                res.send(err);
            }
            res.json(news);
        });
    },
};

module.exports = controllers;