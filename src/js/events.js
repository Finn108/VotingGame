var VotingGame = (function (VG) {
  "use strict";

  VG._events = {};

  // Events that happen because of points change
  VG._events.voteEvents = [
    {
      vote: 3,
      func: function (game) {
        game.votesCounter.revealCounter();
      }
    },
    {
      vote: 20,
      func: function (game) {
        var upgrade = game.getUpgById("VoterEachSecond");
        upgrade.display();
      }
    },
    {
      vote: 170,
      func: function (game) {
        game.goUpLevel();
      }
    },
    {
      vote: 26216,
      func: function (game) {
        game.goUpLevel();
      }
    },
    {
      vote: 8268400,
      func: function (game) {
        game.goUpLevel();
      }
    },
    {
      vote: 7284000000,
      func: function (game) {
        game.goUpLevel();
      }
    },
    {
      vote: 1000000000000,
      func: function (game) {
        game.goUpLevel();
      }
    },
    {
      // Increase generators div size a bit to prevent scrollbar intervention
      vote: 45500000,
      func: function (game) {
        $("#generators").css({width: "362px"});
      }
    },
  ];

  // Events that occur after a purchase of a generator
  // They are arranged: genBuyEvents[genId][numOfBuys]
  VG._events.genBuyEvents = {
    Voter: {
      1: function (game) {
        game.votesCounter.revealVPS();
      },
      3: function (game) {
        /*
        Display the upgrades sidebar + add the first upgrade
        */
        $("#upgrades").toggle("drop", {direction:"down"}, 1000);
        var upgrade = game.getUpgById("ClickPlus1");
        // wait for the upgrades bar to load
        setTimeout(upgrade.display, 1500);
      }
    },
  };

  return VG;
})(VotingGame || {});
