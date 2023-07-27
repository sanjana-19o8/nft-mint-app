const {expect} = require('chai');
const hre = require("hardhat");
const {it} = require('mocha');

describe("myNFT", function() {
    it("Should mint and transfer an NFT to a valid address", async function() {
        const AcradeCats = await hre.ethers.getContractFactory("myNFT");
        const acradecats = await AcradeCats.deploy();
        await acradecats.deployed();

        const recipient = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
        const metadataURI = 'QmWWTdhvY3g493K15a5VjSTTnaxmDPf1jsLt4iJigzD71E';

        let balance = await acradecats.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedToken = await acradecats.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.51')});

        balance = await acradecats.balanceOf(recipient);
        
        expect(balance).to.equal(1);
        expect(await firedguys.isContentOwned(metadataURI)).to.equal(true);
    })
})