var request = require('request');

const apiKey = process.env.NEWS_API_KEY || "73930ae77d0d4ebaae0b7db2cc74b0f5";
const query = "Coronavirus";
const date = "2020-05-28";
const sortBy = "popularity";
const newsURL = "http://newsapi.org/v2/everything?";
// http://newsapi.org/v2/everything?q=Coronavirus&from=2020-05-28&sortBy=popularity&apiKey=
var news = {
    find: function(req, res, next){
        request(newsURL 
            + "q=" + query
            + "&from=" + date
            + "sortBy=" + sortBy
            + "&apiKey=" + apiKey,
            function(error, response, body){
                if(!error && response.statusCode == 200){
                    response = JSON.parse(body);
                    res.send(response);
                }else{
                    console.log(response.statusCode + response.body);
                    res.send({news: -1});
                }
            }
        );
    }
};

module.exports = news;