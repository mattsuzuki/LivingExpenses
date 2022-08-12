// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Create app
var app = express();

// Configure app
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Add routes
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/resources", function (req, res) {
  res.render("resources");
});
app.get("/jobs", function (req, res) {
  res.render("jobs");
});
app.post("/calculate", function (req, res) {
  const {
    currentMonthlySalary,
    yearsAtCurrentJob,
    currentLivingExpenses,
    expectedMonthlySalary,
    desiredCareer,
  } = req.body;

  // Calculate the results
  var currentMoneyRaw = currentMonthlySalary * (yearsAtCurrentJob * 12); // 3600000
  var softwareMoneyRaw = expectedMonthlySalary * (yearsAtCurrentJob * 12);
  var jobMoneySavedRaw =
    (currentMonthlySalary * 12 - currentLivingExpenses * 12) *
    yearsAtCurrentJob;
  var softwareMoneySavedRaw =
    (expectedMonthlySalary * 12 - currentLivingExpenses * 12) *
    yearsAtCurrentJob;

  // Format money
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  var currentMoney = formatter.format(currentMoneyRaw);
  var softwareMoney = formatter.format(softwareMoneyRaw);
  var difference = formatter.format(softwareMoneyRaw - currentMoneyRaw);
  var jobMoneySaved = formatter.format(jobMoneySavedRaw);
  var softwareMoneySaved = formatter.format(softwareMoneySavedRaw);

  // Pass and render view
  res.render("results", {
    yearsAtCurrentJob,
    currentMoney,
    softwareMoney,
    softwareMoneySaved,
    jobMoneySaved,
    difference,
    desiredCareer,
  });
});

// Start server
app.listen(3000);
