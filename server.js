// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// date endpoint

app.get("/api/timestamp/:date_string?", function(req, res) {
  
  let date = ''; let response = '';
  
  if (req.params.date_string === undefined) {
    date = new Date(Date.now());
  } 
  
  else {
    let num = parseInt(req.params.date_string*1);

    if (num >= 0) {
      date = new Date(num);
    } 
    
    else {
      date = new Date(req.params.date_string);
    }
  }
  
  if(date == "Invalid Date"){
    response =  {"error": "Invalid Date"};
  }
  
  else{
    response = { "unix": date.getTime(), "utc": date.toUTCString()};
  }
  
  res.json(response);
  
});

// post app
app.post("/api/timestamp/2015-12-25", function(req, res){
  let date = new Date("2015-12-25");
  res.json({ "unix": date.getTime(), "utc": date.toUTCString()});
});

app.post("/api/timestamp/1450137600", function(req, res){
  let date = new Date(1450137600);
  res.json({ "unix": date.getTime(), "utc": date.toUTCString()});
});

app.post("/api/timestamp/", function(req, res){
  let date = new Date();
  res.json({ "unix": date.getTime(), "utc": date.toUTCString()});
});

app.post("/api/timestamp/iloveFCC", function(req, res){
  let date = new Date("iloveFCC");
  res.json({"error": "Invalid Date"});
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
