var request = require('request');

const apiKey = process.env.NEWS_API_KEY || "73930ae77d0d4ebaae0b7db2cc74b0f5";
const query = "Coronavirus";
const date = "2020-05-28";
const category = "general";
const sortBy = "popularity";
const newsURL = "http://newsapi.org/v2/top-headlines?";
// http://newsapi.org/v2/top-headlines?q=Coronavirus&from=2020-05-28&category=general&sortBy=popularity&apiKey=73930ae77d0d4ebaae0b7db2cc74b0f5
var news = {
    find: function(req, res, next){
        request(newsURL 
            + "q=" + query
            + "&from=" + date
            + "&category=" + category
            + "&sortBy=" + sortBy
            + "&apiKey=" + apiKey,
            function(error, response, body){
                if(!error && response.statusCode == 200){ // if no error   
                    response = JSON.parse(body);
                    res.send(response.articles);
                }else{
                    console.log(response.statusCode + response.body);
                    res.send({news: -1});
                }
            }
        );
    }
};

module.exports = news;