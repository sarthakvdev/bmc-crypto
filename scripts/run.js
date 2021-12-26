const main = async () => {
  const coffeePortalFactory = await hre.ethers.getContractFactory(
    "CoffeePortal"
  );
  const coffeeContract = await coffeePortalFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  });
  await coffeeContract.deployed();
  console.log("Coffee Contract deployed to", coffeeContract.address);

  // Get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    coffeeContract.address
  );
  console.log(
    "Contract Balance:", 
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Let's buy a coffee to check the written contract
  const coffeeTxn = await coffeeContract.buyCoffee(
    "Loved your work, buying you a coffee",
    "sarthak",
    ethers.utils.parseEther("0.01")
  );
  // Let's stop the function until coffeeTxn gets succff completed
  await coffeeTxn.wait();

  // Check the contract balance again
  contractBalance = await hre.ethers.provider.getBalance(
    coffeeContract.address
  );
  console.log(
    "Contract Balance:", 
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allCoffee = await coffeeContract.getAllCoffee();
  console.log("All Coffees:", allCoffee);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
};

runMain();
