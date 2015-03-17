function Passenger(x, y) {
    this.x = x;
    this.y = y;
    this.width = 128;
    this.height = 128;

    this.data = {
        // DEFINING FRAMERATE:
        framerate: 20,

        // DEFINING IMAGES:
        images: ["/assets/bizGuy.png"],

        // DEFINING FRAMES:
        frames: {
            width: this.width,
            height: this.height
        },

        // DEFINING ANIMATIONS:
        animations: {
            // start, end, next, speed
            neutral: [0],
            blink: [1, 5, "neutral", 2],
            watchUp: [6, 8, "watchLook", 1],
            watchLook: [9, 9, "watchDown", 0.1],
            watchDown: [10, 12, "neutral", 0.8]
        }
    };
    this.bBox = new createjs.Shape();
    this.bBox.graphics.s("#FA0").ss(3).dr(0, 0, this.width / 2, this.height / 2).es();
    this.bBox.x = x;
    this.bBox.y = y;
    SNAKE.stage.addChild(this.bBox);

    this.spriteSheet = new createjs.SpriteSheet(this.data);
    this.sprite = new createjs.Sprite(this.spriteSheet, "neutral");
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.scaleX = this.sprite.scaleY = 0.5;
    SNAKE.stage.addChild(this.sprite);
}
Passenger.prototype.isContact = function() {

};
Passenger.prototype.update = function() {
    var time = createjs.Ticker.getTicks();
    if (time % 300 === 0 || time % 305 === 0) {
        this.sprite.gotoAndPlay("blink");
        console.log("blink");
    }
    if (time % 200 === 0) {
        this.sprite.gotoAndPlay("watchUp");
        console.log("watchUp");
    }
};

Passenger.prototype.destroy = function() {
    SNAKE.stage.removeChild(this.sprite);
};