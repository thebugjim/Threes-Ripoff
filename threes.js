var redCount = 0;
var blueCount = 0;
document.onkeydown = checkKey;
document.onload = reset();

function checkKey(e) {
	e = e || window.event;
	if (e.keyCode == '37') {moveLeft();}
	if (e.keyCode == '38') {moveUp();}
	if (e.keyCode == '39') {moveRight();}
	if (e.keyCode == '40') {moveDown();}
}

function moveLeft() {
	var moveables = [];
	for (var h = 1; h < 14; h+= 4) {
		var moveable = false;
		for (var i = h; i < h+3; i++) {
			moveable |= canMove(i,i+1);
			move(i,i+1);
		}
		if (moveable == true) {moveables.push(h+3)}
	}
	if (moveables.length > 0) {generateTileAt(shuffle(moveables)[0]);}
	if (movesRemaining() == false) {
		document.getElementById("score").innerHTML=calculateScore();
	}
}

function moveUp() {
	var moveables = [];
	for (var h = 1; h < 5; h++) {
		var moveable = false;
		for (var i = h; i < h+12; i+=4) {
			moveable |= canMove(i,i+4);
			move(i,i+4);
		}
		if (moveable == true) {moveables.push(h+12)}
	}
	if (moveables.length > 0) {generateTileAt(shuffle(moveables)[0]);}
	if (movesRemaining() == false) {
		document.getElementById("score").innerHTML=calculateScore();
	}
}

function moveRight() {
	var moveables = [];
	for (var h = 4; h < 17; h+= 4) {
		var moveable = false;
		for (var i = h; i > h-3; i--) {
			moveable |= canMove(i,i-1);
			move(i,i-1);
		}
		if (moveable == true) {moveables.push(h-3)}
	}
	if (moveables.length > 0) {generateTileAt(shuffle(moveables)[0]);}
	if (movesRemaining() == false) {
		document.getElementById("score").innerHTML=calculateScore();
	}
}

function moveDown() {
	var moveables = [];
	for (var h = 13; h < 17; h++) {
		var moveable = false;
		for (var i = h; i > h-12; i-=4) {
			moveable |= canMove(i,i-4);
			move(i,i-4);
		}
		if (moveable == true) {moveables.push(h-12)}
	}
	if (moveables.length > 0) {generateTileAt(shuffle(moveables)[0]);}
	if (movesRemaining() == false) {
		document.getElementById("score").innerHTML=calculateScore();
	}
}

function reset() {
	redCount = 0;
	blueCount = 0;
	for (var i = 1; i < 17; i++) {
		document.getElementById(i).innerHTML='0';
		document.getElementById(i).style.color='white';
		document.getElementById(i).style.backgroundColor='white';
	}
	var startingNums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
	startingNums = (shuffle(startingNums)).splice(0,9);
	document.getElementById("next").value = Math.floor(Math.random() * 3);
	for (num in startingNums) {
		num = startingNums[num];
		generateTileAt(num);
	}
	document.getElementById("score").innerHTML='';
}

function generateTileAt(num) {
	var nextColor = document.getElementById("next").value;
	document.getElementById(num).innerHTML=nextColor+1;
	document.getElementById(num).style.color='black';
	if (nextColor == 0) {
		document.getElementById(num).style.backgroundColor="rgb(94,226,255)";
		blueCount += 1;
	}
	if (nextColor == 1) {
		document.getElementById(num).style.backgroundColor="rgb(243,85,103)";
		redCount += 1;
	}
	nextColor = Math.floor(Math.random() * 3);
	while (true) {
		if (nextColor == 0 && blueCount-redCount < 2) {
			document.getElementById("next").style.backgroundColor="rgb(94,226,255)";
			break;
		}
		else if (nextColor == 1 && redCount-blueCount < 2) {
			document.getElementById("next").style.backgroundColor="rgb(243,85,103)";
			break;
		}
		else if (nextColor == 2) {
			document.getElementById("next").style.backgroundColor="white";
			break;
		}
		else {
			nextColor = Math.floor(Math.random() * 3);
		}
	}
	document.getElementById("next").value = nextColor;
}

function move(aIndex,bIndex) {
	var a = parseInt(document.getElementById(aIndex).innerHTML);
	var b = parseInt(document.getElementById(bIndex).innerHTML);
	if ((a == 2 && b == 1) || (a == 1 && b == 2) || (a == 0 && b != 0) /*|| (a != 0 && b == 0)*/ || (a == b && a >= 3)) {
		document.getElementById(aIndex).innerHTML=a+b;
		if (a+b > 0) {document.getElementById(aIndex).style.color='black';}
		document.getElementById(bIndex).innerHTML=0;
		document.getElementById(bIndex).style.color='white';
		if ((a+b)%3 == 0) {
			document.getElementById(aIndex).style.backgroundColor='white';
		}
		if (a+b == 1) {
			document.getElementById(aIndex).style.backgroundColor="rgb(94,226,255)";
		}
		if (a+b == 2) {
			document.getElementById(aIndex).style.backgroundColor="rgb(243,85,103)";
		}
		document.getElementById(bIndex).style.backgroundColor='white';
	}
}

function canMove(aIndex,bIndex) {
	var a = parseInt(document.getElementById(aIndex).innerHTML);
	var b = parseInt(document.getElementById(bIndex).innerHTML);
	if ((a == 2 && b == 1) || (a == 1 && b == 2) || (a == 0 && b != 0) /*|| (a != 0 && b == 0)*/ || (a == b && a >= 3)) {return true}
	else {return false;}
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function movesRemaining() {
	var moveable = false;
	for (var h = 1; h < 14; h+= 4) {
		for (var i = h; i < h+3; i++) {
			moveable |= canMove(i,i+1);
		}
	}
	for (var h = 1; h < 5; h++) {
		for (var i = h; i < h+12; i+=4) {
			moveable |= canMove(i,i+4);
		}
	}
	for (var h = 4; h < 17; h+= 4) {
		for (var i = h; i > h-3; i--) {
			moveable |= canMove(i,i-1);
		}
	}
	for (var h = 13; h < 17; h++) {
		for (var i = h; i > h-12; i-=4) {
			moveable |= canMove(i,i-4);
		}
	}
	return moveable;
}

function calculateScore() {
	var score = 0;
	for (var i = 1; i < 17; i++) {
		nextNum = parseInt(document.getElementById(i).innerHTML);
		if (nextNum < 3) {}
		else {
			nextScore = 3;
			for (var j = 3; j < nextNum; j *= 2) {nextScore *= 3;}
			score += nextScore;
		}
	}
	return score;
}