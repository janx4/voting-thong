# Simple Voting Dapp, interracting with Ethereum

### requirements

To launch the app you need node.js

run
```bash
cd into-the-clone-repo
npm install
```

into another cmd interface you need to run this command to run a local ethereum network

```bash
cd into-the-clone-repo
npx hardhat node
```

and then going back to the first command line interface, you need to generate the contract abi, by running this command :
```bash
npx hardhat run ./Scripts/Deploy.js --network localhost
```

to launch the app :
```bash
yarn start
```

### Voting system

Voting is pretty simple, it just consist of creating a title for the vote, and inputs to the vote.
One this done, you juste need to click the button create.
And a Metamask popup will appears. It will ask you to sign the transaction.
After a few seconds or minutes, your vote will appears into the 'Votes' tab.


### TODO

creating the voting interf
