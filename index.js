var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var app = express();
var cors = require("cors");
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get("/", function (req, res) {
  url = "https://www.60secondsnow.com/amphtml/gu";

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var newsArray = [];

      const post_length = $("div.post-container").children().length;

      $("div.post-container").map((i, item) => {
        let json = { heading: "", description: "", image: "", sourcelink: "" };

        $(".post-container")
          .eq(i)
          .find(".article-content")
          .find("h2")
          .filter(function () {
            var data = $(this);
            heading = data.text();
            json.heading = heading;
          });

        $(".post-container")
          .eq(i)
          .find(".article-desc")
          .find("p")
          .filter(function () {
            var data = $(this);
            description = data.text();
            json.description = description;
          });
        $(".post-container")
          .eq(i)
          .find(".article-img")
          .find("amp-img")
          .filter(function () {
            var data = $(this);
            image = data.attr("src");
            json.image = image;
          });
          
           $(".post-container")
          .eq(i)
          .find(".article-provider")
          .find(".article-amp-provider")
          .find("a")
          .filter(function () {
            var data = $(this);
            image = data.attr("href");
            json.sourcelink = sourcelink;
          });
          

        newsArray.push(json);
      });
    }

    res.send(newsArray);
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
