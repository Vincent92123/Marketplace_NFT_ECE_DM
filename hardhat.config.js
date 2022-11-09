require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "o9DMFOIjpRRcewZQWUvOzWXcwNr3x5wy";
const GOERLI_PRIVATE_KEY = "413d0f7b427d6555d6b73506bce201aa4eb16034190cc0ce2fcc5f82e0cbbcd2";

module.exports = {
    solidity: "0.8.4",
    paths: {
        artifacts: "./src/backend/artifacts",
        sources: "./src/backend/contracts",
        cache: "./src/backend/cache",
        tests: "./src/backend/test"
    },
    networks: {
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY]
        }
    }
};