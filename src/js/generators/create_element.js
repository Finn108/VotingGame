var VotingGame = (function (VG) {
  "use strict";
  
  VG._gens.createElement = function (details, generatorsDiv) {
    /*
    Creates the html element for the generator. Returns the button element
    as a jQuery object.
    */
    var btnElem = document.createElement("div");
    var imgElem = document.createElement("img");
    var priceElem = document.createElement("div");
    var descElem = document.createElement("div");
    var levelElem = document.createElement("div");
    var summaryElem = document.createElement("div");
    var summaryTextElem = document.createElement("p");
    var priceStr = VG.numNames(details.price);
    var vpsText = VG.numNames(details.votesPerSec) + " הצבעות לשנייה";

    // Change the votes per second text
    if (details.votesPerSecond < 1) {
      var waitTime = 1 / details.votesPerSecond;
      vpsText = "הצבעה כל " + waitTime + " שניות";
    }

    btnElem.id = "gen" + details.id;
    btnElem.className = "genBtn";


    // Used for testing
    if (details.picture.indexOf("assets") === -1) {
      imgElem.src = VG._cMainPath + "assets/" + details.picture;
    }
    else {
      imgElem.src = details.picture;
    }
    imgElem.className = "genBtnPic";

    priceElem.className = "genBtnPrice";
    priceElem.textContent = details.name + " - " + priceStr + "₪";

    descElem.className = "genBtnDesc";
    descElem.innerHTML = details.description;

    levelElem.className = "genBtnLvl";
    levelElem.textContent = 0;

    summaryElem.className = "genBtnSummary";
    summaryTextElem.textContent = vpsText;
    summaryElem.appendChild(summaryTextElem);

    var jqBtn = $(btnElem);
    jqBtn.append([imgElem, priceElem, descElem, levelElem, summaryElem]);
    // Prevent annoying selection markers on generators
    jqBtn.disableSelection();
    generatorsDiv.append(jqBtn);
    return jqBtn;
  };

  return VG;
})(VotingGame || {});