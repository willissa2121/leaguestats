const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const db = require("./src/models");

const routes = require("./src/router/routes");

app.use(cors());
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes.userSearch);

app.listen(port, () => {
  console.log("started on localhost:3001");
});
db.sequelize.sync({ force: true });
