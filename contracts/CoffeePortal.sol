// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CoffeePortal {
  uint256 totalCoffee;
  address payable public owner;

  // Need to understand 'events' in solidity!
  event NewCoffee (
    address indexed from,
    uint256 timestamp,
    string message,
    string name
  );

  constructor () payable {
    console.log("Yo! Hello Smart Contract");

    // user who is calling this function address
    owner = payable(msg.sender);
  }

  // struct is a custom datatype, obviously
  struct Coffee {
    address giver; // address of the coffee giver
    string message; // message the giver want to send
    string name; // name of the giver
    uint256 timestamp; // time at which coffee is given
  }

  // coffee array holds all the coffees someone send to me
  Coffee[] coffee;

  function getAllCoffee() public view returns (Coffee[] memory) {
    return coffee;
  }

  // get all the coffee bought
  function getTotalCoffee() public view returns (uint256) {
    console.log("We had total %d coffees received!", totalCoffee);
    return totalCoffee;
  }

  // main function to buy coffee
  function buyCoffee (
    string memory _message,
    string memory _name,
    uint256 _payAmount
  ) public payable {
    // cost
    uint256 cost = 0.01 ether;

    // check if payamount <= cost – else it's insufficient amount
    require(_payAmount <= cost, "Insufficient Ether provided");

    // increment totalCoffee
    totalCoffee++;

    // push the new coffee in coffee array w/ required parameters
    coffee.push(Coffee(msg.sender, _message, _name, block.timestamp));

    // make the user (owner) pay the amount of coffee
    (bool success, ) = owner.call{value: _payAmount}("");

    // require(success, "Failed")
    require(success, "Failed to send money");

    // emit (send the message?) – event parameters
    emit NewCoffee(msg.sender, block.timestamp, _message, _name);
  }
}