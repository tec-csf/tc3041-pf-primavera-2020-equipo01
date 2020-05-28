'use strict';

var controller = require('./controller');

module.exports = function(app) {
    app.route('/news')
    .get(controller.getNews);
};
