pragma solidity ^0.5;

import "./BEP20.sol";

contract Token is BEP20 {
    string constant public tokenName = "Token";
    string constant public tokenSymbol = "TOK";
    uint8 constant public tokenDecimals = 18;
    uint256 constant public cap = 2000000000 * (10 ** 18);

    constructor() public BEP20(tokenName, tokenSymbol, tokenDecimals) {
        owner = msg.sender;
        mint(cap);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
