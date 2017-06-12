const {contract, at, deploy} = require('../lib/contracts');

var a = new contract("hello", "world", "goodbye")

console.log(a.address)
console.log(a.abi)
console.log(a.pipe)

var b = at("a","b","c")

console.log(b.address)
console.log(b.abi)
console.log(b.pipe)

b.bubble("hello", [1,2,3], "ssssssssssss", function(err, data){console.log("cha-ching!")})
b.bubble.call()
b.bubble.send()