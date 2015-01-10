/*
The level controller. This object is in charge of changing the current level
title and theme.
*/

function LevelController () {
  var levelTitleBox = $("#levelTitle");
  var levelTitle = levelTitleBox.children().first();
  var levelTargetVotes = levelTitleBox.children().last();

  this.changeLevel = function (title, targetDesc) {
    levelTitleBox.fadeOut(400, function () {
      levelTitle.text("במרוץ ל" + title);
      levelTargetVotes.text(targetDesc);
      levelTitleBox.fadeIn();
    });
  };
}
