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

    describe('Transfer stage', async () => {

        it('cannot transfer when source account balance = 0', async () => {
            let i = {
                src_account: account1,
                dest_account: account2,
                amount: web3.utils.toWei("10"),
            }

            await u.assertRevert(token.transfer(i.dest_account, i.amount, {
                from: i.src_account
            }));
        })

        it('transfer token', async () => {
            let i = {
                src_account: root,
                dest_account: account1,
                amount: web3.utils.toWei("10"),
            }

            await token.transfer(i.dest_account, i.amount, {
                from: i.src_account
            });

            let src_balance = await token.balanceOf(i.src_account, {
                from: root
            });

            let dest_balance = await token.balanceOf(i.dest_account, {
                from: root
            });

            let total_supply = await token.totalSupply({
                from: root
            });

            let o = {
                total_supply: 2000000000 * (10 ** 18),
                src_balance: 1999999990 * (10 ** 18),
                dest_balance: 10 * (10 ** 18),
            }

            eq(o.total_supply, parseInt(total_supply));
            eq(o.src_balance, parseInt(src_balance));
            eq(o.dest_balance, parseInt(dest_balance));
        })
    })

    describe('Mint / Burn stage', async () => {

        it('only owner can burn token', async () => {
            let i = {
                burned_account: account1,
                owner: account2,
                amount: web3.utils.toWei("10"),
            }

            await u.assertRevert(token.burn(i.burned_account, i.amount, {
                from: i.owner
            }));
        })

        it('only owner can mint token', async () => {
            let i = {
                mint_account: account1,
                amount: web3.utils.toWei("10"),
            }

            await u.assertRevert(token.mint(i.amount, {
                from: i.mint_account
            }));
        })

        it('burn token', async () => {
            let i = {
                burnt_account: account1,
                owner: root,
                amount: web3.utils.toWei("10"),
            }

            await token.burn(i.burnt_account, i.amount, {
                from: i.owner
            });

            let o = {
                total_supply: 1999999990 * (10 ** 18),
                burnt_balance: 0,
            }

            let burnt_balance = await token.balanceOf(i.burnt_account, {
                from: root
            });

            let total_supply = await token.totalSupply({
                from: root
            });


            eq(o.total_supply, parseInt(total_supply));
            eq(o.burnt_balance, parseInt(burnt_balance));
        })

        it('mint token', async () => {
            let i = {
                owner: root,
                amount: web3.utils.toWei("10"),
            }

            await token.mint(i.amount, {
                from: i.owner
            });

            let o = {
                total_supply: 2000000000 * (10 ** 18),
                owner_balance: 2000000000 * (10 ** 18),
            }

            let owner_balance = await token.balanceOf(i.owner, {
                from: root
            });

            let total_supply = await token.totalSupply({
                from: root
            });


            eq(o.total_supply, parseInt(total_supply));
            eq(o.owner_balance, parseInt(owner_balance));
        })

    })
})
