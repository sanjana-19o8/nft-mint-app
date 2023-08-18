/** @type import('hardhat/config').HardhatUserConfig */
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: './artifacts',
  },
  networks: {
    // hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Px-VVT9EoZ-TCZtki8ioxLD2kVDuZJJA",
      accounts: [process.env.PRIVATE_KEY],
    },
    // mumbai: {
      //   url: 'https://polygon-mumbai.g.alchemy.com/v2/fDDUXgGKp4JNDJVedU0P4z-hWiprUstr',
      //   accounts: [process.env.PRIVATE_KEY]
      // }
    },
    // alchemy: {
    //   apiKey: process.env.ALCHEMY_API_KEY,
    // },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    }
};
