var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

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
var PORT = process.env.PORT || 3000;

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

getPlayers(procRes);
setTimeout(function() {
    return res.json(players);
}, 500);


});

function procRes(err, res) {
    players = [];

  for (var i = 0; i < res.length; i++) {
    players.push(res[i]);
   }
}

function getPlayers(callback) {
  connection.query("SELECT * FROM stories", {
}, function(err, res) {

  callback(err, res);

});

  
}

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

app.get("/transfer", function(req, res) {

  res.sendFile(path.join(__dirname, "/public/transfer.html"));

});

app.get("/login", function(req, res) {

  res.sendFile(path.join(__dirname, "/public/login.html"));

});

app.post("/save", function(req, res) {

  var parameters = req.body;
  var team = parameters.team;

  connection.query("UPDATE users SET ? WHERE name = 'admin'", {
      team1: team[0]
  }, function(err, res) {
  console.log("UPDATEed")
});

  connection.query("UPDATE users SET ? WHERE name = 'admin'", {
      team2: team[1]
  }, function(err, res) {
  console.log("UPDATEed")
});

  connection.query("UPDATE users SET ? WHERE name = 'admin'", {
      team3: team[2]
  }, function(err, res) {
  console.log("UPDATEed")
});

  connection.query("UPDATE users SET ? WHERE name = 'admin'", {
      team4: team[3]
  }, function(err, res) {
  console.log("UPDATEed")
});

  connection.query("UPDATE users SET ? WHERE name = 'admin'", {
      team5: team[4]
  }, function(err, res) {
  console.log("UPDATEed")
});

  connection.query("UPDATE users SET ? WHERE name = 'admin'", {
      team6: team[5]
  }, function(err, res) {
  console.log("UPDATEed")
});

  connection.query("UPDATE users SET ? WHERE name = 'admin'", {
      captain: team[6]
  }, function(err, res) {
  console.log("UPDATEed!")
});


  return res.json(parameters);

});
var team = {
  team:[]
};
app.get("/saved", function(req, res) {

  connection.query("SELECT * FROM users WHERE name='admin'", {
}, function(err, res) {
  team.team = [];
  team.team.push(res[0].team1);
  team.team.push(res[0].team2);
  team.team.push(res[0].team3);
  team.team.push(res[0].team4);
  team.team.push(res[0].team5);
  team.team.push(res[0].team6);
  team.team.push(res[0].captain);
  
});

setTimeout(function() {
  console.log(team.team);
    return res.json(team);
}, 1000);


});

app.get("/rating", function(req, res) {

  res.sendFile(path.join(__dirname, "/public/reytinq.html"));

});

var users = {
list: []
}

app.get("/rate", function(req, res) {
  connection.query("SELECT * FROM users", function(err, res) {
    console.log(res)
    users.list = [];
  for (i=0; i < res.length; i++) {
    var us = {
      name : res[i].name,
      score :res[i].score
    }
    users.list.push(us);
  }

});
   setTimeout(function() {
    return res.json(users);
}, 500);
})

app.get("/signout", function(req, res) {

  res.sendFile(path.join(__dirname, "/public/index.html"));

});