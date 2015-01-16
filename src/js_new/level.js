var VotingGame = (function (VG) {
  "use strict";

  var levelTitleBox = $("#levelTitle");
  var levelTitle = levelTitleBox.children().first();
  var levelTargetVotes = levelTitleBox.children().last();

  VG.goUpLevel = function () {
    VG._level++;
    var details = VG.getLevelDetails(VG._level);
    levelTitleBox.fadeOut(400, function () {
      levelTitle.text("במרוץ ל" + details.title);
      levelTargetVotes.text(details.targetDesc);
      levelTitleBox.fadeIn();
    });
  };

  return VG;
})(VotingGame || {});
