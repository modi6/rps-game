class RandomGenerator {

    static ch = new Chance();

    static randomInteger(min, max) { // random integer between min and max
        let rand = RandomGenerator.ch.integer({ min, max })
        return rand;
    }

    static pickSet(array, num) { // returns random subarray of given array
        let set = RandomGenerator.ch.pickset(array, num)
        return set;
    }

    static pickOne(arr) { // randomly picks an element from the array
        let pick = RandomGenerator.ch.pickone(arr)
        return pick;
    }
}

class Circle {

    constructor(position, v, hand) {
        this.position = position;
        this.v = v;
        this.hand = hand;
        this.mass = 1.0;
    }

    draw(context) {

        let r = Game.radius;

        let image = Canvas.items[this.hand];

        if (image) { // loads the image
            context.drawImage(image, this.position[0] - r, this.position[1] - r, 2 * r, 2 * r);
        }
    }
}

class Game {

    static circles = 45;    // CHANGE THIS TO CHANGE THE NUMBER OF HANDS

    static radius = 20;

    constructor() {

        this.points = [];
        this.isRunning = false;

        EventEmitter.on("collision", (obj1, obj2) => {

            obj1.hand = obj2.hand = Rules.handWin(obj1.hand, obj2.hand);
                
        });
    }


    init(canvas, numberOfCircles) {

        this.points = [];
        let r = Game.radius;
        let h = canvas.canvas.height / (2 * r);
        let w = canvas.canvas.width / (2 * r);        

        for (let i = 1; i < w - 1; i++) {

            for (let j = 1; j < h - 1; j++) { // randomly obtaining the initial position, velocity with direction and the hand

                let pos = [2 * r * i, 2 * r * j];
                let v = [RandomGenerator.pickOne([1, -1]), RandomGenerator.pickOne([1, -1])];
                let hand = RandomGenerator.randomInteger(0, 2);

                let p = new Circle(pos, v, hand);

                this.points.push(p);
            }
        }

        this.points = RandomGenerator.pickSet(this.points, numberOfCircles); // resizing into an initial number of circles
    }

    theButton() {
        this.isRunning = !this.isRunning;
    }

    update(i) {

        if (!this.isRunning) {
            return;
        }

        let obj1 = this.points[i];

        for (let j = i + 1; j < this.points.length; j++) {

            let obj2 = this.points[j];

            Collision.isCollided(obj1, obj2);
        }

        Collision.wallCollisions(this.points, i, canvas.canvas.width, canvas.canvas.height);

        obj1.position = Collision.arraySum(obj1.position, obj1.v);
    }

    draw(canvas) {

        canvas.cleanCanvas();

        for (let i = 0; i < this.points.length; i++) {
            this.points[i].draw(canvas.context);
            this.update(i);
        };
    }
}

//done