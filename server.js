var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");

var mysql = require("mysql");
 


var connection = mysql.createConnection({
  host: "a07yd3a6okcidwap.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,

  // Your username
  user: "txlf37jpmrxdpgpb",

  // Your password
  password: "yuars8cd1h39jw0k",
  database: "cxsl9gryw3jcio1f"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use('/public', express.static('public'));

//app.use(express.static(process.cwd() + "/public"));

var players = [];


app.get("/", function(req, res) {

  res.sendFile(path.join(__dirname, "/public/index.html"));

});

app.get("/players", function(req, res) {

  connection.query("SELECT * FROM players", {
}, function(err, res) {
  players = [];

  for (var i = 0; i < res.length; i++) {
    players.push(res[i]);
   }
    console.log(players);

});
  return res.json(players);

});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});