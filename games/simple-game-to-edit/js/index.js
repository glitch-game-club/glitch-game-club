
// a list of our game elements put at the beginning so preload, create and update can access them. 
var player; 
var coins;
var walls;
var enemies;
var splat;
var reload;
var cursor;


// the following javascript object called playState contains all the active code for this simple game, you can add other states like, win, lose, start etc

var playState = {  


    init: function() {  
        // Here reset score when play state starts
     score = 0;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
      
    },
  
    preload: function() {  
      
      // Here we preload the image assets - make more here http://piskelapp.com
      game.load.crossOrigin = 'anonymous';
      game.load.image('player', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/player.png');
      game.load.image('wall', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/wall.png');
      game.load.image('coin', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/coin.png');
      game.load.image('enemy', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/enemy.png');
      
          // Here we preload the audio assets - make more here http://sfbgames.com/chiptone/  
      game.load.audio('win', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/win.wav');
      game.load.audio('splat', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/splat.wav');
      
    },

    create: function() {  
        // Here we create the game
      
      game.stage.backgroundColor = '#5699ab';
      
      // These two lines add physics to the game world
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.enableBody = true;
      
      // set up cursor keys to allow user input (the options are set in update)
      cursor = game.input.keyboard.createCursorKeys();
      
      // add the main player to the game 70 pixels to the left and 100 pixels down from the top
      player = game.add.sprite(70, 100, 'player');

      // increase the size of the player by 50%
      player.scale.setTo(1.5);

      //add gravity to the player so that it falls down
      player.body.gravity.y = 500;
      
      // don't let the player leave the screen area
      player.body.collideWorldBounds=true;

      
      // add audio to two variable ready to play later in other functions
      splat = game.add.audio('splat');
      win = game.add.audio('win');


      //create groups for the walls, coins and enemies - what ever happens to the group happens
      // to all the members of the group 
      
      walls = game.add.group();
      coins = game.add.group();
      enemies = game.add.group();

// Design the level. x = wall, o = coin, ! = lava.
var level = [
    'xxxxxxxxxxxxxxxxxxxxxx',
    '!         !          x',
    '!                 o  x',
    '!         o          x',
    '!                    x',
    '!     o   !    x     x',
    'xxxxxxxxxxxxxxxx!!!!!x',
];

// Create the level by going through the array
for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[i].length; j++) {

        // Create a wall and add it to the 'walls' group
        if (level[i][j] == 'x') {
          var wall = game.add.sprite(30+30*j, 30+30*i, 'wall');
          wall.scale.setTo(1.5);
          walls.add(wall);
          wall.body.immovable = true; 
        }

        // Create a coin and add it to the 'coins' group
        else if (level[i][j] == 'o') {
            var coin = game.add.sprite(30+30*j, 30+30*i, 'coin');
            coin.scale.setTo(1.5);
            coins.add(coin);
        }

        // Create a enemy and add it to the 'enemies' group
        else if (level[i][j] == '!') {
            var enemy = game.add.sprite(30+30*j, 30+30*i, 'enemy');
            enemy.scale.setTo(1.5);

            enemies.add(enemy);
        }
    }
}
      
    },

    update: function() {  
        // Here we update the game 60 times per second - all code here is run all the time

        // stop the player if no key is pressed 
        player.body.velocity.x = 0;
      
        // Make the player and the walls collide , so player can't move through them
        game.physics.arcade.collide(player, walls);

        // Call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(player, coins, this.takeCoin, null, this);

        // Call the 'lose' function when the player touches the enemy
        game.physics.arcade.overlap(player, enemies, this.lose, null, this);
             

        // add the controls for the cursor keys
        if (cursor.left.isDown) 
            player.body.velocity.x = -200;
        else if (cursor.right.isDown) 
            player.body.velocity.x = 200;
        else 
            player.body.velocity.x = 0;
     
              // Make the player jump if he is touching the ground
        if (cursor.up.isDown && player.body.touching.down) 
            player.body.velocity.y = -250;
  
    },
  
    // Function to kill/disappear a coin if player touches it
    takeCoin: function(player, coin) {
        coin.kill();
      
        //increase the score by one if a coin is taken
        score = score +1;
      
        // restart the game dependent on score count of coin              
        if (score == 3)
           this.win();
    },

      // Function to restart the game when a player touches an enemy
    lose: function() {
        splat.play();
        game.state.start('main');
    },  
  
    // Function to restart the game if there are no coins left
    win: function() {
        win.play();
        game.state.start('main');
    },
  
  
};

// Initialize the game at a certain size 
var game = new Phaser.Game(750, 300, Phaser.AUTO, "", "main", false, false);  

//Add and start our play state 
game.state.add('main', playState);  
game.state.start('main');