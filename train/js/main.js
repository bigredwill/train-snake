/*
	_____ ____   __   _____  __  __
	  |   |__|  /__\    |	 |\\ ||
	  |	  |  \ /    \ __|__  | \\||
    

	***********		 *****			****	   ****
		***			 **	 **			 **		    **
		***		    **    **		 **	*      ***
	**	*** 	   **********		 **  *    * **
	 ** **		  **	    **		 **	  *  *  ** 
	   **		*****	   ****		****  **** ****
*/

var lastTick = Date.now();
var canvas, game,
    STAGEWIDTH = 500,
    STAGEHEIGHT = 400;

this.SNAKE = this.SNAKE || {};

game = new Game();

function Game() {
    var hold = document.getElementById('game_is_inside');
    hold.innerHTML = "<canvas id='canvas' width='" + STAGEWIDTH + "px' height='" + STAGEHEIGHT + "px'></canvas>";
    this.canvas = document.getElementById('canvas');
    this.canvas.style.backgroundColor = 'rgb(10,10,50)';
    this.canvas.style.position = 'absolute';
    SNAKE.stage = new createjs.Stage(this.canvas);

    var gravity = new Box2D.b2Vec2(0.0, -10.0);
    SNAKE.world = new Box2D.b2World(gravity);

    this.ctx = this.canvas.getContext('2d');

    this.player = new Train(155, 55);
    this.entities = [];
    this.entities.push(this.player);

    this.passenger = new Passenger(20, 20, this.entities);
    this.passengers = [];
    this.passengers.push(this.passenger);
    this.entities.push(this.passenger);


    var t = this;
    createjs.Ticker.addEventListener("tick", function() {
        t.update();
    });

    window.addEventListener('keydown', function(e) {
        // e.preventDefault();
        t.keyDown(e);
    });

    window.addEventListener('keyup', function(e) {
        // e.preventDefault();
        t.keyUp(e);
    });

}
//todo
Game.prototype.checkAheadCollision = function() {
    var player = this.player,
        clipW = player.head.width,
        clipH = 10,
        clipL = clipW * clipH,
        clrSquare,
        x1, y1, x2, y2;

        switch (player.head.direction) {

            case "Up":
                x1 = player.head.x;
                y1 = player.head.y - clipH;
                x2 = player.head.x + clipW;
                y2 = player.head.y;
                break;
            case "Down":
                x1 = player.head.x - player.head.width;
                y1 = player.head.y;
                x2 = x1 + clipW;
                y2 = y1 + clipH;
                break;
            case "Right":
                x1 = player.head.x;
                y1 = player.head.y;
                x2 = x1 + clipH;
                y2 = y1 + clipW;
                break;
            case "Left":
                x1 = player.head.x - clipH;
                y1 = player.head.y - player.head.width;
                x2 = player.head.x;
                y2 = player.head.y;
                break;
            default:
                console.log("Collision error:\t" + this.player.direction);
        }
        
        clrSquare = this.ctx.getImageData(x1, y1, x2-x1, y2-y1);
        var d = clrSquare.data;
        for(var i = 0; i < clipL * 4; i += 4) {
            // console.log(clrSquare.data[i] + "\t" + clrSquare.data[i+1] + "\t" + clrSquare.data[i+2] + "\t" + clrSquare.data[i+3]);
            if(d[i] === 255 && d[i+1] === 0 && d[i+2] === 0 && d[i+3] === 255) {
                this.player.stopTrain();
                console.log("Self Collision");
            }
            if(d[i] === 0 && d[i+1] === 255 && d[i+2] === 0 && d[i+3] === 255) {
                this.player.stopTrain();
                console.log("Self Collision");
            }
        }
        // this.shape = new createjs.Shape();
        // this.shape.graphics.beginFill('rgba(250,40,80,0.2)').dr(x1, y1, x2-x1, y2-y1).ef();
        // SNAKE.stage.addChild(this.shape);
        // this.player.stopTrain();
};

Game.prototype.update = function() {
    var now = Date.now();
    var dt = now - lastTick;
    lastTick = dt;
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].update(dt);
    }
    if(!this.player.stopped) {
        this.checkAheadCollision();
    }
    SNAKE.stage.update();
};

Game.prototype.keyDown = function(key) {
    // this.checkAheadCollision();
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].keyDown) {
            this.entities[i].keyDown(key.keyIdentifier);
        }
    }
};

Game.prototype.keyUp = function(key) {
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].keyUp) {
            this.entities[i].keyUp(key.keyIdentifier);
        }
    }
};

Game.isCollide = function(a, b) {
    return !(((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) || ((a.x + a.width) < b.x) || (a.x > (b.x + b.width)));
};
