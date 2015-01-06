Voting Game
===========
This is an awesome new Cookie Clicker type game created by Finn108 and
nice-shot. Your objective is to **win the Election!**<br>
Which election? ALL OF THEM!<br>
Collect Votes by clicking on the voting note. Some more efficient ways to get
votes will come along as you play.

## The Main Objects
So if you've come here you probably don't need an explanation on how to play
the game but how to create it. For this, let me explain what the main game
elements are:

### The Game Object
This is the big one. This object is in charge of setting up and starting the
game. It is also connected to all the other game elements around.

#### Methods
To start the game there are two main methods at work:

##### reset
This method is used to place all the different upgrades, event listeners and
other elements on the page and on the game element itself. It can recieve
several arguments:
1. ```skipIntro``` (true/false): Skips the add your party's initial and name
   part from the start of the game and enters a default value.
2. ```startingPoints``` (number): Adds the current number of points the user
   has.

##### start
Once the game was reset we can start it with this command. What this command
does is start the interval where each game *tick* happens. It's mainly
necessary to allow adding votes to the total votes counter according to the
current votes per second (VPS).

Here's an example of initializing the game with 60 points:
```js
var game = new Game();
game.reset(true, 60);
game.start();
```

#### Additional Methods
Some other usefull methods the game has include:
##### getGenById
Receives a string with the id of a given generator and returns the generator
object.<br>
For example:
```js
var voterGen = game.getGenById("Voter");
voterGen.reveal(); // Shows the generator on the screen
```

##### getUpgById
Like getGenById but returns an upgrade object instead.

### VotesCounter
The VotesCounter is in charge of holding the current number of votes and the
current votes per second (VPS). It is also responsible to update the display
according the the vote's current status. This object has a lot of important
methods for effecting the game status and it is part of the main game object:

```js
var game = new Game();
game.reset();

game.votesCounter.getVotes(); // will output 0
game.votesCounter.updateVotes(5);
game.votesCounter.getVotes(); // 5
```

#### Methods

##### updateVotes
This method is supposed to run in every *tick* of the game to and update the
votes number occurding to the current VPS.

##### addVotes
Add the given number of votes to the counter

##### removeVotes
Removes a bunch of votes from the counter. This will work the same as passing a
negetive value to ```addVotes```

##### getVotes
Return the current number of votes in the counter

##### addVotesPerSecond
Like the name says

#### removeVotesPerSecond
Removes the current votes per second. Usefull for buying new generators cause
this allows to remove all traces of the previous generator level VPS and add
the new data without fear of overlapping.

#### getVotesPerSecond
You can probably guess.

#### revealCounter
An animation method that triggers the fade-in of the counter.

#### revealVPS
An animation method that triggers the fade-in of the votes per second.
