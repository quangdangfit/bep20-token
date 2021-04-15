# BEP20 Token Smart Contract

## Requirements
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview)
- [Ganache CLI](https://github.com/trufflesuite/ganache-cli)
- Node: v8.9.4 or later
- [Jest](https://jestjs.io/)


## Configuration
- truffle.config.js

## How to run

### Install dependencies and devDependencies
```
npm install
```

### Development

Step 1: Run ganache-cli on development port (ex: 8545):

```
ganache-cli -p 8545
```

Step 2: Run migrate on development network
```
truffle migrate --network development
```

Step 3: Test smart contract's methods on development
```
truffle console --network development
check your function here
```

### Test

Step 1: Run ganache-cli on test port (ex: 7545):
```
ganache-cli -p 7545
```

Step2: Run test
```
truffle test --network test
```

### Custom network

Step 1: Add your `mnemonic` to `truffle.config.js`:
```
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = <your-mnemonic>;
```

Step 2: Configure custom network (ex: bsc testnet)
```
bsctest: {
  provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
  network_id: 97,
  confirmations: 10,
  timeoutBlocks: 200,
  skipDryRun: true
},
```

Check document on [here](https://docs.binance.org/smart-chain/developer/deploy/truffle-verify.html)

Step 2: Deploy contract to custom network:
```
truffle migrate --network <your-custom-network>
```
