<template>
    <div class="container">
      <!-- 地图部分 -->
      <div class="map" :style="{ height: mapHeight }"></div>
      <div>
        <input v-model="contract" placeholder="输入合约地址" />
        <button @click="searchNFT">查询</button>
      </div>
      <!-- 展示窗部分 -->
      <div class="showcase" :style="{ height: showcaseHeight }">
        <div
          v-for="n in this.numNFTs"
          :key="n"
          class="showcase-item"
          @click="showModal(n)"
        >
          <img
            class="showcase-image"
            :src="getImageUrl(n)"
            :alt="getNFTName(n)"
            @load="handleImageLoad($event, n)"
          />
          <!-- <p>{{ getNFTName(n) }}</p> -->
        </div>
      </div>
  
      <!-- 按钮部分 -->
      <div class="buttons" :style="{ height: buttonsHeight }">
        <button class="synthesize">点击合成</button>
        <button class="verify">点击核销</button>
      </div>
    </div>
  
    <model
      v-if="jsonDATAN"
      :title="modalTitle"
      :show="isModalVisible"
      @close="closeModal"
      :jsonData="jsonDATAN"
      :imageUrl="baseImageUrl"
      :name="baseName"
    ></model>
  </template>
  
  <script>
  import axios from "axios";
  // import DetailPage from "./DetailPage.vue";
  import loadingImg from "../assets/img/loading.png";
  import model from "./model.vue";
  
  export default {
    components: {
      model,
    },
    data() {
      return {
        mapHeight: "30%", // 地图部分高度
        showcaseHeight: "30%", // 展示窗部分高度
        buttonsHeight: "30%",
        contract: "0x4470e4CFEa9DEA0c439AdC2EA023B287b1F0739D",
        numNFTs: 0,
        nftList: [],
        chainId: "12231",
        id: "15523888594",
        placeholderImage: "",
        baseImageUrl: loadingImg, // 将 baseImageUrl 定义在 data 中
        baseName: "", // 将 baseName 定义在 data 中
        isModalVisible: false,
        modalTitle: "sss",
        // modalData 控制弹窗组件的状态和数据
        jsonDATA: {},
        jsonDATAN: {},
        JsonUrl: {},
        imageSizes: {},
      };
    },
  
    methods: {
      async searchNFT() {
        try {
         
          const totalSupply = await axios.get(
            "http://localhost:3000/totalSupply",
           
          );
          //处理服务端返回的数字
          const totalSupplyResult = totalSupply.data;
          console.log(totalSupplyResult);
          this.numNFTs = totalSupplyResult;
          this.nftList = totalSupplyResult;
  
          
          const tokenURL = await axios.get(
            "http://localhost:3000/uri/1",
           
          );
          //处理服务端返回的json地址
          const jsonData = tokenURL.data.jsonData;
          console.log("jsonData:", jsonData);
          this.jsonDATA = jsonData;
          //用于图片展示动态调用
          this.baseImageUrl = "https://" + jsonData.image;
          console.log("baseImageUrl:", this.baseImageUrl);
          this.baseName = jsonData.name;
  
          const url = tokenURL.data.URL;
          this.JsonUrl = url;
          console.log("url:", url);
        } catch (error) {
          console.error("Error searching NFT:", error);
        }
      },
  
      // 获取 NFT 名称
      getNFTName(n) {
        if (this.baseName) {
          const showName = this.baseName;
          return showName.replace("1", `${n}`);
        } else {
          return "加载中...";
        }
      },
  
      getImageUrl(n) {
        if (this.baseImageUrl) {
          const imageUrl = this.baseImageUrl;
          return imageUrl.replace("/1.png", `/${n}.png`);
        } else {
          return placeholderImage; // 或者返回一个默认的链接或占位图
        }
      },
  
      showModal(n) {
        this.isModalVisible = true;
        console.log("modalVisible:", this.isModalVisible);
        console.log("n:", n);
        if (this.JsonUrl) {
          const json = this.JsonUrl;
          const jsonurl1 = json.replace("/1.json", `/${n}.json`);
          const jsonurl = "https://"+jsonurl1;
          console.log("jsonurl:", jsonurl);
          axios
            .get(jsonurl)
            .then((response) => {
              // 在请求成功后，更新解析后的链接
              const jsonD = response.data; // 假设服务器返回的数据即为链接内容
              console.log("jsonD=:", jsonD);
              this.jsonDATAN = jsonD;
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        } else {
          return "加载中...";
        }
      },
      closeModal() {
        this.isModalVisible = false;
      },
  
      handleImageLoad(event, n) {
        // 图片加载完成后，获取图片的宽度和高度，并存储到 imageSizes 对象中
        const { width, height } = event.target;
        this.$set(this.imageSizes, n, { width, height });
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }
  
  .map {
    background-color: #ccc;
    margin: 40px;
  }
  
  .showcase {
    padding: 10px;
    margin: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border: 2px solid #000;
  }
  
  .showcase-item {
    width: 17%;
    height: 27%;
    border: 1px solid #ccc;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #cccbcb;
  }
  .showcase-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .buttons {
    /* background-color: #bb3030; */
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  </style>
  