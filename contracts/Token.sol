pragma solidity ^0.5;

import "./BEP20.sol";

contract Token is BEP20("Token", "TOK", 18, 2000000000*(10**18)) {
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}