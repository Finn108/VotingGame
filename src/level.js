/*
The level controller. This object is in charge of changing the current level
title and theme.
*/

function LevelController () {
  var levelTitleBox = $("#levelTitle");
  var levelTitle = levelTitleBox.children().first();
  var levelTargetVotes = levelTitleBox.children().last();
  // stupid hack to prevent showing the title in the opening
  var isFirstLevel = true;

  this.changeLevel = function (title, targetDesc) {
    if (! isFirstLevel) {
      levelTitleBox.fadeOut();
      levelTitle.text("במרוץ ל" + title);
      levelTargetVotes.text(targetDesc);
      levelTitleBox.fadeIn();
      isFirstLevel = true;
    }
    else {
      levelTitle.text("במרוץ ל" + title);
      levelTargetVotes.text(targetDesc);
    }
  };
}
