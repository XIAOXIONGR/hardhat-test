require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.19",
  networks: {
    avatar: {
      url: `"https://evmrpc.testnet.bianjie.ai"`,
      accounts: ['0x21d790f08179b8b516864211957ae9eb82a621c27361b74ce9802eff3939946d'],
      chainId:12231,
      gas:"auto",
      gasPrice:"auto",
      apiKey:{
        key:'7956ca03fe44238ef1d254799de1b556',
        secret:'bd09139024cdd3136a4f6cf60038c1194e6641063e413c47f517a579fbb158ba'
      }
    }
  }
};
