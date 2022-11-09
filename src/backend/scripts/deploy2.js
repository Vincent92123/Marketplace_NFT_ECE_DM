const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // On déploie les contrats ici
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    console.log("NFT contract address ", nft.address);

    // On passe chaque contrat avec leur nom pour enregistrer une copie de leur ABI ainsi que de leur adresse
    saveFrontendFiles(nft, "NFT");
}

function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../../frontend/contractsData";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + `/${name}-address.json`,
        JSON.stringify({ address: contract.address }, undefined, 2)
    );

    const contractArtifact = artifacts.readArtifactSync(name);

    fs.writeFileSync(
        contractsDir + `/${name}.json`,
        JSON.stringify(contractArtifact, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });