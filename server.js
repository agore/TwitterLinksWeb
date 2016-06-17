var express = require("express");
var app = express();
var pug = require('pug');
var https = require("https");

app.set("view engine", "pug");
var options = {
    hostname : "fierce-river-4730.herokuapp.com",
    port : 443,
    path : "/tweets/all?count=5"
}

/*
var tweets = [
    {"t" : "test 1"}, {"t" : "test 2"}
];
*/

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
            response.render("index", {tweets: JSON.parse(responseString)});
        });
    }).end();
});

var server = app.listen(3000, function() {
    console.log("Server running on port 3000");
});
