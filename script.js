// --- STARTING SEQUENCE ---
function startSeq(e) {
	if (e.which === 32) {
		document.removeEventListener("keydown", startSeq);
		console.log("Space");
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
	var iconHeight;
	var tHeight = $("#track").height();
	for (var i = 0; i < icons.length; i++) {
		iconHeight = document.getElementById(icons[i]).clientHeight;
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
	$("#cat").css("display", "initial");
	$("#mouse").css("display", "initial");
}

// --- MOUSE MOVEMENT ---
function moveMouse() {
	// Check to see if game is over
	isGameOver();

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
		console.log("Cat in X and Y axis");
		gameOver(0);
	}

	// Check if mouse made it to edge of the track
	if (mPos.left + (2 * mWidth) >= $("#track").width()) {
		console.log(mPos.left, mWidth, $("#track").width());
		console.log("Mouse escaped");
		gameOver(1);
	}
}

// --- GAME OVER SEQUENCE ---
function gameOver(winState) {
	clearInterval(clock);
	// Add and Remove event listeners
	$("#cat").css("display", "none");

	// Cat wins
	if (winState === 0) {
		console.log("Cat wins");
		$("#mouse").attr("src", "images/gravestone.png");
	}
	else {
		console.log("Mouse wins");
		$("#mouse").attr("src", "images/cheese.png");		
	}
}

var clock;
var countDown;

// --- RUN ---
$(function () {
	$("#cat").css("display", "none");
	$("#mouse").css("display", "none");
	// Add Event Listeners
	document.addEventListener("keydown", startSeq);
});




