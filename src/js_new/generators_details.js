var VotingGame = (function (VG) {
  "use strict";

  var generatorsDetails = [
    {
      id: "Voter",
      name: "מצביע",
      votesPerSec: 0.2,
      description: "יצביע בשבילך כל 5 שניות לא משנה מה תעשה. כמו אנשים אחרים שאתה מכיר.",
      price: 13,
      picture: "loneVoter.png",
    },
    {
      id: "Cookie",
      name: "עוגיות",
      votesPerSec: 1,
      description: "כולם אוהבים עוגיות. במיוחד הבוחרים.",
      price: 90,
      picture: "cookies.png",
    },
    {
      id: "Campaign",
      name: "קמפיין",
      votesPerSec: 5,
      description: "מאחורי כל אדם גדול עומד קמפיין גדול.",
      price: 580,
      picture: "campaign.png",
    },
    {
      id: "Rabi",
      name: "רב",
      votesPerSec: 54,
      description: "כל ממשלה צריכה אחד.<br>ועוד אחד לספרדים.",
      price: 10800,
      picture: "rabi.png",
    },
    {
      id: "Gays",
      name: "תא גאה",
      votesPerSec: 430,
      description: "פינק וושינג? מה זה?",
      price: 110000,
      picture: "gays.png",
    },
    {
      id: "Survey",
      name: "סקר",
      votesPerSec: 3870,
      description: "מינה צמח קוראת בקלפי(ם)",
      price: 1570000,
      picture: "survey.png",
    },
    {
      id: "Army",
      name: "מבצע צבאי",
      votesPerSec: 122181,
      description: "תראו שם! הסחת דעת!<BR> (אמור לעלות 72 מצביעים, לא שקלים)",
      price: 6700000,
      picture: "army.png",
    },
    {
      id: "Propaganda",
      name: "פרופגנדה",
      votesPerSec: 105000,
      description: "הכלי החביב על גבלס, עכשיו בשירות<BR>המדינה (שלך).",
      price: 65000000,
      picture: "propaganda.png",
    },
      {
      id: "Baby",
      name: "הפרייה מלאכותית",
      votesPerSec: 1789456,
      description: "של תינוקות מושלמים. שיצביעו לך.",
      price: 1300000000,
      picture: "baby.png",
    },
    {
      id: "Alien",
      name: "גיור חייזרים",
      votesPerSec: 22000000,
      description: ".זה לטובתם.",
      price: 20000000000,
      picture: "alien.png",
    },
    {
      id: "Satan",
      name: "עסקה עם השטן",
      votesPerSec: 130000000,
      description: "היישות השנייה בגודלה...",
      price: 135000000000,
      picture: "satan.png",
    },
    {
      id: "Owl",
      name: "ינשוף",
      votesPerSec: 2222222222,
      description: "אל תשאל.",
      price: 2300000000000,
      picture: "owl.png",
    }
  ];


  VG._createGenerators = function (generatorsState) {
    var gensState = generatorsState || {};
    var gensDiv = $("#generators");

    generatorsDetails.forEach(function (genDetails) {
      var genId = genDetails.id;
      var level = 0;
      if (genId in gensState) {
        genDetails.level = gensState[genId].level;
        genDetails.shown = gensState[genId].shown;
      }

      var gen = new VG._Generator(genDetails, VG.votesCounter, gensDiv);
      VG._generators.push(gen);
      $(gen).on("buy", VG._genBuyEvent);

    });
  };

  return VG;
})(VotingGame || {});
