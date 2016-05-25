// --- STARTING SEQUENCE ---
function startSeq(e) {
	if (e.which === 32) {
		document.removeEventListener("keydown", startSeq);
		$("#cat").css("visibility", "hidden");
		$("#mouse").css("visibility", "hidden");
		$("#sliderParent").css("visibility","hidden");
		$("#difficulty").css("visibility","hidden");
		$("#cat").css("left", 0);
		$("#mouse").css("left", 0);
		startPosns();
		var speed = getSpeed();
		var i = 3;
		$("#start").html(i + "...");
		i--;
		countDown = window.setInterval(function() {
			$("#start").html(i + "...");
			i--;
			if (i === -1) {
				clearInterval(countDown);
				$("#start").html("Go!");
				document.addEventListener("keydown", moveCat);
				clock = window.setInterval(function() {
					moveMouse();
				}, speed);
			}
		},1000);
	}
}

// Calculate mouse speed for difficulity
function getSpeed() {
	var slideVal = $("#slider").val();
	var speed = Math.abs(Number(slideVal));
	return speed;
}

// Randomly place cat and mouse on Y axis
function startPosns() {
	var icons = ["cat","mouse"];
	var top = [];
	var tHeight = $("#track").height();
	for (var i = 0; i < icons.length; i++) {
		var iconHeight = $("#"+icons[i]).height();
		top[i] = (tHeight - iconHeight) * Math.random();
	}
	// If too close, call function again
	if (Math.abs(top[0] - top[1]) < 75) {
		top = [];
		startPosns();
	}
	// Render cat and mouse at starting positions
	$("#cat").css("top", top[0]);
	$("#mouse").css("top", top[1]);	
	$("#cat").css("visibility", "visible");
	$("#mouse").css("visibility", "visible");
}

// --- MOVEMENT ---
function move(dir, animal) {
	animal = "#" + animal;
	var xPos = $(animal).position().left;
	var yPos = $(animal).position().top;
	var tWidth = $("#track").width();
	var tHeight = $("#track").height();
	var aWidth = $(animal).width();
	var aHeight = $(animal).height();
	var xMove = tWidth / 50;
	var yMove = tHeight / 25;

	// Move right
	if (dir === "right") {
		if (xPos + xMove + aWidth < tWidth) {
			$(animal).css("left", xPos + xMove);
		}
		else {
			$(animal).css("left", tWidth - aWidth);
		}
	}
	// Move left
	if (dir === "left") {
		if (xPos - xMove > 0) {
			$(animal).css("left", xPos - xMove);
		}
		else {
			$(animal).css("left", 0);
		}
	}
	// Move up
	if (dir === "up") {
		if (yPos - yMove > 0) {
			$(animal).css("top", yPos - yMove);
		}
		else {
			$(animal).css("top", 0);
		}
	}
	// Move down
	if (dir === "down") {
		if (yPos + yMove < tHeight - aHeight) {
			$(animal).css("top", yPos + yMove);
		}
		else {
			$(animal).css("top", tHeight - aHeight);
		}
	}
}

// --- MOVE CAT ---
function moveCat(e) {
	// Move right
	if (e.which === 39) {
		move ("right", "cat");
	}
	// Move left
	if (e.which === 37) {
		move ("left", "cat");
	}
	// Move up
	if (e.which === 38) {
		move ("up", "cat");
	}
	// Move down
	if (e.which === 40) {
		move ("down", "cat");
	}
}

// --- MOVE MOUSE ---
function moveMouse() {
	// Check to see if game is over
	var finished = isGameOver();
	if (finished != 1) {
		// Move right
		move ("right", "mouse");
		// Move up or down
		if (Math.random() > 0.5) {
			move ("up", "mouse");			
		}
		else {
			move ("down", "mouse");
		}
	}
}

// --- CHECK FOR GAME OVER ---
function isGameOver() {
	var cPos = $("#cat").position();
	var cWidth = $("#cat").width();
	var cHeight = $("#cat").height();
	var cCenter = [cPos.left + (cWidth / 2), cPos.top + (cHeight / 2)];
	var mPos = $("#mouse").position();
	var mWidth = $("#mouse").width();
	var mHeight = $("#mouse").height();

	// Check if cat caught mouse
	if (cCenter[0] > mPos.left && cCenter[0] < mPos.left + mWidth && cCenter[1] > mPos.top && cCenter[1] < mPos.top + mHeight) {
		catWins++;
		gameOver(0);
		return 1;
	}

	// Check if mouse made it to edge of the track
	if (mPos.left + (2 * mWidth) >= $("#track").width()) {
		mouseWins++;
		gameOver(1);
		return 1;
	}
	return 0;
}

// --- GAME OVER SEQUENCE ---
function gameOver(winState) {
	clearInterval(clock);
	$("#mouse").css("visibility", "hidden");
	document.removeEventListener("keydown", moveCat);
	var pos = $("#mouse").position();
	var l = pos.left.toString() + "px";
	var t = pos.top.toString() + "px";

	$("#wins").html("Cat wins: " + catWins + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Mouse wins: " + mouseWins);

	// Cat wins
	if (winState === 0) {
		$("#track").append('<img src="images/gravestone.png" style="position:absolute;height:3rem;left:' + l + ';top:' + t + '"' + '>');
		$("#cat").css("visibility", "hidden");
	}
	// Mouse wins
	else {
		l = $("#track").width() - $("#mouse").width();
		l = l.toString() + "px";
		$("#track").append('<img src="images/cheese.png" style="position:absolute;height:3rem;left:' + l + ';top:' + t + '"' + '>');
	}

	$("#sliderParent").css("visibility","visible");
	$("#difficulty").css("visibility","visible");
	$("#start").html("2. Press space to play again");
	document.addEventListener("keydown", startSeq);
}

// Prevent arrow keys and space bar from scrolling the page
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    	e.preventDefault();
    }
  }, false);

// --- GLOBAL VARIABLES ---
var clock;
var countDown;
var catWins = 0;
var mouseWins = 0;

// --- RUN ---
$(function () {
	$("#cat").css("visibility", "hidden");
	$("#mouse").css("visibility", "hidden");
	document.addEventListener("keydown", startSeq);
});