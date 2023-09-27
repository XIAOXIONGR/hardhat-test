const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const cors = require("cors"); // 引入 cors 模块
const { ethers } = require("ethers"); // 引入 ethers.js 库

// const hre = require("hardhat");

// const hre = require("hardhat");
// const port = 3000;

const { spawn } = require("child_process");

const { mainTotal, main, mainTokensOf, mainMint } = require("./scripts/deploy");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  req.method == "OPTIONS" ? res.send(200) : next();
});

app.use(express.static(path.join(__dirname, "frontend/hardhat-frontend/dist")));

const startHardhat = () => {
  const hardhatTask = spawn("npx hardhat run scripts/deploy.js", {
    shell: true,
  });

  console.log("Hardhat Task Started");
  hardhatTask.stdout.on("data", (data) => {
    console.log(`Hardhat Task: ${data}`);
  });
};

// 启动 Hardhat 任务
startHardhat();

app.get("/api/hello", (req, res) => {
  res.send("你好");
});

app.get("/totalSupply", async (req, res) => {
  try {
    // 获取前端传递的 address 参数
    // const address = req.query.address;

    // // 现在您可以使用 address 参数来进行后续操作
    // console.log("Received address:", address);
    const result = await mainTotal();
    console.log("result:", result);
    const totalSupplyNum = result.totalSupplyResponse.toString();
    console.log("totalsupply方法的结果：-------");
    console.log("totalSupplyNum:", totalSupplyNum);
    res.send(totalSupplyNum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/tokensOf/:address", async (req, res) => {
  const address = req.params.address;
  console.log("接收到的address:", address);
  try {
    const result = await mainTokensOf(address);
    console.log("result:", result);
    const tokensOfNum = new Set(
      result.tokensOfResponse.map((bigInt) => Number(bigInt))
    );
    var resultArray = Array.from(tokensOfNum);
    console.log("tokensOfNum:", resultArray);
    res.send(resultArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/uri/:tokenId", async (req, res) => {
  const tokenId = req.params.tokenId;
  console.log("接口的tokenId:", tokenId);
  try {
    // const tokenId = req.params.tokenId;
    // console.log("tokenId:", tokenId);
    const result = await main(tokenId);
    const uriResponse1 = "http://" + result.uriResponse;
    console.log("uri方法的结果：-------");
    console.log("uriResponse:", uriResponse1);

    const response = await axios.get(uriResponse1);
    console.log("response:", response);
    const jsonData = response.data;
    console.log("jsonData:", jsonData);
    // const image = jsonData.image;
    // console.log("image:", image);
    const Res = {
      jsonData: jsonData,
      URL: uriResponse1,
    };
    console.log("res:", Res);
    res.json(Res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/mint", async (req, res) => {
  const { address, tokenId } = req.query;
  console.log("mint接口的address:", address);
  console.log("mint接口的tokenId:", tokenId);
  // 使用 ethers.utils.getAddress() 将字符串地址转换为 Address 类型
  const Address = ethers.getAddress(address);
  console.log("Address:", Address);
  try {
    const result = await mainMint(Address, tokenId);
    const MintResult = result.MintResponse;
    console.log("result:", MintResult);
    res.send(MintResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//写方法

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

// 启动服务器并监听端口
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
