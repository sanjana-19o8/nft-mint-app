const { expect } = require('chai');
const ethers = require("hardhat");

describe("ArcadeCats", function () {
  it("Should mint and transfer an NFT to a valid address", async function () {
    const AcradeCats = await hre.ethers.deployContract("ArcadeCats");
    await AcradeCats.waitForDeployment();

    console.log('Contract deployed to ', AcradeCats.target);

    const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const metadataURI = 'QmWWTdhvY3g493K15a5VjSTTnaxmDPf1jsLt4iJigzD71E';

    let balance = await AcradeCats.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await AcradeCats.payToMint(recipient, metadataURI, { value: hre.ethers.parseEther('0.51') });

    balance = await AcradeCats.balanceOf(recipient);

    expect(balance).to.equal(1);
    expect(await AcradeCats.isOwned(metadataURI)).to.equal(false);
  })
})