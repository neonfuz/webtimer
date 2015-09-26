function Timer() {
	this.startTime = new Date().getTime();
}

Timer.prototype.getString = function() {
	function formatDigits(number)
	{
		var string = number.toString();

		while(string.length < 2)
			string = "0" + string;

		string = string.substring(0, 2);

		return string;
	}

	var time = new Date();
	time.setTime(time.getTime() - this.startTime);

	var timeString = "";

	timeString += formatDigits(time.getUTCHours());
	timeString += ":" + formatDigits(time.getUTCMinutes());
	timeString += ":" + formatDigits(time.getUTCSeconds());
	timeString += "." + formatDigits(Math.floor(time.getUTCMilliseconds() / 10));
	// Miliseconds are divided by 10 and floored to remove the least significant digit.

	console.log(timeString);
	return timeString;
}	

Timer.prototype.restart = function() {
	this.startTime = new Date().getTime();
}

var timer = new Timer();

function update() { document.getElementById("timer").innerHTML = timer.getString(); };
var intervalID = null;

function start() {
	if(intervalID === null)
		intervalID = setInterval( update, 10 );
}

function stop() {
	if(intervalID !== null) {
		clearInterval(intervalID);
		intervalID = null;
	}
}

function toggle() {
	if(intervalID === null) {
		intervalID = setInterval( update, 10 );
	} else {
		clearInterval(intervalID);
		intervalID = null;
	}
}

//clearInterval(intervalID);
//var intervalID = setInterval(update, 10);

function keyupevent(evt) {
	console.log(evt.keyCode);

	switch(evt.keyCode) {
	case 32: // ' '
		if(intervalID === null)
			timer.restart();
		toggle();
		break;
	case 67: // 'c'
		start();
		break;
	case 82: // 'r'
		timer.restart(); // BUG: if this takes too long, timer might say longer than 00:00:00
		update();
		break;
	default:
		break;
	}
}
