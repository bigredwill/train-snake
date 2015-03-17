function Train(x, y, carNum) {
    this.direction = 'Up';
    this.x = x;
    this.y = y;
    this.first = true;
    this.speed = 10;
    this.beginNum = 2;//carNum || 8;
    while (this.beginNum--) {
        this.addCar();
    }
}

Train.prototype.getShape = function() {
    return this.shape;
};

Train.prototype.addCar = function() {
    var x = this.x,
        y = this.y,
        direction = 'Up',
        carNumber = 0,
        newCar,
        col;
    if (this.first === true) {
        col = 'rgba(0,0,255,1)';
        newCar = new TrainCar(null, x, y, direction, carNumber, col);
        this.head = newCar;
        this.tail = newCar;
        this.first = false;
    } else {
        x = this.tail.x - this.tail.width * (this.tail.vx);
        y = this.tail.y - this.tail.height * (this.tail.vy);
        col = 'rgba(200,40,80,1)';
        direction = this.tail.direction;
        carNumber = this.tail.carNumber + 1;
        newCar = new TrainCar(this.tail, x, y, direction, carNumber, col);
        this.tail.next = newCar;
        newCar.train = this;
        this.tail = newCar;
    }
    this.tail = newCar;
};


Train.prototype.keyDown = function(key) {
    if (key === "U+0020") {
        this.stopTrain();
    } else if (key === "U+004B") {
      this.addCar();  
    } else {
        this.setDirection(key);
    }
};
Train.prototype.keyUp = function(key) {
    if (key === "U+0020") {
        this.resumeTrain();
        // alert("space!");
    }
};
Train.prototype.setDirection = function(dir) {
    this.head.addMove(dir);
};

Train.prototype.stopTrain = function() {
    this.head.stopCar();
};
Train.prototype.resumeTrain = function() {
    this.head.resumeCar();
};

Train.prototype.checkCollision = function() {
    var isTrue = Game.isCollide(this.head, game.passenger);
    if (isTrue) {
        game.passenger.destroy();
        // this.addCar();
        // isTrue = false;
    }

};

Train.prototype.update = function(dt) {
    var current = this.head;
    this.checkCollision();
    do {
        current.update(dt);
        current = current.next;
    } while (current);
};