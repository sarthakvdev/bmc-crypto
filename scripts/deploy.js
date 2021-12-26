const deploy = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  // Importing the contract
  const Token = await hre.ethers.getContractFactory("CoffeePortal");
  const portal = await Token.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await portal.deployed();

  console.log("CoffeePortal address: ", portal.address);
};

const runDeploy = async () => {
  try {
    await deploy();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runDeploy();
