const express = require("express");
const path = require("path");
const axios = require("axios");
const ip = require("ip");
const config = require("./config/config");

// local files
const { findGame, matchHistory } = require("./utilities/findGame");
const queryManager = require("./utilities/leagueApiManager/queryLeagueApi.js");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.is("text/*")) {
    req.text = "";
    req.setEncoding("utf8");
    req.on("data", function(chunk) {
      req.text += chunk;
    });
    req.on("end", next);
  } else {
    next();
  }
});

app.get("/byName/:name/:games", function(req, res) {
  console.log(`Getting Data for ${req.params.name}`);
  const apiPromise = queryManager.getLatestMatchesByName(
    req.params.name,
    Number(req.params.games)
  );

  apiPromise.then(response => {
    res.send(response.data);
    res.end();
  });
});

app.get("/matches/:name/:games", function(req, res) {
  console.log(`Getting Data for ${req.params.name}`);
  // This is returning an axios.all

  // const apiPromises = queryManager.getMatchInformationFromName(
  //   req.params.name,
  //   req.params.games
  // );
  const getIdCall = queryManager.getAccountInfoByName(req.params.name);
  getIdCall.then(data => {
    let idName = data.data.accountId;
    matchHistory(idName).then(val => {
      setTimeout(() => {
        res.send({ val });
        res.end()
      }, config.rateLimit * 175);
    });
  });
  // apiPromises.then(
  //   axios.spread((...matches) => {

  //   })
  // );
});

app.listen(process.env.PORT || 3030, ip.address(), function() {
  if (typeof process.env.PORT === "undefined") {
    console.log(`serving from ${ip.address()}:3030`);
    console.log(
      `Try hitting http://${ip.address()}:3030/matches/ieatyas/${
        config.rateLimit
      }`
    );
  } else {
    console.log(`serving from ${process.env.PORT}`);
    console.log(
      `Try hitting http://${ip.address()}:${
        process.env.PORT
      }/matches/ieatyas/15`
    );
    console.log("Also make sure the league API key is up to date");
  }
});
