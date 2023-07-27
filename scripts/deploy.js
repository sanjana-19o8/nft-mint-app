const { ethers } = require("hardhat");

async function deploy() {
    const ARCNFT = await ethers.getContractFactory("ArcadeCats");
    const arcNft = await ARCNFT.deploy();

    await arcNft.deployed();

    console.log("NFT deployed to address: ", arcNFT.address);
}

deploy()
    .then(() => process.exit(0))
    .catch((err) => {
        process.exit(1);
    });