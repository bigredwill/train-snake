function TrainCar(previous, x, y, direction, number, color) {
    this.color = color;
    this.previous = previous;
    this.next = null;
    this.direction = direction;
    this.carNumber = number;
    this.nextDirection = [];
    if(previous) {
        for(var i = 0; i < previous.nextDirection.length; i++) {
            this.nextDirection.push(previous.nextDirection[i]);
        }
    }

    this.x = x || 10;
    this.y = y || 30;
    this.speed = 10;
    this.width = 10;
    this.height = 20;
    
    

    this.stopped = false;
    this.lastTurn = 0;
    this.turnTimer = 20;
    this.lastTurn = 0;

    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(color).dr(0, 0, this.width, this.height).ef();
    // this.shape.regX = this.width / 2;
    this.shape.x = x;
    this.shape.y = y;
    stage.addChild(this.shape);

    this.setDirection({move:this.direction});
}

TrainCar.prototype.addMove = function(move) {
    var nextMove = {
        move: move,
        x: this.x,
        y: this.y
    };

    if (this.previous) {
        nextMove.x = this.train.head.x;
        nextMove.y = this.train.head.y;
    }

    this.nextDirection.push(nextMove);

    if (this.next) {
        this.next.addMove(move);
    }

};

TrainCar.prototype.move = function() {
    var next;
    if (this.nextDirection.length > 0) {
        this.lastTurn += this.speed;
        next = this.nextDirection.shift();
        if (next) {
            if (this.x === next.x && this.y === next.y) {
                this.move();
            } else {
                this.nextDirection.unshift(next);
                return;
            }

            this.setDirection(next);
        }
    }
};
TrainCar.prototype.update = function(dt) {
    if (!this.stopped) {
        this.lastTurn ++;
        
        this.move();

        if (this.x > stage.canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = stage.canvas.width;
        }
        if (this.y > stage.canvas.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = stage.canvas.height;
        }
        this.shape.y = this.y += this.vy * this.speed;
        this.shape.x = this.x += this.vx * this.speed;


    }
};
TrainCar.prototype.stopCar = function() {
    this.stopped = true;
    if (this.next) {
        this.next.stopCar();
    }
};
TrainCar.prototype.resumeCar = function() {
    this.stopped = false;
    if (this.next) {
        this.next.resumeCar();
    }
};
TrainCar.prototype.setDirection = function(dir) {

    switch (dir.move) {

        case "Up":
            this.direction = "Up";
            this.vx = 0;
            this.vy = -1;
            this.shape.rotation = 0;
            break;

        case "Right":
            this.direction = "Right";
            this.vx = 1;
            this.vy = 0;
            this.shape.rotation = 90;
            break;

        case "Down":
            if(this.direction === "Down") {
                this.x -= (this.height/2); //smoother turning
            }
            this.direction = "Down";
            this.vx = 0;
            this.vy = 1;
            this.shape.rotation = 180;
            break;

        case "Left":
            if(this.direction === "Down") {
                this.x -= (this.height/2); //smoother turning
            }
            this.direction = "Left";
            this.vx = -1;
            this.vy = 0;
            this.shape.rotation = 270;
            break;

        default:
            console.log("Not a direction: " + dir);
    }
};