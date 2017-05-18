function log4b() {
	var self = this;
	// config
	self.realTimeLoggingOn = true; // log in real time (forwards to console.log)
	self.recordLogs = true; // set to false after you're done debugging to avoid the log eating up memory
	self.maxLines = 2500; // if autoTrim is true, this many most recent lines are saved
	self.lineMaxChars = 1500; // if one log is max than lineMaxChars, it will be cut
	self.logFilename = 'log4b.txt'; // filename of log downloaded with downloadLog()
	self.lineBreak = '\n\n';

	// log save 
	self.output = '';

	this.getLog = function() {
		return self.recordLogs? self.output : 'log recording is off';
	};

	this.downloadLog = function() {
	    var file = "data:text/plain;charset=utf-8,";
	    var logFile = self.getLog();
	    var encoded = encodeURIComponent(logFile);
	    file += encoded;
	    var a = document.createElement('a');
	    a.href = file;
	    a.target   = '_blank';
	    a.download = self.formatTimestamp()+ '-' + self.logFilename;
	    document.body.appendChild(a);
	    a.click();
	    a.remove();
	};

	this.clear = function() {
		var clearTime = new Date();
		self.output = '';
		if (self.realTimeLoggingOn) {
			console.log('[log4b.js] clear()');
		}
	};

	this.log = function(obj) {
		if(!self.recordLogs){return;}
		(function(obj){
			setTimeout(function(){
				self._log(obj);
			}, 0);
		})(obj);
	};

	this._log = function(obj) {
		if(typeof obj !== 'string'){
			return;
		}
		if (self.realTimeLoggingOn) {
			console.log(obj);
		}

		self.output += '['+self.formatTimestamp()+']: ';
		self.output += self.cutExceededChars(obj) + self.lineBreak;
		self.output = self.trimLog(self.output, self.maxLines);
	};

	this.cutExceededChars = function(obj){
		if(obj.length > self.lineMaxChars){
			return obj.substr(0, self.lineMaxChars);
		}
		else{
			return obj;
		}
	};

	this.trimLog = function(log, maxLines) {
		var lines = log.split(self.lineBreak);
		if (lines.length > maxLines) {
			lines = lines.slice(lines.length - maxLines);
		}
		return lines.join(self.lineBreak);
	};

	this.lines = function() {
		return self.output.split(self.lineBreak).length - 1;
	};

	this.formatTimestamp = function() {
		var timestamp = new Date();
		var year = timestamp.getFullYear();
		var date = timestamp.getDate();
		var month = ('0' + (timestamp.getMonth() +1)).slice(-2);
		var hrs = ('0' + timestamp.getHours()).slice(-2);
		var mins = ('0' + timestamp.getMinutes()).slice(-2);
		var secs = ('0' + timestamp.getSeconds()).slice(-2);
		return year + '-' + month + '-' + date + ' ' + hrs + ':' + mins + ':'+secs;
	};
}