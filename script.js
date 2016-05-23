// Starting sequence
// Randomly place cat and mouse on Y axis
function startPosns() {
	var icons = ["cat","mouse"];
	var top = [];
	var iconHeight;
	var trackHeight = document.getElementById("track").clientHeight;
	for (var i = 0; i < icons.length; i++) {
		iconHeight = document.getElementById(icons[i]).clientHeight;
		top[i] = (trackHeight - iconHeight) * Math.random();
	}
	// If too close, call function again
	if (Math.abs(top[0] - top[1]) < 75) {
		top = [];
		startPosns();
	}
	// Render cat and mouse at starting positions
	$("#cat").css("top", top[0]);
	$("#mouse").css("top", top[1]);	
}

// Mouse movement
function moveMouse() {
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
			//move it down
			$("#mouse").css("top", yPos + yMove);
		}
		else {
			$("#mouse").css("top", $("#track").height() - $("#mouse").height());
		}
	}

	// isGameOver();
}


// Cat movement
function moveCat(e) {
	var xPos = $("#cat").position().left;
	var tWidth = $("#track").width(); 
	var xMove = tWidth / 50;
	console.log(xPos);


// FIX ME UP FROM HERE
// MAKE IT SO IF CAT MOVES TOO FAR RIGHT, SET ITS POSN RIGHT MOST IN TRACK
	// Right arrow
	if (e.which === 39) {
		if ( xPos + xMove > $("#") )
		$("#cat").css("left", xPos + xMove);
		console.log(xPos);
	}

	// Left arrow
	if (e.which === 37) {
		if( xPos - xMove < 0 ) {
			$("#cat").css("left", 0);
			console.log("Can't move back");
		}
		else {
			$("#cat").css("left", xPos - xMove);
		}
		console.log(xPos);
	}

	// Up arrow
	// if (e.which === 38) {

	// }


}




// Run
// --- RUN ---
$(function () {
	// Add Event Listeners
	document.addEventListener("keydown",moveCat);

	startPosns();
	window.setInterval(function() {
		moveMouse();
	}, 5000);


})




