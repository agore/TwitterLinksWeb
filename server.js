var express = require("express");
var app = express();
var pug = require('pug');
var https = require("https");
var df = require("dateformat");

app.set("port", (process.env.PORT || 3000));
app.set("view engine", "pug");
app.get("/", function(request, response) {
    https.get("https://fierce-river-4730.herokuapp.com/tweets/all", function(res) {
        var responseString = "";
        res.on("data", function(d) {
            //resp.render("index", {"tweets": d});
            responseString += d;
        });

        res.on("end", function() {
 //           process.stdout.write(responseString);
//            response.status(200).json(JSON.parse(responseString));
            var tweets = JSON.parse(responseString);
            tweets.forEach(function(item) {
                item.ts = df(item.ts, "mm/dd/yyyy h:MM TT");
            });
//            console.log(tweets);
            response.render("index", {tweets: tweets});
        });
    }).end();
});


var server = app.listen(app.get("port"), function() {
    console.log("Server running on port ", app.get("port"));
});

