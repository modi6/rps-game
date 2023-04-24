class Collision {

    static scaling(arr, num) {
        let res = new Array(this.length);

        for (let i = 0; i < arr.length; i++) {
            res[i] = arr[i] * num;
        }

        return res;
    }

    static findNorm(arr){
        let norm = 0.0;

        for (let i = 0; i < arr.length; i++) {
            norm += Math.pow(arr[i], 2);
        }

        return Math.sqrt(norm);
    }

    static unitV(arr){

        let val = this.findNorm(arr);

        let res = new Array(arr.length);

        if (val != 0) {
            for (let i = 0; i < arr.length; i++) {
                res[i] = arr[i] / val;
            }
        }

        return res;
    }

    static arraySubtract(arr1, arr2){
        let arr = new Array(arr1.length);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr1[i] - arr2[i];
        }

        return arr;
    }

    static arraySum(arr1, arr2){
        let arr = new Array(arr1.length);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr1[i] + arr2[i];
        }

        return arr;
    }

    static arrayDotProduct(arr1, arr2){
        let product = 0.0;

        for (let i = 0; i < arr1.length; i++) {
            product += arr1[i] * arr2[i];
        }

        return product;
    }

    static twoItems(pos1, pos2, r1, r2) {

        let radius = r1 + r2;

        let n = this.arraySubtract(pos1, pos2);

        return this.findNorm(n) < radius ? true : false;
    }

    static isCollided(circle1, circle2) { // verifying the collision

        if (Collision.twoItems(circle1.position, circle2.position, Game.radius, Game.radius)) {

            Collision.allObjectCollisions(circle1, circle2);

            EventEmitter.emit("collision", circle1, circle2);
        }
    }

    static wallCollisions(circles, i, w, h) { // to handle collisions with wall

        let c = circles[i];

        let radius = Game.radius;
        let position1 = c.position;
        let velocity1 = c.v;

        if (position1[0] < radius) {
            velocity1[0] = -1 * velocity1[0];
            position1[0] = radius;
        }
        if (position1[1] < radius) {
            velocity1[1] = -1 * velocity1[1];
            position1[1] = radius;
        }
        if (position1[0] > w - radius) {
            velocity1[0] = -1 * velocity1[0];
            position1[0] = w - radius;
        }
        if (position1[1] > h - radius) {
            velocity1[1] = -1 * velocity1[1];
            position1[1] = h - radius;
        }

        c.x = position1[0];
        c.y = position1[1];

        c.v = velocity1;
    }

    static allObjectCollisions(circle1, circle2) { // to handle collisions between circles

        // this was the hardest part of the whole project

        let pos1 = circle1.position;
        let pos2 = circle2.position;

        let r = 2 * Game.radius;

        let normal = this.arraySubtract(pos1, pos2);

        let dr = (r - this.findNorm(normal)) / 2; 

        let unitNorm = this.unitV(normal);

        circle1.position = this.arraySum(pos1, this.scaling(unitNorm, dr));
        circle2.position = this.arraySum(pos2, this.scaling(unitNorm, -1 * dr));


        let velocity1 = circle1.v;
        let velocity2 = circle2.v;

        let unitTan = [-unitNorm[1], unitNorm[0]];


        let velocity1norm = this.arrayDotProduct(unitNorm, velocity1);
        let velocity1tan = this.arrayDotProduct(unitTan, velocity1);
        let velocity2norm = this.arrayDotProduct(unitNorm, velocity2);
        let velocity2tan = this.arrayDotProduct(unitTan, velocity2);


        let totalMass = circle1.mass + circle2.mass;
        let newVelocity1norm = ((circle1.mass - circle2.mass) * velocity1norm + 2.0 * velocity2norm * circle2.mass) / totalMass;
        let newVelocity2norm = ((circle2.mass - circle1.mass) * velocity2norm + 2.0 * velocity1norm * circle1.mass) / totalMass;



        circle1.v = this.arraySum(this.scaling(unitNorm, newVelocity1norm), this.scaling(unitTan, velocity1tan));

        circle2.v = this.arraySum(this.scaling(unitNorm, newVelocity2norm), this.scaling(unitTan, velocity2tan));
    }

    
}

//done