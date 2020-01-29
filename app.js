const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/home.html");
});

// app.post("/", function(req,res){
//
//   var projectName = req.body.projectName;
//   var client = req.body.client;
//   var roleName = req.body.roleName;
//   var grade = req.body.grade;
//   var roleDescription = "Example Description";
//   var location = "Example Location";
//   var startDate = req.body.startDate;
//   var endDate = "31 Dec 2020";
//   var resourceManagerName = "Example Resource Manager";
//   var resourceManagerEmail = "resource-manager@email.com";
//
//   res.render("project", {
//     projectName: projectName,
//     client: client,
//     roleName: roleName,
//     grade: grade,
//     roleDescription: roleDescription,
//     location: location,
//     startDate: startDate,
//     endDate: endDate,
//     resourceManagerName: resourceManagerName,
//     resourceManagerEmail: resourceManagerEmail
//   });
// });

app.get("/project", function(req, res) {
  var projectName = "Example Project";
  var client = "Example Client";
  var roleName = "Example Role";
  var grade = "Example Grade";
  var roleDescription = "Example Description";
  var location = "Example Location";
  var startDate = "01 Jan 2020";
  var endDate = "31 Dec 2020";
  var resourceManagerName = "Example Resource Manager";
  var resourceManagerEmail = "resource-manager@email.com";

  res.render("project", {
    projectName: projectName,
    client: client,
    roleName: roleName,
    grade: grade,
    roleDescription: roleDescription,
    location: location,
    startDate: startDate,
    endDate: endDate,
    resourceManagerName: resourceManagerName,
    resourceManagerEmail: resourceManagerEmail
  });
});

// // Return To Home Page if Errors Occur
// app.post("/failure", function(req, res) {
//   res.redirect("/");
// });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
