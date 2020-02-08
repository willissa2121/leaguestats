const axios = require("axios");
const endpoints = require("./endpoints");
const config = require("../../config/config");

const NA_URL = "https://na1.api.riotgames.com";

const MAX_REQUESTED_GAMES = 100;

// This function generates the requested endpoint
const braceRegex = /{.*?}/;
function handleEndpoint(endpoint, args, paramObj) {
  let returnEndpoint = NA_URL + endpoint;
  // This loop will replace the curly braces in a string one at a time
  // ex: hi{...}hello{...} args: [bye, there]
  // 1: hibyehello{...}
  // 2: hibyehellothere
  const useableArgs = Array.isArray(args) ? args : [args];
  useableArgs.forEach(arg => {
    returnEndpoint = returnEndpoint.replace(braceRegex, arg);
  });

  // the apiKey can either be a header or slapped on as a query param
  // doing it as a query param allows easy addition for more query params
  // As far as I could tell, additional query params is only needed for the 'matchByAccountId' endpoint
  returnEndpoint += `?api_key=${config.leagueApiKey}`;

  let paramString = "";
  if (paramObj) {
    for (let param in paramObj) {
      paramString += `&${param}=${paramObj[param]}`;
    }
  }

  // console.warn("querying: ", returnEndpoint + paramString);
  return returnEndpoint + paramString;
}

async function getAccountInfoByName(name) {
  return axios({
    url: handleEndpoint(endpoints.summoner.bySummonerName.endpoint, name),
    method: "GET"
  });
}

function printSummonerInfoByName(name) {
  axios({
    url: handleEndpoint(endpoints.summoner.bySummonerName.endpoint, name),
    method: "GET"
  }).then(res => {
    if (res && res.data) {
      console.log(res.data);
    }
  });
}

function printSummonerMasteries(id) {
  axios({
    url: handleEndpoint(endpoints.mastery.allChampions.endpoint, id),
    method: "GET"
  }).then(res => {
    console.log(res.data);
  });
}

function printSummonerGames(accountId, numGames) {
  const summonerGames = getSummonerGames(accountId, numGames);
  summonerGames
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.log("Error Requesting Games");
      console.log(error);
    });
}

function getGameInfoByMatchId(matchId) {
  return axios({
    url: handleEndpoint(endpoints.match.byMatchId.endpoint, matchId),
    method: "GET"
  });
}

function getSummonerGames(accountId, numGames) {
  return axios({
    url: handleEndpoint(endpoints.match.byAccountId.endpoint, accountId, {
      endIndex: numGames
    }),
    method: "GET"
  });
}

function getSummonerGamesByIndex(accountId, startIndex, endIndex) {
  return axios({
    url: handleEndpoint(endpoints.match.byAccountId.endpoint, accountId, {
      startIndex,
      endIndex
    }),
    method: "GET"
  });
}

function getSummonerMateriesByName(name) {
  const accountInfoPromise = getAccountInfoByName(name);
  accountInfoPromise.then(response => {
    const { id } = response.data;
    printSummonerMasteries(id);
  });
}

function getLatestMatchesByName(name, numGames) {
  const accountInfoPromise = getAccountInfoByName(name);
  return accountInfoPromise.then(response => {
    const { accountId } = response.data;
    const displayedGames =
      numGames > MAX_REQUESTED_GAMES ? MAX_REQUESTED_GAMES : numGames;
    return getSummonerGames(accountId, displayedGames);
  });
}

function getMatchInformationFromName(name, numGames) {
  const matchesPromise = getLatestMatchesByName(name, numGames);
  return matchesPromise.then(res => {
    const matchInfo = res.data.matches;
    return axios.all(
      matchInfo.map(match => {
        return getGameInfoByMatchId(match.gameId);
      })
    );
  });
}

getMatchInformationFromName("ieatyas");

module.exports = {
  getLatestMatchesByName,
  getMatchInformationFromName,
  getAccountInfoByName
};
