// const hre = require("hardhat");


const hre = require("hardhat");

// 封装获取 totalSupply 的方法
const getTotalSupply = async (provider, contractAddress, contractABI) => {
  // ... 使用提供程序和合约地址连接到合约，调用 totalSupply 方法等
  const nftContract = await new hre.ethers.Contract(contractAddress, contractABI, provider);
  const totalSupplyResponse = await nftContract.totalSupply();
  return totalSupplyResponse;
};

// 封装获取 URI 的方法，接受 tokenId 作为参数
const getURI = async (provider, contractAddress,contractABI, tokenId) => {
  // ... 使用提供程序和合约地址连接到合约，调用 uri 方法等，使用传入的 tokenId
  const nftContract = await new hre.ethers.Contract(contractAddress, contractABI, provider);
  const uriResponse = await nftContract.uri(tokenId);
  return uriResponse;
};

const main = async () => {
  // 设置前置条件，例如连接到以太坊和设置提供程序
  const quicknodeUrl = "wss://evmws.testnet.bianjie.ai";
  const privateKey =
    "0x21d790f08179b8b516864211957ae9eb82a621c27361b74ce9802eff3939946d";

  const provider = await new hre.ethers.WebSocketProvider(quicknodeUrl);
  const signer = await new hre.ethers.Wallet(privateKey, provider);
  console.log("signer:",signer);

  // 合约地址和 ABI
  const contractAddress = "0xFF493C8C490282d543eCcD5b08079BE52972207A";
  const contractABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
      name: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "values",
          type: "uint256[]",
        },
      ],
      name: "TransferBatch",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "TransferSingle",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "value",
          type: "string",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "URI",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "string",
          name: "contractName",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "functionName",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string[]",
          name: "parties",
          type: "string[]",
        },
        {
          indexed: false,
          internalType: "uint8[]",
          name: "share",
          type: "uint8[]",
        },
      ],
      name: "charge",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "uri",
          type: "string",
        },
      ],
      name: "detailsURIChanged",
      type: "event",
    },
    {
      inputs: [],
      name: "Details",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "accounts",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
      ],
      name: "balanceOfBatch",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_num",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "check",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
      ],
      name: "check",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "contracVersion",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "contractName",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "exists",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
      ],
      name: "getChecked",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "base_uri",
          type: "string",
        },
        {
          internalType: "string",
          name: "details_",
          type: "string",
        },
        {
          internalType: "uint8",
          name: "points_",
          type: "uint8",
        },
      ],
      name: "init",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "merge",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
      ],
      name: "merge",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeBatchTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "uri_",
          type: "string",
        },
      ],
      name: "setDetailsURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string[]",
          name: "parties_",
          type: "string[]",
        },
        {
          internalType: "uint8[]",
          name: "shares_",
          type: "uint8[]",
        },
      ],
      name: "setParty",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "points_",
          type: "uint8",
        },
      ],
      name: "setPoints",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bool",
          name: "status",
          type: "bool",
        },
      ],
      name: "suspend",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "tokenCountOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "offset",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "limit",
          type: "uint256",
        },
      ],
      name: "tokens",
      outputs: [
        {
          internalType: "uint256",
          name: "total",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "tokenIds",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "offset",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "limit",
          type: "uint256",
        },
      ],
      name: "tokensOf",
      outputs: [
        {
          internalType: "uint256",
          name: "total",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "tokenIds",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "uri",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // 调用 getTotalSupply 方法获取总供应量，传递前置条件作为参数
  const totalSupplyResponse = await getTotalSupply(provider, contractAddress, contractABI);

  // 在需要的地方调用 getURI 方法，并传递 tokenId 参数和前置条件
  const tokenId = 1; // 假设 tokenId 为 1
  const uriResponse = await getURI(provider, contractAddress,contractABI, tokenId);

  // 返回多个处理后的结果
  return {
    totalSupplyResponse,
    uriResponse,
  };
};

module.exports = {
  main,
};


// const main = async (tokenId) => {
//     console.log("tokenId:",tokenId);
//   //合约地址
//   let contractAddress = "0xFF493C8C490282d543eCcD5b08079BE52972207A"; //1054合约地址
//   let contractABI = [
//     {
//       inputs: [],
//       stateMutability: "nonpayable",
//       type: "constructor",
//       name: "constructor",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "bool",
//           name: "approved",
//           type: "bool",
//         },
//       ],
//       name: "ApprovalForAll",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "previousOwner",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "newOwner",
//           type: "address",
//         },
//       ],
//       name: "OwnershipTransferred",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256[]",
//           name: "ids",
//           type: "uint256[]",
//         },
//         {
//           indexed: false,
//           internalType: "uint256[]",
//           name: "values",
//           type: "uint256[]",
//         },
//       ],
//       name: "TransferBatch",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "TransferSingle",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "string",
//           name: "value",
//           type: "string",
//         },
//         {
//           indexed: true,
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//       ],
//       name: "URI",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "bytes32",
//           name: "id",
//           type: "bytes32",
//         },
//         {
//           indexed: false,
//           internalType: "string",
//           name: "contractName",
//           type: "string",
//         },
//         {
//           indexed: false,
//           internalType: "string",
//           name: "functionName",
//           type: "string",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "quantity",
//           type: "uint256",
//         },
//         {
//           indexed: false,
//           internalType: "string[]",
//           name: "parties",
//           type: "string[]",
//         },
//         {
//           indexed: false,
//           internalType: "uint8[]",
//           name: "share",
//           type: "uint8[]",
//         },
//       ],
//       name: "charge",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "string",
//           name: "uri",
//           type: "string",
//         },
//       ],
//       name: "detailsURIChanged",
//       type: "event",
//     },
//     {
//       inputs: [],
//       name: "Details",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//       ],
//       name: "balanceOf",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address[]",
//           name: "accounts",
//           type: "address[]",
//         },
//         {
//           internalType: "uint256[]",
//           name: "ids",
//           type: "uint256[]",
//         },
//       ],
//       name: "balanceOfBatch",
//       outputs: [
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "_id",
//           type: "uint256",
//         },
//       ],
//       name: "burn",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "_id",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "_num",
//           type: "uint256",
//         },
//       ],
//       name: "burn",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "check",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//       ],
//       name: "check",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "contracVersion",
//       outputs: [
//         {
//           internalType: "uint8",
//           name: "",
//           type: "uint8",
//         },
//       ],
//       stateMutability: "pure",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "contractName",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "pure",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "tokenId",
//           type: "uint256",
//         },
//       ],
//       name: "exists",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//       ],
//       name: "getChecked",
//       outputs: [
//         {
//           internalType: "uint8",
//           name: "",
//           type: "uint8",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "base_uri",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "details_",
//           type: "string",
//         },
//         {
//           internalType: "uint8",
//           name: "points_",
//           type: "uint8",
//         },
//       ],
//       name: "init",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//       ],
//       name: "isApprovedForAll",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "merge",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//       ],
//       name: "merge",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "_to",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "_id",
//           type: "uint256",
//         },
//       ],
//       name: "mint",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "name",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "owner",
//       outputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "renounceOwnership",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           internalType: "uint256[]",
//           name: "ids",
//           type: "uint256[]",
//         },
//         {
//           internalType: "uint256[]",
//           name: "amounts",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes",
//           name: "data",
//           type: "bytes",
//         },
//       ],
//       name: "safeBatchTransferFrom",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//         {
//           internalType: "bytes",
//           name: "data",
//           type: "bytes",
//         },
//       ],
//       name: "safeTransferFrom",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           internalType: "bool",
//           name: "approved",
//           type: "bool",
//         },
//       ],
//       name: "setApprovalForAll",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "uri_",
//           type: "string",
//         },
//       ],
//       name: "setDetailsURI",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "string[]",
//           name: "parties_",
//           type: "string[]",
//         },
//         {
//           internalType: "uint8[]",
//           name: "shares_",
//           type: "uint8[]",
//         },
//       ],
//       name: "setParty",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint8",
//           name: "points_",
//           type: "uint8",
//         },
//       ],
//       name: "setPoints",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes4",
//           name: "interfaceId",
//           type: "bytes4",
//         },
//       ],
//       name: "supportsInterface",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "bool",
//           name: "status",
//           type: "bool",
//         },
//       ],
//       name: "suspend",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "symbol",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "index",
//           type: "uint256",
//         },
//       ],
//       name: "tokenByIndex",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//       ],
//       name: "tokenCountOf",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "index",
//           type: "uint256",
//         },
//       ],
//       name: "tokenOfOwnerByIndex",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "offset",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "limit",
//           type: "uint256",
//         },
//       ],
//       name: "tokens",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "total",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256[]",
//           name: "tokenIds",
//           type: "uint256[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "offset",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "limit",
//           type: "uint256",
//         },
//       ],
//       name: "tokensOf",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "total",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256[]",
//           name: "tokenIds",
//           type: "uint256[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "totalSupply",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "tokenId",
//           type: "uint256",
//         },
//       ],
//       name: "totalSupply",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "newOwner",
//           type: "address",
//         },
//       ],
//       name: "transferOwnership",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "tokenId",
//           type: "uint256",
//         },
//       ],
//       name: "uri",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];

//   const quicknodeUrl = "wss://evmws.testnet.bianjie.ai";
//   const provider = await new hre.ethers.WebSocketProvider(quicknodeUrl); //连接网络

//   // Signer 签名
//   const privateKey =
//     "0x21d790f08179b8b516864211957ae9eb82a621c27361b74ce9802eff3939946d"; // 替换成你的私钥
//   const signer = await new hre.ethers.Wallet(privateKey, provider);
//   console.log("获取signer");
//   //合约对象
//   const nftContract = await new hre.ethers.Contract(
//     contractAddress,
//     contractABI,
//     provider
//   ); //合约的读方法
//   console.log("获取nftContract");

//   const nftWithSinger = await nftContract.connect(signer); //合约的写方法，需要Signer
//   console.log("nftContract.connect(signer)");

  //   调用合约方法
 
  // 调用智能合约totalSupply方法
// const totalSupplyResponse = await nftContract.totalSupply();
// console.log("totalSupplyResponse为", totalSupplyResponse);


  // 调用智能合约uri方法
 
//   const uriResponse = await nftContract.uri(tokenId);
//   console.log("uriResponse为", uriResponse);
 
//   return {
//     totalSupplyResponse,
//     uriResponse,
//   };


    // const gasAddress = "0x075De1FEe1E437504Dd3F47CE2C36eF52b0f1CD8"; //
  //   const toAddress = "0xCd9F9ae04eef160342373C661D024a0a20c601C7";
  //   const data =
  //     "0x156e29f60000000000000000000000001bfbde037b9d687f29cc14dc3776296df93d1d4b00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001";
    // const transactionResponse = await nftWithSinger.mint(gasAddress,7);
    // console.log("transactionResponse",transactionResponse);
  //   console.log("mint");
  //写方法
// };
// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// runMain();

// module.exports = {
//     main,
//   };

