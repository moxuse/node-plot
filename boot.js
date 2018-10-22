var repl = require("repl").start();
[
	'events',
	'home.js',
	'getActive.js',
	'g1.js',
	'p1.js',
	'm.js',
	'g.js',
	'f.js',
	'filler.js',
	'tracer.js',
	'detector.js'
].forEach((modName) => {
	const modKey = (modName.split('.').length > 1) ? modName.split('.')[0] : modName;
  repl.context[modKey] = require('./src/' + modName); 
});

