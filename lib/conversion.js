const G = require('g-functions')
const generic = require('@nodeguy/generic')
const _ = generic._
const R = require('ramda')
const is = require('@nodeguy/type').is
var coder = require('web3/lib/solidity/coder')


// Convert Burrow types to Web3 types.
const burrowToWeb3 = generic.function()

burrowToWeb3.method(_,
  R.identity
)

burrowToWeb3.method([is(Object)],
  G.map(burrowToWeb3)
)

// https://github.com/hyperledger/burrow/blob/ba74718e702cfb781869d5866bd792a38289e8e7/docs/specs/api.md#numbers-and-strings
burrowToWeb3.method([/^[0-9A-F]+$/i],
  ([string]) =>
    '0x' + string
)

// Convert Web3 types to Burrow types.
const web3ToBurrow = generic.function()

web3ToBurrow.method(_,
  R.identity
)

web3ToBurrow.method([is(Object)],
  G.map(web3ToBurrow)
)

// https://github.com/ethereum/wiki/wiki/JSON-RPC#hex-value-encoding
web3ToBurrow.method([/^0x[0-9A-F]*$/i],
  ([hex]) =>
    hex.slice(2)
)

module.exports = {
	toW3: burrowToWeb3,
	fromW3: web3ToBurrow
}