var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Routes
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.npr.org/").then(function(response){
      console.log(response);
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      $(".title").each(function(i, element){
        var result = {};
        
        result.title = $(this).text();
        console.log(result);
      });

      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
    
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});