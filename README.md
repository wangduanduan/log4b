# log4b
log for browser, can save and download console log

idea form: https://github.com/inorganik/debugout.js

# demo
```
	var Log4b = new log4b();

	Log4b.log('wangduanduan');
	Log4b.log(JSON.stringify({name:'wangduan',age:18}));

	Log4b.getLog();
```
# feature
- log can saved Asynchronous
- log can download

# methods
- getLog: get log show on the console tab
- downloadLog: download the log
- clear: clear all saved log
- log:	write log
- lines: get how many lines of log
- search: search a string

# config
- self.realTimeLoggingOn = true; // log in real time (forwards to console.log)
- self.useTimestamps = false; // insert a timestamp in front of each log
- self.recordLogs = true; // set to false after you're done debugging to avoid the log eating up memory
- self.maxLines = 2500; // if autoTrim is true, this many most recent lines are saved
- self.lineMaxChars = 1500; // if one log is max than lineMaxChars, it will be cut
- self.logFilename = 'log4b.txt'; // filename of log downloaded with downloadLog()
- self.lineBreak = '\n\n';
