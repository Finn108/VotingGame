var VotingGame = (function (VG) {
  "use strict";
  
  VG.updateNumber = function (givenNum, newNum) {
    /*
    Updates the first number to the second one. If the two are number, returns
    the newNum but if newNum is a string we try to calculate the output
    from the expression. For example:
    > VG.updateNumber(3, "*3")
    9
    */
    if (typeof(newNum) === "number") {
      return newNum;
    }
    else if (typeof(newNum) === "string") {
      /* jshint -W061 */
      return eval(givenNum + newNum);
    }

    return null;
  };

  return VG;
})(VotingGame || {});
