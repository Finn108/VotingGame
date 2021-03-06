var VotingGame = (function (VG) {
  "use strict";
  
  /*
  Some helpful functions to convert numbers to something more readable
  */

  function addCommas(num) {
    /*
    Seperates big numbers with commas. For example:
    > addCommas(2345262)
    2,345,262
    */

    var numStr = "";
    if (num >= 1) {
      numStr += String(Math.floor(num));
    }
    else if (num > 0) {
      numStr += num.toFixed(2);
    }
    else {
      numStr += num;
    }
    var numSepRgx = /(\d+)(\d{3})/;
    while (numSepRgx.test(numStr)) {
      numStr = numStr.replace(numSepRgx, '$1' + ',' + '$2');
    }
    return numStr;
  }

  VG.numNames = function (num) {
    /*
    Converts a given number to a readable name. For example:
    > numNames(10340210)
    10.34 Million // (in hebrew)
    */

    // No need to add names, just commas
    if (num < 1000000) return addCommas(num);

    var rangeNames = [
      "אלף",
      "מיליון",
      "מיליארד",
      "ביליון",
      "ביליארד",
      "טריליון",
      "טריליארד"
    ];
    var thousandsCount = 0;
    var numDivided = num;
    while (numDivided > 1000) {
      numDivided=numDivided/1000;
      thousandsCount++;
    }
    var numInRange = num / Math.pow(1000, thousandsCount);
    return numInRange.toFixed(1) + " " + rangeNames[thousandsCount-1];
  }; 

  return VG;
})(VotingGame || {});
