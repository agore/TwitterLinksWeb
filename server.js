var express = require("express");
var app = express();
var pug = require('pug');
var https = require("https");
//var http = require("http");
var momentTz = require("moment-timezone");
var urlParser = require("url");
var parser = require("json-bigint");

app.set("port", (process.env.PORT || 3000));
app.set("view engine", "pug");
app.use("/js", express.static( __dirname + '/views/js'));
app.get("/", function(request, response) {
    //http.get("http://localhost:5000/tweets/all", function(res) {
    https.get("https://fierce-river-4730.herokuapp.com/tweets/all?count=50", function(res) {
        var responseString = "";
        res.on("data", function(d) {
            //resp.render("index", {"tweets": d});
            responseString += d;
        });

        res.on("end", function() {
 //           process.stdout.write(responseString);
//            response.status(200).json(JSON.parse(responseString));
            var tweets = parser.parse(responseString);
            tweets.forEach(function(item) {
                item.ts = momentTz.tz(item.ts, "America/New_York").format("MM/DD/YYYY hh:mm a")
            });
            console.log(tweets);
            response.render("index", {tweets: tweets});
        });
    }).end();
});

app.get("/more", function(request, response) {
    var parts = urlParser.parse(request.url, true).query;
    //console.log("count : " + parts.count);
    //console.log("older: " + parts.older_than_id);
    https.get("https://fierce-river-4730.herokuapp.com/tweets/all?count=" + parts.count + "&older_than_id=" + parts.older_than_id, function(res) {
        var responseString = "";
        res.on("data", function(d) {
            responseString += d;
        });

        res.on("end", function() {
            response.send(responseString);
        });
    });
});

var server = app.listen(app.get("port"), function() {
    //console.log("Server running on port ", app.get("port"));
});

