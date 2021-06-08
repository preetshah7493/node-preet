var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var app = express();
var cors = require("cors");
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get("/", function (req, res) {
  url = "https://www.instagram.com/p/CP3IvPOnloG/";

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var newsArray = [];

      const post_length = $("meta").children().length;

     
        let json = { heading: "", description: "", image: "", sourcelink: "", sourcename: "" };

       
      
        $(".meta")
          .find("og:type")
          .filter(function () {
            var data = $(this);
            contenttype = data.attr("content");
            json.contenttype = contenttype;
          });
      
        
          
   

        newsArray.push(json);
  
    }

    res.send(newsArray);
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
