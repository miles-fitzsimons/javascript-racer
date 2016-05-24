// --- STARTING SEQUENCE ---
function startSeq(e) {
	if (e.which === 32) {
		document.removeEventListener("keydown", startSeq);
		$("#cat").css("visibility", "hidden");
		$("#mouse").css("visibility", "hidden");
		$("#cat").css("left", 0);
		$("#mouse").css("left", 0);
		// $("#start").html("Press space to start");
		// document.addEventListener("keydown", startSeq);

		startPosns();
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
				}, 50);
			}
		},1000);
	}
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

// --- MOUSE MOVEMENT ---
function moveMouse() {
	// Check to see if game is over
	var finished = isGameOver();

	if (finished != 1){
		// Move right
		var xPos = $("#mouse").position().left;
		var xMove = $("#track").width() / 50;
		$("#mouse").css("left", xPos + xMove);

		// Choose if mouse moves up or down and move accordingly
		var yPos = $("#mouse").position().top;
		var yMove = $("#track").height() / 50;

		// Move up
		if (Math.random() > 0.5) {
			if( yPos - yMove > 0) {
				$("#mouse").css("top", yPos - yMove);
			}
			else {
				$("#mouse").css("top",0);
			}
		}
		// Move down
		else {
			var maxTop = $("#track").height() - $("#mouse").height();
			if ( yPos + yMove < maxTop ) {
				$("#mouse").css("top", yPos + yMove);
			}
			else {
				$("#mouse").css("top", $("#track").height() - $("#mouse").height());
			}
		}
	}
}

// --- CAT MOVEMENT ---
function moveCat(e) {
	var xPos = $("#cat").position().left;
	var yPos = $("#cat").position().top;
	var tWidth = $("#track").width();
	var tHeight = $("#track").height();
	var cWidth = $("#cat").width();
	var cHeight = $("#cat").height();
	var xMove = tWidth / 50;
	var yMove = tHeight / 50;

	// Right arrow
	if (e.which === 39) {
		if ( xPos + xMove + cWidth < tWidth ) {
			$("#cat").css("left", xPos + xMove);
		}
		else {
			$("#cat").css("left", tWidth - cWidth);
		}
	}
	// Left arrow
	if (e.which === 37) {
		if( xPos - xMove < 0 ) {
			$("#cat").css("left", 0);
		}
		else {
			$("#cat").css("left", xPos - xMove);
		}
	}
	// Up arrow
	if (e.which === 38) {
		if( yPos - yMove > 0) {
			$("#cat").css("top", yPos - yMove);
		}
		else {
			$("#cat").css("top",0);
		}		
	}
	// Down arrow
	if (e.which === 40) {
		if ( yPos + yMove < tHeight - cHeight ) {
			$("#cat").css("top", yPos + yMove);
		}
		else {
			$("#cat").css("top", tHeight - cHeight);
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

	$("#start").html("Press space to play again");
	document.addEventListener("keydown", startSeq);
}

// Prevent up and down arrow keys and space bar from scrolling the page
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 38, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

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