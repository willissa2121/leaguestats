
const express = require('express')
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { matchHistory } = require("./src/utilities/findData");
const routes = require("./src/router/routes");

app.use(cors());
const port = process.env.PORT || 3000;

//app.use(express.static(path.join(__dirname, "../", "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', routes.userSearch)



app.listen(port, () => {
  console.log("started on localhost:3001");
});

//matchHistory(config.scottId)
