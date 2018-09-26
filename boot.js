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
  repl.context[modName] = require('./src/' + modName); 
});
