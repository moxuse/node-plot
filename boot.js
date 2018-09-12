var repl = require("repl").start();
[
	'g1',
	'p1',
	'm',
	'g',
	'f',
	'filler'
].forEach((modName) => {
  repl.context[modName] = require('./src/' + modName + '.js'); 
});
