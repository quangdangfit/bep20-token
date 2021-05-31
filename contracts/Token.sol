pragma solidity ^0.5;

import "./BEP20.sol";

contract Token is BEP20 {
    string constant public tokenName = "cnExodus";
    string constant public tokenSymbol = "CNEXV";
    uint8 constant public tokenDecimals = 18;
    uint256 constant public cap = 500000000 * (10 ** 18);

    constructor() public BEP20(tokenName, tokenSymbol, tokenDecimals) {
        owner = msg.sender;
        mint(cap);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}
