const { task } = require("hardhat/config");

/********* Custom Hardhat Tasks *********/
task("block-number", "Print the current block number").setAction(
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number is : ${blockNumber}`);
  }
);

module.exports = {};
