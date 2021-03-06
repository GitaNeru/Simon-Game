var game = [];
var user = [];
var rand = 1;
var count = 0;
var counter = 0;
var userCount = 0;
var n = 0;
var greenAudio  = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var redAudio    = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio   = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

$('#green').click(function() {
	green();
	user.push(1);
	userPlay();
});

$('#red').click(function() {
	red();
	user.push(2);
	userPlay();	
});

$('#yellow').click(function() {
	yellow();
	user.push(3);
	userPlay();	
});

$('#blue').click(function() {
	blue();
	user.push(4);
	userPlay();	
});

function green() {
	reset();
	$('#green').toggleClass("clickedGreen");
	greenAudio.play();
}
function red() {
	reset()
	$('#red').toggleClass("clickedRed");
	redAudio.play();
}
function yellow() {
	reset()	
	$('#yellow').toggleClass("clickedYellow");
	yellowAudio.play();
}
function blue() {
	reset()
	$('#blue').toggleClass("clickedBlue");
	blueAudio.play();
}


function reset() {
	$("#green").removeClass("clickedGreen");
	$("#red").removeClass("clickedRed");
	$("#yellow").removeClass("clickedYellow");
	$("#blue").removeClass("clickedBlue");			
}


$("#startGame").click(function() {

	if ( w > 0 ) {

	$(".green").removeClass("greenWinner");
	$(".red").removeClass("redWinner");
	$(".yellow").removeClass("yellowWinner");
	$(".blue").removeClass("blueWinner");

	n = 0;
	game = [];
	user = [];
	count = 0;
	counter = 0;
	userCount = 0;
	document.getElementById("gameCounter").innerHTML = 1;	
	machine();

	}

	else {
		console.log("Game is off");
	}

});


var z = -1;
var w = -1;


$('#switchRight').change(function(){

	z *= -1;
	console.log("Strict Mode On/Off");

});

$('#switchLeft').change(function(){

	w *= -1;
	console.log("Game On/Off");

	if ( w > 0 ) {
		$("#startGame").css("color", "black");
	}

	if ( w < 0 ) {

		n = 0;
		game = [];
		user = [];
		count = 0;
		counter = 0;
		userCount = 0;
		reset();
		document.getElementById("gameCounter").innerHTML = "--";	

		$("#startGame").css("color", "rgb(200,200,200");

		$(".green").removeClass("greenLoser");
		$(".red").removeClass("redLoser");
		$(".yellow").removeClass("yellowLoser");
		$(".blue").removeClass("blueLoser");

		$(".green").removeClass("greenWinner");
		$(".red").removeClass("redWinner");
		$(".yellow").removeClass("yellowWinner");
		$(".blue").removeClass("blueWinner");

	}

});


function machine() {

	var x = 1;

	function clear() {
		clearInterval(machine);
	}

	if ( count > 0 ) {
		x = 0;
	}

	var machine = setInterval(function() {

			reset();
			random();
			simon();
			count++;

			
			if (count === counter + 1) {
				clear();
				setTimeout(function() {
					reset();
				}, 500);
			}

		

	}, 750 * x); 

};


function random() {
	rand = Math.floor((Math.random() * 4) + 1);
	game.push(rand);
	return rand;
}

// Assign the number to a button:
function simon() {

	if (rand === 1) {
		green();
		console.log("Clicked Green");
	}
	else if (rand === 2) {
		red();
		console.log("Clicked Red");
	}
	else if (rand === 3) {
		yellow();
		console.log("Clicked Yellow");		
	}
	else if (rand === 4) {
		blue();
		console.log("Clicked Blue");			
	}

}
function userPlay() {	
	if ( user[userCount] === game[userCount] && game.length === 5 && user.length === game.length ) {
		console.log("game over, you win!");

		$(".green").addClass("greenWinner");
		$(".red").addClass("redWinner");
		$(".yellow").addClass("yellowWinner");
		$(".blue").addClass("blueWinner");

		document.getElementById("gameCounter").innerHTML = "^_^";			
		document.getElementById("gameTitle").innerHTML = "Winner!";
	}
	
	else if ( user.length === game.length && user[userCount] === game[userCount] ) {
		console.log("correct!");
		user = [];
		userCount = 0;

		setTimeout(function() {
			counter++;
			document.getElementById("gameCounter").innerHTML = counter + 1;			
			reset();
			check();
		}, 500);
	}
	
	else if ( user[userCount] === game[userCount] ) {
		console.log("correct!");
		userCount++;
		setTimeout(function() {
			reset();
		}, 500);
	}

	else if ( z > 0 ) {

		console.log("wrong!");
		game = [];
		user = [];
		count = 0;
		counter = 0;
		n = 0;
		document.getElementById("gameCounter").innerHTML = "!!!";
		document.getElementById("gameTitle").innerHTML = "Wrong!";

		$(".green").addClass("greenLoser");
		$(".red").addClass("redLoser");
		$(".yellow").addClass("yellowLoser");
		$(".blue").addClass("blueLoser");

		setTimeout(function() {

			document.getElementById("gameCounter").innerHTML = 1;
			document.getElementById("gameTitle").innerHTML = "Simon<sup>®</sup>";

			$(".green").removeClass("greenLoser");
			$(".red").removeClass("redLoser");
			$(".yellow").removeClass("yellowLoser");
			$(".blue").removeClass("blueLoser");

			machine();

		}, 1750);
	}

	else {

		n = 0;

		document.getElementById("gameCounter").innerHTML = "!!!";
		document.getElementById("gameTitle").innerHTML = "Wrong!";

		$(".green").addClass("greenLoser");
		$(".red").addClass("redLoser");
		$(".yellow").addClass("yellowLoser");
		$(".blue").addClass("blueLoser");

		setTimeout(function() {

			$(".green").removeClass("greenLoser");
			$(".red").removeClass("redLoser");
			$(".yellow").removeClass("yellowLoser");
			$(".blue").removeClass("blueLoser");

			document.getElementById("gameCounter").innerHTML = counter + 1;			
			document.getElementById("gameTitle").innerHTML = "Simon<sup>®</sup>";

			checkRepeat();

		}, 750);

	}

}


function repeat() {

	if ( game[n] === 1 ) {
		green();
		n++;
	}
	else if ( game[n] === 2) {
		red();
		n++;
	}
	else if ( game[n] === 3) {
		yellow();
		n++;
	}
	else if (game[n] === 4) {
		blue();
		n++;
	}	

}


function check() {

	function clear() {
		clearInterval(timeFunction);
	}

	var timeFunction = setInterval(function() {

		reset();

		if ( n !== game.length ) {
			repeat();
		}
		else if ( n === game.length ) {
			user = [];
			userCount = 0;
			n = 0;
			clear();
			machine();
		}

	}, 750);

}


function checkRepeat() {

	function clear() {
		clearInterval(timeFunction);
	}

	var timeFunction = setInterval(function() {

		reset();

		if ( n !== game.length ) {
			repeat();
		}
		else if ( n === game.length ) {

			user = [];
			userCount = 0;
			n = 0;
			clear();

		}

	}, 750);

}


$("#instructions").click(function() {
	$('#box').show();
});
$("#close").click(function() {
	$('#box').hide();
});