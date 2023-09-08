
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const cors = require("cors"); // 引入 cors 模块
const port = 3000;

const { spawn } = require('child_process');

const {  main } = require("./scripts/deploy");
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

app.use(express.static(path.join(__dirname, "")));

const startHardhat = () => {
    const hardhatTask = spawn('npx hardhat run scripts/deploy.js', { shell: true });

  console.log('Hardhat Task Started');
    hardhatTask.stdout.on('data', (data) => {
      console.log(`Hardhat Task: ${data}`);
    });
  };

  // 启动 Hardhat 任务
startHardhat();

  app.get("/totalSupply", async (req, res) => {
    try {
      
     
      const result =  await main();
      console.log("result:", result);
       const totalSupplyNum = result.totalSupplyResponse.toString();
      console.log("totalsupply方法的结果：-------",);
      console.log("totalSupplyNum:", totalSupplyNum);
      res.send(totalSupplyNum);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }

  });

  app.get("/uri/:tokenId", async (req, res) => {
    try {
   
     const tokenId = req.params.tokenId;
      const result =  await main(tokenId);
       const uriResponse1 = result.uriResponse;
      console.log("uri方法的结果：-------",);
      console.log("uriResponse:", uriResponse1);
      const urlString = "https://" + uriResponse1;
      const response = await axios.get(urlString);
      console.log("response:", response);
      const jsonData = response.data;
      console.log("jsonData:", jsonData);
      // const image = jsonData.image;
      // console.log("image:", image);
      const Res = {
        jsonData: jsonData,
        URL: uriResponse1
      };
      console.log("res:", Res);
      res.json(Res);
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




app.listen(port, () => {
  console.log("Server started on port  3000 端口!");
});
