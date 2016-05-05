// Starting sequence
document.addEventListener("keydown",startSeq);

function startSeq(e){
	if(e.which==32){
		document.getElementById("start").innerHTML = "Go!";		
		document.removeEventListener("keydown",startSeq);
		document.addEventListener("keyup",aUp);
		document.addEventListener("keyup",lUp);
	}
}

var count1 = 2;
var count2 = 2;
var str1 = count1.toString();
var str2 = count2.toString();

// Move car 1
function aUp(e){
	if(count1>87){
		// Display player 1 wins and remove key listeners
		gameOver();
		document.getElementById("winLose1").innerHTML = "WINNER!";
		document.getElementById("winLose2").innerHTML = "LOSER!";
	}
	else if(e.which==65){
		count1 +=1;
		str1 = count1.toString();
		document.getElementById("car1").style.left = str1 + "%";
	}
}

// Move car 2
function lUp(e){
	if(count2>86){
		// Display player 2 wins and remove key listeners
		gameOver();
		document.getElementById("winLose1").innerHTML = "LOSER!";
		document.getElementById("winLose2").innerHTML = "WINNER!";
	}
	else if(e.which==76){
		count2 +=1;
		str2 = count2.toString();
		document.getElementById("car2").style.left = str2 + "%";
	}
}

// Ending sequence
function gameOver(){
	document.removeEventListener("keyup",aUp);
	document.removeEventListener("keyup",lUp);
	document.getElementById("winLose1").style.display = "block";
	document.getElementById("winLose2").style.display = "block";
	document.getElementById("car1").style.display = "none";
	document.getElementById("car2").style.display = "none";
	document.getElementById("playAgain").style.display = "block";
	var instructions = document.getElementsByClassName("instructions");
	instructions[0].style.opacity = 0;
	instructions[1].style.opacity = 0;
	document.addEventListener("keyup",trump);
}

// Reload page when race has finished and press space
function trump(e){
	if(e.which==32){
		document.getElementById("wrapper").style.display = "none";
		document.body.style.cssText = 'background-image: url("images/trump2.jpg"); background-size: cover;';
		window.setTimeout(reset, 250);
	}
}

function reset(){
	location.reload();
}