window.addEventListener("keydown",aUp);
window.addEventListener("keydown",lUp);

var count1 = 2;
var count2 = 2;
var str1 = count1.toString();
var str2 = count2.toString();

// Move car 1
function aUp(e){
	console.log("Player 1: " + e.which);
	if(count1>83){
		// Display player 1 wins and remove key listeners
		document.getElementById("p1win").style.display = "initial";
		window.removeEventListener("keydown",aUp);
		window.removeEventListener("keydown",lUp);

	}
	else if(e.which==65){
		count1 +=1;
		str1 = count1.toString();
		console.log("count1 : " + count1);
		console.log("str1: " + str1);
		document.getElementById("car1").style.left = str1 + "%";
	}
}

// Move car 2
function lUp(e){
	console.log("                  Player 2: " + e.which);
	if(count2>83){
		// Display player 2 wins and remove key listeners
		document.getElementById("p2win").style.display = "initial";
		window.removeEventListener("keydown",aUp);
		window.removeEventListener("keydown",lUp);


	}
	else if(e.which==76){
		count2 +=1;
		str2 = count2.toString();
		console.log("                  count2 : " + count2);
		console.log("                  str2: " + str2);
		document.getElementById("car2").style.left = str2 + "%";
	}
}





// var car = document.getElementById("car1");
// if(car){car.addEventListener("click", callCL);}

// function callCL(){
// 	console.log("hello!");
// }






// window.addEventListener("keyup", moveCar1);

// function moveCar1(){
// 	document.getElementById("test").innerHTML = "Hi";
// }













// function testFunction(){


// 	var cell = document.getElementsByClassName("active");
// 	cell = cell[0];
// 	var next = cell.nextElementSibling;
// 	if(next==null)
// 		{alert("end");}

// 	next.classList.add("active");
// 	cell.classList.remove("active");

// }


// Make a browser display what key is pressed.

// window.addEventListener("keyup", testFunction);

// function testFunction(e){
	
// 		document.getElementById("demo").innerHTML += e.keyCode + '\n';

// 		if(e.charCode==102){document.getElementById("demo").innerHTML+="fff";}

// 		if(e.charCode==101){document.getElementsByClassName("demo2").classList.add}

// }



// document.getElementById("demo").innerHTML += e.keyCode;
// }