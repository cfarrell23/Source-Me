const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.post("/", function (req, res) {
  var projectRoleId = Number(req.body.projectRoleID);

  var exampleRoleArray = [
    {
      projectName: "Project Martyr",
      client: "Public Sector",
      roleName: "PMO and RAID management",
      grade: "Senior Consultant",
      roleDescription: "It's a role!",
      location: "London",
      startDate: "13 Jan 2020",
      endDate: "31 Dec 2020",
      resourceManagerName: "Example Resource Manager",
      resourceManagerEmail: "resource-manager@email.com",
    },
    {
      projectName: "Project Martyr",
      client: "Public Sector",
      roleName: "NFT Manager",
      grade: "Senior Consultant",
      roleDescription: "It's a role again!",
      location: "Gibraltar",
      startDate: "19 Jan 2020",
      endDate: "31 Dec 2020",
      resourceManagerName: "Example Resource Manager",
      resourceManagerEmail: "resource-manager@email.com",
    },
    {
      projectName: "Project Martyr",
      client: "Public Sector",
      roleName: "NFT Analyst",
      grade: "Analyst",
      roleDescription: "It's a role!",
      location: "Gibraltar",
      startDate: "19 Jan 2020",
      endDate: "31 Dec 2020",
      resourceManagerName: "Example Resource Manager",
      resourceManagerEmail: "resource-manager@email.com",
    },
  ];

  switch (projectRoleId) {
    case 1:
      var projectName = exampleRoleArray[projectRoleId - 1].projectName;
      var client = exampleRoleArray[projectRoleId - 1].client;
      var roleName = exampleRoleArray[projectRoleId - 1].roleName;
      var grade = exampleRoleArray[projectRoleId - 1].grade;
      var roleDescription = exampleRoleArray[projectRoleId - 1].roleDescription;
      var location = exampleRoleArray[projectRoleId - 1].location;
      var startDate = exampleRoleArray[projectRoleId - 1].startDate;
      var endDate = exampleRoleArray[projectRoleId - 1].endDate;
      var resourceManagerName =
        exampleRoleArray[projectRoleId - 1].resourceManagerName;
      var resourceManagerEmail =
        exampleRoleArray[projectRoleId - 1].resourceManagerEmail;
      break;
    case 2:
      var projectName = exampleRoleArray[projectRoleId - 1].projectName;
      var client = exampleRoleArray[projectRoleId - 1].client;
      var roleName = exampleRoleArray[projectRoleId - 1].roleName;
      var grade = exampleRoleArray[projectRoleId - 1].grade;
      var roleDescription = exampleRoleArray[projectRoleId - 1].roleDescription;
      var location = exampleRoleArray[projectRoleId - 1].location;
      var startDate = exampleRoleArray[projectRoleId - 1].startDate;
      var endDate = exampleRoleArray[projectRoleId - 1].endDate;
      var resourceManagerName =
        exampleRoleArray[projectRoleId - 1].resourceManagerName;
      var resourceManagerEmail =
        exampleRoleArray[projectRoleId - 1].resourceManagerEmail;
      break;
    case 3:
      var projectName = exampleRoleArray[projectRoleId - 1].projectName;
      var client = exampleRoleArray[projectRoleId - 1].client;
      var roleName = exampleRoleArray[projectRoleId - 1].roleName;
      var grade = exampleRoleArray[projectRoleId - 1].grade;
      var roleDescription = exampleRoleArray[projectRoleId - 1].roleDescription;
      var location = exampleRoleArray[projectRoleId - 1].location;
      var startDate = exampleRoleArray[projectRoleId - 1].startDate;
      var endDate = exampleRoleArray[projectRoleId - 1].endDate;
      var resourceManagerName =
        exampleRoleArray[projectRoleId - 1].resourceManagerName;
      var resourceManagerEmail =
        exampleRoleArray[projectRoleId - 1].resourceManagerEmail;
      break;
    default:
      res.redirect("/failure");
  }

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
    resourceManagerEmail: resourceManagerEmail,
  });
});

// Return To Home Page if Errors Occur
app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3005, function () {
  console.log("Server started on port 3005");
});
