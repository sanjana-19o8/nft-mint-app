const hre = require("hardhat");

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deploy() {
    const ARCNFT = await hre.ethers.deployContract("ArcadeCats");
    await ARCNFT.waitForDeployment();

    // await arcNft.deployed();

    console.log('deploying');

    console.log("NFT deployed to address: ", ARCNFT.target);
    
    await sleep(30*1000);

    // verify contract on etherscan
    await hre.run("verify:verify", {
        address: whitelistContract.target,
        constructorArguments: [10],
      });
}

deploy()
    .then(() =>{
        console.log('deployed');
        process.exit(0);
    })
    .catch((err) => {
        process.exit(1);
    });