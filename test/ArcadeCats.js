const {expect} = require('chai');
const hre = require("hardhat");
const {it} = require('mocha');

const { getAddress } = require('ethers').utils;


describe("ArcadeCats", function() {
    it("Should mint and transfer an NFT to a valid address", async function() {
        const AcradeCats = await hre.ethers.getContractFactory("ArcadeCats");
        const acradecats = await AcradeCats.deploy();
        await acradecats.deployed();
        
        console.log('Contract deployed to ', getAddress(arcacdecats));

        const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        const metadataURI = 'QmWWTdhvY3g493K15a5VjSTTnaxmDPf1jsLt4iJigzD71E';

        let balance = await acradecats.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedToken = await acradecats.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.51')});

        balance = await acradecats.balanceOf(recipient);
        
        expect(balance).to.equal(1);
        expect(await firedguys.isContentOwned(metadataURI)).to.equal(true);
    })
})