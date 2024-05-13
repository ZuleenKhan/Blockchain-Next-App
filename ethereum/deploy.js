const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
   'isolate switch clump benefit strong kite female admit rebuild chief agent parade',
 'https://sepolia.infura.io/v3/0b512c338495472c89f9d55f16f1e2bb'

);
const web3 = new Web3(provider);
const deploy = async () => {
  try{
  const accounts = await web3.eth.getAccounts();
 
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "1050400", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
  }catch(error) {
    console.log(error) ; 
  }
};
deploy();
