function repeatOften() {
    rps.draw(canvas);
    requestAnimationFrame(repeatOften);
}

let canvas = new Canvas("rps-game");

canvas.getPicture(Rules.rock, "images/rock.png");
canvas.getPicture(Rules.paper, "images/paper.png");
canvas.getPicture(Rules.scissors, "images/scissors.png");

let rps = new Game();

rps.init(canvas, Game.circles);

requestAnimationFrame(repeatOften);

let button = document.getElementById("btn");

button.onclick = function(){
    rps.theButton();
    button.textContent = rps.isRunning ? "Stop the game" : "Continue";
};

//done