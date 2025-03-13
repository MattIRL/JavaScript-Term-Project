var myGamePiece;
var myObstacles = [];
var myBackgrounds = [];
var myScore;
var myLevel;
var score = 0;
var levelChanged = false;

function startGame() {
    myGamePiece = new component(100, 45, "media/car.png", 10, 190, "image");
    myScore = new component("30px", "Impact", "whitesmoke", 560, 80, "text");
    myLevel = new component("30px", "Impact", "whitesmoke", 160, 80, "text");

    var bgWidth = 960;
    var bgHeight = 540;

    myBackgrounds.push(new component(bgWidth, bgHeight, "media/topDownRoad.jpg", 0, 0, "image", false));
    myBackgrounds.push(new component(bgWidth, bgHeight, "media/topDownRoad.jpg", bgWidth, 0, "image", false));

    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);

        //Keyboard event listeners
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    // collision DISQUALIFIED function
    stop: function () {
        clearInterval(this.interval);
        document.getElementById("instructions").innerHTML = "<em style = 'color: red'>DISQUALIFIED!";


    }
}


function component(width, height, color, x, y, type, collidable) {
    this.type = type;
    this.collidable = collidable !== undefined ? collidable : true;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    // Load object as image instead of color
    if (type == "image") {
        this.image = new Image();
        // throw error if image is not found
        this.image.onerror = function() {
            console.error("Error loading image: ", color);
        }
        this.image.src = color;
    }
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if (type == "image") {
            // make sure image is loaded before drawing
            if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        }

        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myObstacles[i].collidable && myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    score++;

    for (i = 0; i < myBackgrounds.length; i += 1) {
        myBackgrounds[i].x += -1;
        if (myBackgrounds[i].x <= -myBackgrounds[i].width){
            myBackgrounds[i].x = myBackgrounds.reduce((max, bg) => Math.max(max, bg.x), 0) + myBackgrounds[i].width -1;
         }
         myBackgrounds[i].newPos();
         myBackgrounds[i].update();
    }
    if (myGameArea.frameNo == 1 || everyinterval(200)) {
        x = myGameArea.canvas.width;
        minHeight = 40;
        maxHeight = 250;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 150;
        maxGap = 240;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        var topObstacle = new component(2, height, "rgba(0, 0, 0, 0)", x, 0, "color", true);
        myObstacles.push(topObstacle);
        var bottomObstacle = new component(2, x - height - gap, "rgba(0, 0, 0, 0)", x, height + gap, "color", true);
        myObstacles.push(bottomObstacle);
        var topCone = new component(23, 33, "media/Cone.png", x - 10, height - 30, "image", false);
        myObstacles.push(topCone);
        var bottomCone = new component(23, 33, "media/Cone.png", x - 10, height + gap, "image", false);
        myObstacles.push(bottomCone);
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }

    var currentLevel = Math.round(score / 500);
    myScore.text = "Score: " + score;
    myScore.update();
    myLevel.text = "Level: " + currentLevel;
    myLevel.update();
    if (score % 500 === 0 && !levelChanged) {
        levelChanged = true;
        clearInterval(myGameArea.interval);
        var newSpeed = Math.max(1, 10 - (currentLevel));
        myGameArea.interval = setInterval(updateGameArea, newSpeed);
    }
    else if (score % 500 !== 0) {
        levelChanged = false;
    }
    if (localStorage.autocrossHighScore === undefined) {
        localStorage.autocrossHighScore = 0;
    }
    if (localStorage.autocrossHighScore < score) {
        localStorage.autocrossHighScore = score;
        document.getElementById("highScore").innerHTML = "Your High Score: " + localStorage.autocrossHighScore;
    }
    else {
        document.getElementById("highScore").innerHTML = "Your High Score: " + localStorage.autocrossHighScore;
    }
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speedY = 1; }
    myGamePiece.newPos();
    myGamePiece.update();

}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}
