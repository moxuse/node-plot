var repl = require("repl").start();
[
	'home',
	'getActive',
	'g1',
	'p1',
	'm',
	'g',
	'f',
	'filler',
	'tracer',
	'detector'
].forEach((modName) => {
  repl.context[modName] = require('./src/' + modName + '.js'); 
});
