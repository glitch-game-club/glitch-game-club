// List the variables we will be using later
var gravity = 600;
var velocityx = 200;
var velocityy = 400;
var player;
var platforms;
var coins;
var hazards;
var coinSound;
var hazardSound;
var enemy1;
var tween1;
var wlevel = 0;

// Start the game at a certain size 
var game = new Phaser.Game(480, 360, Phaser.AUTO, '', '', false, false);

var startState = {}

startState.init = function () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
};

startState.preload = function () {
    game.load.crossOrigin = 'anonymous';
    game.load.spritesheet('player', 'assets/hero.png', 36, 42);
    game.load.spritesheet('coin', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/coin_animated.png', 22, 22);
    game.load.spritesheet('hazard', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/fire2.png', 11, 27);
    game.load.spritesheet('enemy', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/mimic.png', 32, 32);
    game.load.audio('coinwav', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/win.wav');
    game.load.audio('hazardwav', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/splat.wav');
    game.load.image('s1', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/ahoys.png');
    game.load.image('s2', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/ahoys2.png');
    game.load.image('getready', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/get-ready.png');
    game.load.image('youwin', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/you-win.png');
    game.load.image('gameover', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/game-over.png');
};

startState.create = function () {
    player = game.add.sprite(20, 115, 'player');
    player.animations.add('right', [1, 2, 3, 4], 6, true);
    player.scale.setTo(1.5);
    player.visible = false;
    enemy1 = game.add.sprite(350, 120, 'enemy');
    enemy1.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6, true);
    enemy1.scale.setTo(1.5);
    enemy1.frame = 9;
    // start animation
    game.time.events.add(1000, this.playerShow, this);
    game.time.events.add(0, this.enemyMove, this);
    game.time.events.add(2000, this.playerMove, this);
    game.time.events.add(3000, this.s1, this);
    game.time.events.add(5000, this.s2, this);
    game.time.events.add(7000, this.getready, this);
    game.time.events.add(8000, this.start, this);
};

startState.update = function () {
};

startState.playerShow = function () {
    player.visible = "true";
};

startState.enemyMove = function () {
    tween1 = game.add.tween(enemy1);
    enemy1.animations.play('fly');
    tween1.to({
        x: 250,
        y: 120
    }, 2000, null, true, 0, 0, false);
};

startState.playerMove = function () {
    var tween = game.add.tween(player);
    tween.to({
        x: 70,
        y: 115
    }, 1000, null, true, 0, 0, false);
    player.animations.play('right');
};

startState.s1 = function () {
    player.animations.stop();
    var s1 = game.add.sprite(player.x - 10, player.y - 50, 's1');
};

startState.s2 = function () {
    var s2 = game.add.sprite(enemy1.x - 95, enemy1.y - 25, 's2');
    enemy1.animations.stop();
    enemy1.frame = 11;
};

startState.getready = function () {
    game.world.removeAll();
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, 'getready');
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 1000, null, true, 0, 0, false);
}

startState.start = function () {
    game.state.start('play');
};

var playState = {};

playState.init = function (wlevel) {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    wlevel = wlevel;
};

playState.preload = function () {
    game.load.crossOrigin = 'anonymous';
    game.load.image('background', 'assets/background.png');
    game.load.spritesheet('player', 'assets/hero.png', 36, 42);
    game.load.image('ground', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/ground.png');
    game.load.image('grass:4x1', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/grass_4x1.png');
    game.load.spritesheet('coin', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/coin_animated.png', 22, 22);
    game.load.spritesheet('hazard', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/fire2.png', 11, 27);
    game.load.spritesheet('enemy', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/mimic.png', 32, 32);
    game.load.audio('coinwav1', 'https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_coin_1.wav?1537903834353');
    game.load.audio('coinwav2', 'https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_coin_2.wav?1537903834353');
    game.load.audio('hazardwav', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/splat.wav');
    game.load.audio('hazardwav1', 'https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_lose_1.wav?1537903834482');
    game.load.audio('hazardwav2', 'https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_lose_2.wav?1537903834482');
    game.load.json('level:1', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/level01.json');
    game.load.json('level:2', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/level02.json');
    game.load.json('level:3', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/level03.json');
};

playState.create = function () {
    var ground;
    var platform;
    var coin;
    var enemy1;
    var tween1;
    var hazard1;
    var level;
    //var level1j;
    //add physics to the game
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    var background = game.add.sprite(0, 0, 'background');
    background.height = 360;
    background.width = 480;
    
    player = game.add.sprite(0, 0, 'player');
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;

    player.animations.add('stop', [0]);
    player.animations.add('run', [1, 2], 8, true); // 8fps looped
    player.animations.add('jump', [3]);
    player.animations.add('fall', [4]);
    player.animations.add('die', [5, 6, 5, 6, 5, 6, 5, 6], 12); // 12fps no loop
    // starting animation
    player.animations.play('stop');
    
    platforms = game.add.group();
    platforms.enableBody = true;
    //before loading platforms etc set level. 
    if (!wlevel || wlevel == 1) level = "level:1";
    //leveldata = "";
    else if (wlevel == 2) level = "level:2";
    else if (wlevel == 3) level = "level:3";
    //from https://mozdevs.github.io/html5-games-workshop/en/guides/platformer/creating-platforms/
    var leveldata = game.cache.getJSON(level);
    for (var i = 0; i < leveldata.platforms.length; i++) {
        platform = platforms.create(leveldata.platforms[i].x, leveldata.platforms[i].y, leveldata.platforms[i].image);
        platform.body.immovable = true;
    }
    coins = game.add.group();
    coins.enableBody = true;
    for (var i = 0; i < 4; i++) {
        coin = coins.create(i * 100, 0, 'coin');
        coin.body.gravity.y = 200;
        coin.animations.add('rotate', [0, 1, 2, 1], 6, true);
        coin.animations.play('rotate');
    }
    coinSound = game.add.audio('coinwav');
    hazards = game.add.group();
    hazards.enableBody = true;
    hazard1 = hazards.create(100, 300, 'hazard');
    hazard1.animations.add('flicker', [0, 1], 6, true);
    hazard1.animations.play('flicker');
    hazardSound = game.add.audio('hazardwav');

    enemy1 = hazards.create(250, 125, 'enemy');
    enemy1.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6, true);
    enemy1.animations.play('fly');
    tween1 = game.add.tween(enemy1);
    tween1.to({
        x: 400,
        y: 125
    }, 2000, null, true, 0, -1, true);
    //total time until trigger
    this.timeInSeconds = 10;
    //make a text field
    this.timeText = game.add.text(10, 10, "0:00");
    //turn the text white
    this.timeText.fill = "#ffffff";
    //set up a loop timer
    this.timer = game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
}
playState.update = function () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(coins, platforms);
    game.physics.arcade.overlap(player, coins, playState.collectCoins, null, game);
    game.physics.arcade.overlap(player, hazards, playState.hitHazard, null, game);
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.body.velocity.x = -velocityx;
        player.animations.play("run");
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        player.body.velocity.x = velocityx;
        player.animations.play("run");
    }
    else {
        player.body.velocity.x = 0;
        player.animations.play("stop");

    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down === true) {
        player.body.velocity.y = -velocityy;
        player.animations.play("jump");
    }
    playState.checkAlive(coins);
};
playState.collectCoins = function (player, coin) {
    coin.kill();
    coinSound.play();
};
playState.hitHazard = function (player, hazard) {
    player.kill();
    hazardSound.play();
    game.state.start('gameover');
}

playState.nextlevel = function () {
    if (!wlevel) wlevel = 1;
    wlevel = wlevel + 1
    game.state.start('play', true, false, wlevel);
}

playState.tick = function () {
    //subtract a second
    this.timeInSeconds--;
    //find how many complete minutes are left
    var minutes = Math.floor(this.timeInSeconds / 60);
    //find the number of seconds left
    //not counting the minutes
    var seconds = this.timeInSeconds - (minutes * 60);
    //make a string showing the time
    var timeString = this.addZeros(minutes) + ":" + this.addZeros(seconds);
    //display the string in the text field
    this.timeText.text = timeString;
    //check if the time is up
    if (this.timeInSeconds == 0) {
        game.state.start('gameover');
    }
}
playState.checkAlive = function (group) {
    var count_alive = 0;
    for (i = 0; i < group.children.length; i++) {
        if (group.children[i].alive == true) {
            count_alive++;
        }
    }
    if (count_alive == 0 && wlevel < 3) {
        this.nextlevel();
    } else if (count_alive == 0 && wlevel == 3) {
        game.state.start('youwin');
    }
};
playState.addZeros = function (num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};

var gameoverState = {};
gameoverState.create = function () {
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, 'gameover');
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 2000, null, true, 0, 0, false);
    game.time.events.add(2000, this.getready, this);
    game.time.events.add(4000, this.restart, this);
};
gameoverState.restart = function () {
    game.state.start('play');
};
gameoverState.getready = function () {
    game.world.removeAll();
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, 'getready');
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 2000, null, true, 0, 0, false);
};

var youwinState = {};
youwinState.create = function () {
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, 'youwin');
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 2000, null, true, 0, 0, false);
    game.time.events.add(2000, this.getready, this);
    game.time.events.add(4000, this.restart, this);
};
youwinState.restart = function () {
    wlevel = 0;
    game.state.start('play');
};
youwinState.getready = function () {
    game.world.removeAll();
    var getready = game.add.sprite(game.world.centerX, game.world.centerY, 'getready');
    getready.anchor.set(0.5);
    getready.scale.setTo(0.5);
    var tween = game.add.tween(getready.scale).to({
        x: 2,
        y: 2
    }, 2000, null, true, 0, 0, false);
};

game.state.add('play', playState);
game.state.add('start', startState);
game.state.add('gameover', gameoverState);
game.state.add('youwin', youwinState);
game.state.start('play');
