//jshint esversion:8
var data = [];
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var path = require('path');
var root = __dirname;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(express.json());
app.set('view engine', 'ejs');


function isAuthenticated(req, res, next) {
  if (!req.body.user) {
    res.render("logIn");
  } else {
    next();
  }
}

app.get("/", function(req, res) {
  res.render("logIn");
});

app.post("/", isAuthenticated, function(req, res) {
  res.render("AdminFirst");
});

app.post("/search", isAuthenticated, function(req, res) {
  console.log(req.body);
  const reoID = req.body.IdInput;
  var reoNombres;
  if (req.body.apellidosInput) {
    reoNombres = (req.body.apellidosInput + " " + req.body.nombresInput).toUpperCase();
  } else {
    reoNombres = "";
  }
  res.render("AdminSearch", {
    reoID: reoID,
    reoNombres: reoNombres,
    searchType: req.body.searchType
  });
});

app.get("/search/:id", function(req, res) {
  // res.render("ReoMain", {
  //   docID: req.params.id
  // });
  res.render("reosCausas", {
    docID: req.params.id
  });
});

app.get("/causaquery/:id/:causaID", function(req, res) {
  res.render("reoMain");
  //   causaID: req.params.causaID,
  //   docID: req.params.id
  // });
});

// app.get("*", function(req, res){
//   res.redirect('/');
// });

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
