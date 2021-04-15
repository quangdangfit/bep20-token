const Tokoin = artifacts.require("Token")
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const eq = assert.equal
const u = require('./util.js')
var token, s;

contract("Token", (accounts) => {
    const root = accounts[0]
    const account1 = accounts[1]
    const account2 = accounts[2]
    const OFFCHAIN = web3.utils.fromAscii('1')

    before(async () => {
        token = await Token.new({
            from: root
        });

    })
})