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
	timeString += "." + formatDigits(time.getUTCMilliseconds());

	return timeString;
}	

Timer.prototype.restart = function() {
	this.startTime = new Date().getTime();
}

function Updater(func, elem) {
	this.func = func;
	this.elem = elem;
	this.isRunning = true;
	this.intervalID = setInterval( function() { this.elem.innerHTML = this.func(); }, 10 );
}

Updater.prototype.start = function() {
	this.isRunning = true;
	this.intervalID = setInterval( function() { this.elem.innerHTML = this.func(); }, 10 );
}

Updater.prototype.stop = function() {
	this.isRunning = false;
	this.intervalID = clearInterval(this.intervalID);
}

Updater.prototype.toggle = function() {
	if(this.isRunning) {
		this.stop();
	} else {
		this.start();
	}
}

var timer = new Timer();
var updater = new Updater(timer.getString, document.getElementById("timer"));

//clearInterval(intervalID);
//var intervalID = setInterval(update, 10);

function keyupevent(evt) {
	console.log(evt.keyCode);

	switch(evt.keyCode) {
	case 32: // ' '
		updater.toggle();
		break;
	case 67: // 'c'
//		toggle(false);
		break;
	case 82: // 'r'
//		restart();
		break;
	default:
		break;
	}
}
