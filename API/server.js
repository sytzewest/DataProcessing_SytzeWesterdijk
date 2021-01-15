// required imports 
// express is used for building rest apis
var express = require("express");
// body-parser is used to parse the request and access the routes that will later be defined
var bodyParser = require("body-parser");

// initialise/create an express app
const app = express();

// parse requests of content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set simple route, allows user to see the server is working as intended
app.get("/", (req, res) => {
  res.json({ message: "API - Data Processing - SytzeWesterdijk - 4545354" });
});

require("./Routes/sales.route.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});