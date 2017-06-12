
var Pipe = require('./pipe');
var util = require('util');

module.exports = tpipe;

function tpipe(temp) {
	this.value = temp;
}

util.inherits(tpipe, Pipe)

tpipe.prototype.transact = function(txData, callback){
	console.log(txData)
	return callback(null)
}

tpipe.prototype.call = function(txData, callback){
	console.log(txData)
	return callback(null)
}