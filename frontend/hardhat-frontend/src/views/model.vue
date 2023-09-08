<template>
    <div class="modal-overlay" @click="handleOverlayClick" v-if="show">
      <div class="modal">
        <div class="modal-header">
          
          {{ jsonData.name }}

        </div>
        <div class="modal-content">
          <!-- 这里可以根据需要展示jsonData中的数据 -->
  
          <div class="scrollable-content">
            <div
              class="ThreeJs"
              ref="canvasContainer"
              id="canvas-container"
            ></div>
            <!-- Three.js 渲染容器 -->
            <div class="modal-footer">
              <p>类型：{{ jsonData.symbol }}</p>
              <p>描述：{{ jsonData.description }}</p>
              <!-- 遍历jsonData.attributes并展示处理 -->
              <div
                v-for="attribute in jsonData.attributes"
                :key="attribute.trait_type"
              >
                <p>{{ attribute.trait_type }}: {{ attribute.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  
  export default {
    props: {
      title: String,
      show: Boolean,
      name: String,
      jsonData: Object,
    },
    data() {
      return {
        scene: null,
        camera: null,
        renderer: null,
        cube: null,
        rotationCompleted: false,
        rotationAngle: 0,
        textureLoaded: false, // 添加标志来跟踪贴图加载状态
        texture: null, // 存储贴图对象
      };
    },
    watch: {
      jsonData(newValue) {
        const newurl1 = newValue.image; 
        const newurl = "https://"+newurl1;
        if (newValue.image && !this.textureLoaded) {
          this.loadTexture(newurl);
        }
       
        console.log("newValue::", newValue);
        console.log("newValue.image:", newurl);
      },
      // if (newValue.image) {
      //     this.initThree(newValue.image);
      //   }
    },
  
    methods: {
      closeModal() {
        this.$emit("close");
      },
      handleOverlayClick(event) {
        // 如果点击的是非弹窗区域，则关闭弹窗
        if (event.target.classList.contains("modal-overlay")) {
          this.closeModal();
        }
      },
      loadTexture(newurl) {
        console.log("加载的newurl::", newurl);
        const loader = new THREE.TextureLoader();
  
        loader.load(
          newurl,
          (texture) => {
            console.log("贴图加载完成时的texture::", texture);
            // 贴图加载完成的回调函数
            //   this.initThree(texture);
  
            // 获取贴图的图片链接
            //   this.texture = texture; // 存储贴图对象
            const imageUrl = texture.image.src;
            console.log("Loaded image URL:", imageUrl);
            this.initThree(imageUrl);
            // this.texture = texture.clone(); // 使用 clone 来创建一个非响应式贴图对象
            this.textureLoaded = true; // 设置加载完成标志
          },
          undefined, // 进度回调
          (error) => {
            console.error("An error occurred while loading the texture.", error);
          }
        );
      },
  
      initThree(imageUrl) {
        //   console.log("load后的初始化imageUrl::", imageUrl);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          82,
          window.innerWidth / window.innerHeight,
          1,
          500
        );
  
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth/2, window.innerHeight/2);
        document
          .getElementById("canvas-container")
          .appendChild(renderer.domElement);
  
        const materials = [
          new THREE.MeshBasicMaterial({ color: 0x7d7b7c }), // Right face (red)
          new THREE.MeshBasicMaterial({ color: 0x7d7b7c }), // Left face (green)
          new THREE.MeshBasicMaterial({ color: 0x7d7b7c }), // Top face (blue)
          new THREE.MeshBasicMaterial({ color: 0x7d7b7c }), // Bottom face (yellow)
          new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(imageUrl), // Front and back face texture
            roughness: 0,
            metalness: 0,
          }),
          new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(imageUrl), // Front and back face texture
            roughness: 0,
            metalness: 0,
          }), // Back face color (magenta)
        ];
  
        const geometry = new THREE.BoxGeometry(1.5, 1, 0.09);
  
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
  
        scene.background = new THREE.Color(0xffffff);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 2, 3);
        scene.add(directionalLight);
  
        camera.position.z = 3;
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.update();
        // const axesHelper = new THREE.AxesHelper(3);
        // scene.add(axesHelper);
        cube.scale.set(1, 2, 1);
  
        let rotationCompleted = false;
        let rotationAngle = 0;
  
        function animate() {
          controls.update();
          requestAnimationFrame(animate);
  
          // 旋转半圈（180度）
          if (!rotationCompleted) {
            rotationAngle += Math.PI / 180; // 每帧旋转角度增加
            cube.rotation.y = rotationAngle;
  
            if (rotationAngle >= Math.PI) {
              rotationCompleted = true; // 旋转完成
            }
          }
  
          renderer.render(scene, camera);
        }
  
        animate();
        this.initialized = true; // 将初始化标志设置为 true
      },
    },
  };
  </script>
  
  <style>
  /* 样式可以根据需要进行调整 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    height: 70%;
  }
  
  .modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .modal-content {
    height: 100%;
  
  }
  
  .modal-content img {
    max-width: 100%;
    height: auto;
  }
  /* 添加滚动条样式 */
  .scrollable-content {
    max-height: 90%; /* 设置最大高度，超过部分会出现滚动条 */
    overflow-y: auto; /* 添加垂直滚动条 */
    margin-top: 10px; /* 调整上边距 */
  }
  .modal-content canvas {
    max-width: 100%;
    height: auto;
  }
  .ThreeJs {
      display: flex;
      justify-content: center;
      align-items: center;
    /* margin-top: -80%; */
    /* width: 80%;
  height: 80%; */
  /* background-color: #d82020; */
  }
 
  </style>
  