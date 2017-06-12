const solc = require('solc');
const fs = require('fs')

const pipe = require('../lib/pipes/tpipe')
const smoc = require('../lib/contracts').contract



fn = "intkey.sol"
cn = "intkey"
bs = fn + ":" + cn

inputs = {}

inputs[fn] = fs.readFileSync(__dirname + "/" + fn).toString()

// console.log(inputs)

output = solc.compile({sources: inputs}, 1)

// console.log("++++++++++++++++++++++++\n\n\n")
// console.log(output)

// console.log(output["contracts"][bs])
// console.log("\n\n\n")

bytecode = output["contracts"][bs].bytecode
abi = JSON.parse(output["contracts"][bs].interface)

// console.log(bytecode)
// console.log(abi)

// console.log("\n\n======================================\n\n")

// URL to the rpc endpoint of the Burrow server. 
var burrowURL = "http://localhost:1337/rpc";

var accountData = {
	"address": "83E98771A992E5774E94472A75B645964E133E54",
	"pubKey": "D3A7622A2B35DF2745A64AB9FCBEDB1A7ABA45D4C27AF0B40BF0937F4CF9A93E",
	"privKey": "8C0E19382CF32D8B1FC41F6FFEDCFB36179CE1862BB1D284F5F899E37D2F71EDD3A7622A2B35DF2745A64AB9FCBEDB1A7ABA45D4C27AF0B40BF0937F4CF9A93E"
}


myPipe = new pipe(42);

contract = new smoc(77, abi, myPipe)

console.log("set")
contract._functionSend('set', 88554646, 42, function(err, data){
    console.log(err)
    console.log(data)

    console.log("\n\n\nget")
    contract._functionCall('get', 88554646, function(err, data){
        console.log(err)
        console.log(data)
    })
})



// myContractFactory.new({data: bytecode}, function(error, contract){
//     if (error) {
//         // Something. 
//         throw error;
//     }

//     console.log("contract deployed at : " + contract.address)

//     contract.set(88554646, 42, function(err){
//     	if (error) {
// 	        // Something. 
// 	        throw error;
// 	    }

// 	    console.log("Done setting")
//     	contract.get(88554646, function(err, value){
//     		if (error) {
// 		        // Something. 
// 		        throw error;
// 		    }
//     		console.log("returned value: " + value)

//             contract.inc(88554646, function(err, value){

//                 console.log("incrementing returned value: " + value)

//                 contract.dec(88554646, function(err, value){
//                     console.log("decrementing returned value: " + value)
//                 })
//             })
//     	})
//     })

// });