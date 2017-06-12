pragma solidity ^0.4.0;

contract intkey {
  mapping (uint => uint) storedData;

  function set(uint key, uint value) {
    storedData[key] = value;
  }

  function inc(uint key) returns (uint ret){
  	storedData[key] = storedData[key] + 1;
    return storedData[key];
  }

  function dec(uint key) returns (uint ret){
  	storedData[key] = storedData[key] - 1;
    return storedData[key];
  }

  function get(uint key) constant returns (uint retVal) {
    return storedData[key];
  }
}