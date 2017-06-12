// const G = require('g-functions')
// const generic = require('@nodeguy/generic')
// const _ = generic._
// const I = require('iteray')
// const R = require('ramda')
// var utils = require('./utils/utils')
// var SolidityEvent = require('web3/lib/web3/event')
var SolidityFunction = require('web3/lib/web3/function')
// var coder = require('web3/lib/solidity/coder')

const {toW3, fromW3} = require('./conversion')

// Make ethereum contract object
// Modify (inherit) some of its properties
// Return it


// Deploys a contract then returns the associated contract object
function deploy(bytecode, abi, pipe) {

}

function at(address, abi, pipe){
	newC = new contract(address, abi, pipe)
	addFunctionsToContract(newC)

	return newC 

}




// The purpose pf a contract object is to pipe out formatted transactions to "pipe"
function contract(address, abi, pipe) {
	var self = this;
	this.address = address;
	this.abi = abi;
	this.pipe = pipe;

	this.functions = {}
	this.abi.filter(function (json) {
	    	return (json.type === 'function')
		}).forEach(function (json) {
			const solidityFunction = new SolidityFunction(null, json, address)
			self.functions[json.name] = solidityFunction; 
		})

}



var extractCallback = function (args) {
    if (typeof (args[args.length - 1]) === 'function') {
        return args.pop(); // modify the args array!
    }
};



// This is the basic function in the contract to format (and then pipe out) the sendTransactions
contract.prototype._functionSend = function(name, ...args) {


	// Determine if there is a callback
	var args = Array.prototype.slice.call(args).filter(function (a) {return a !== undefined; });
	var callback = extractCallback(args);

	// Being opinionated about this. Must have callback
	if (!callback) {
		throw new Error("No callback function supplied")
	}

	// Use name to find function
	if (!this.functions[name]) {
		callback(new Error("Supplied function name \"" + name + "\"  not known to contract"), null)
	}

	// Run conversion on the args here TODO

	// Construct Payload
	txData = this.functions[name].toPayload(args);

	// Call pipe
	// TODO unpack output here
	this.pipe.transact(txData, callback)

}


contract.prototype._functionCall = function(name, ...args) {
    var args = Array.prototype.slice.call(args).filter(function (a) {return a !== undefined; });
    var callback = extractCallback(args);

	// Being opinionated about this. Must have callback
	if (!callback) {
		throw new Error("No callback function supplied")
	}

	// Use name to find function
	if (!this.functions[name]) {
		callback(new Error("Supplied function name \"" + name + "\"  not known to contract"), null)
	}

	txData = this.functions[name].toPayload(args);

    var self = this;
    this.pipe.call(txData, function (error, output) {
        if (error) return callback(error, null);

        var unpacked = null;
        try {
            unpacked = self.functions[name].unpackOutput(output);
        }
        catch (e) {
            error = e;
        }

        // Put output formatting here TODO
        callback(error, unpacked);
    });
}



contract.prototype._eventListen = function() {
	console.log("TODO")
}



module.exports = {
	contract: contract,
	at: at,
	deploy: deploy
}