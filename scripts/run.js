const main = async () => {
  const coffeePortalFactory = await hre.ethers.getContractFactory('CoffeePortal');
  const coffeeContract = await coffeePortalFactory.deploy();
  // Wait till it gets deployed
  await coffeeContract.deployed();

  console.log("Coffee Contract deployed to ", coffeeContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();