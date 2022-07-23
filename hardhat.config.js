/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

const ALCHEMY_URL =
    "https://eth-rinkeby.alchemyapi.io/v2/88xaHsuvtXNvS-x5uyO30RrSWYaGsv3C";
const PRIVATE_KEY =
    "92812e6d2bb2a5884e34db0d80dbc9a7f0ec9ec6ef908aff51e58691fdacb6cb";

module.exports = {
    solidity: "0.8.0",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        rinkeby: {
            url: ALCHEMY_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
    },
};
