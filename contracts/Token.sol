pragma solidity ^0.5;

import "./BEP20.sol";

contract TokoinToken is BEP20("Token", "TK", 18) {
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}