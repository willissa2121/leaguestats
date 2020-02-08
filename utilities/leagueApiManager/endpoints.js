const endpoints = {
  mastery: {
    allChampions: {
      endpoint:
        "/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}"
    },
    byChampion: {
      endpoint:
        "/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}"
    },
    totalMastery: {
      endpoint:
        "/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}"
    }
  },

  championRotation: {
    currentRotation: {
      endpoint: "/lol/platform/v3/champion-rotations"
    }
  },

  match: {
    byMatchId: {
      endpoint: "/lol/match/v4/matches/{matchId}"
    },
    byAccountId: {
      endpoint: "/lol/match/v4/matchlists/by-account/{encryptedAccountId}",
      params: [
        "champion",
        "queue",
        "season",
        "endTime",
        "beginTime",
        "endIndex",
        "beginIndex"
      ]
    },
    timelineByMatchId: {
      endpoint: "/lol/match/v4/timelines/by-match/{matchId}"
    },
    getMatchIdsByTournyCode: {
      endpoint: "/lol/match/v4/matches/by-tournament-code/{tournamentCode}/ids"
    },
    byMatchIdAndTournyCode: {
      endpoint:
        "/lol/match/v4/matches/{matchId}/by-tournament-code/{tournamentCode}"
    }
  },

  spectator: {
    currentGameByAccountId: {
      endpoint:
        "/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}"
    },
    featuredGames: {
      endpoint: "/lol/spectator/v4/featured-games"
    }
  },

  summoner: {
    byAccountId: {
      endpoint: "/lol/summoner/v4/summoners/by-account/{encryptedAccountId}"
    },
    bySummonerName: {
      endpoint: "/lol/summoner/v4/summoners/by-name/{accountName}"
    },
    byPuuid: {
      endpoint: "/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}"
    },
    bySummonerId: {
      endpoint: "/lol/summoner/v4/summoners/{encryptedSummonerId}"
    }
  }
};

module.exports = {
  ...endpoints
};
