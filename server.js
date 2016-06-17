var express = require("express");
var app = express();
var pug = require('pug');
var https = require("https");

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
            response.render("index", {tweets: JSON.parse(responseString)});
        });
    }).end();
});


var server = app.listen(app.get("port"), function() {
    console.log("Server running on port ", app.get("port"));
});

