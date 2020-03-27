const config = require('./config/config')
const express = require('express')
const path = require("path");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
const {matchHistory} = require('./utilities/findGame')

app.use(cors())
const port = process.env.PORT || 3000


//app.use(express.static(path.join(__dirname, "../", "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendData', (req,res)=>{
  console.log(req.body)
})

app.listen(port, ()=>{
  console.log("started on localhost:3001")
})


console.log(config.scottId)
matchHistory(config.scottId)
