// imports
const { ethers, run, network } = require("hardhat");

// async main
async function main() {
  /********* Deploying SimpleStorage from Hardhat *********/
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("Deployed contract to: ", simpleStorage.address);

  // What happens when we deploy to our hardhat network?
  // console.log(network.config);

  if (network?.config?.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    // Wait() : This function waits until the transaction has been mined
    console.log("Waiting for block confirmation...");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  /********* Interacting with Contracts in Hardhat *********/
  const currentFavouriteNumber = await simpleStorage.retrieve();
  console.log("Current Favourite Number: ", currentFavouriteNumber);

  const transectionResponse = await simpleStorage.store(7);
  await transectionResponse.wait(1);

  const updatedFavouriteNumber = await simpleStorage.retrieve();
  console.log("updated Favourite Number: ", updatedFavouriteNumber);
}

/********* Programmatic Verification *********/
async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log("error", error);
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
