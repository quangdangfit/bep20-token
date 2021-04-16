const Token = artifacts.require("Token")
const {deployProxy} = require('@openzeppelin/truffle-upgrades');

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

    describe('Deployment stage', async () => {

        it('Token information', async () => {
            let o = {
                total_supply: 2000000000 * (10 ** 18),
                owner_balance: 2000000000 * (10 ** 18),
                name: 'Token',
                symbol: 'TOK',
                decimals: 18,
                owner: root,
            }

            let owner_balance = await token.balanceOf(root, {
                from: root
            });

            let total_supply = await token.totalSupply({
                from: root
            });

            let owner = await token.getOwner({
                from: root
            });

            eq(o.total_supply, parseInt(total_supply));
            eq(o.owner_balance, parseInt(owner_balance));
            eq(o.name, await token.name.call());
            eq(o.symbol, await token.symbol.call());
            eq(o.decimals, await token.decimals.call());
            eq(o.decimals, await token.decimals.call());
            eq(o.owner, await token.owner.call());

        })

    })
})
