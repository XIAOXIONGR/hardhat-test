<template>
    <div class="out">
      <div class="inner">
        <div
          class="img"
          v-for="(image, index) in images"
          :key="index"
          :style="{ zIndex: zIndices[index], opacity: opacities[index] }"
        >
          <img :src="image" alt="" />
        </div>
      </div>
      <div class="arrow">
        <i class="fas fa-chevron-left left" @click="prev"></i>
        <i class="fas fa-chevron-right right" @click="next"></i>
      </div>
      <div class="button">
        <p
          v-for="(button, index) in buttons"
          :key="index"
          @mousedown="goTo(index)"
          :style="{ backgroundColor: buttonColor(index) }"
        ></p>
      </div>
    </div>
  </template>
  
  <script>
  import swiper1 from "../assets/img/swiper1.png";
  import swiper2 from "../assets/img/swiper2.png";
  import swiper3 from "../assets/img/swiper3.png";
  
  export default {
    data() {
      return {
        images: [swiper1, swiper2, swiper2, swiper3, swiper1, swiper2, swiper3],
        zIndices: [99, 9, 1, 1, 1, 9, 9],
        opacities: [1, 1, 0, 0, 0, 1, 1],
        index: 0,
      };
    },
    computed: {
      buttons() {
        return new Array(this.images.length).fill(null);
      },
    },
    methods: {
      prev() {
        this.zIndices.unshift(this.zIndices.pop());
        this.initialize();
        this.index = this.index === 0 ? this.images.length - 1 : this.index - 1;
        this.clearColor();
      },
      next() {
        this.zIndices.push(this.zIndices.shift());
        this.initialize();
        this.index = this.index === this.images.length - 1 ? 0 : this.index + 1;
        this.clearColor();
      },
      goTo(targetIndex) {
        if (targetIndex !== this.index) {
          const diff = targetIndex - this.index;
          if (diff > 0) {
            for (let i = 0; i < diff; i++) {
              this.next();
            }
          } else {
            for (let i = 0; i < -diff; i++) {
              this.prev();
            }
          }
        }
      },
      clearColor() {
        this.buttons.forEach((button, index) => {
          button.style.backgroundColor = "silver";
        });
        this.buttons[this.index].style.backgroundColor = "rgb(20, 134, 187)";
      },
      initialize() {
        // Logic for initializing images with appropriate IDs
      },
      buttonColor(index) {
        return index === this.index ? "rgb(20, 134, 187)" : "silver";
      },
    },
  };
  </script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#1d2b48, #4f4266);
}
.out {
  width: 800px;
  height: 200px;
  position: relative;
  margin: 0 auto;
  top: 100px;
}
.out .inner {
  width: 100%;
  height: 100%;
}
.out .inner .img {
  width: 400px;
  height: 200px;
  position: absolute;
  transition: 0.3s;
}
.out .inner .img img {
  width: 100%;
  height: 100%;
}
.out .arrow {
  font-size: 32px;
}
.out .arrow i {
  position: absolute;
  color: #fff;
  z-index: 9999;
  cursor: pointer;
  top: 84px;
}
.out .arrow .left {
  left: 0;
}
.out .arrow .right {
  left: 780px;
}
.out .button {
  width: 175px;
  height: 15px;
  position: absolute;
  z-index: 9999;
  left: 50%;
  transform: translateX(-50%);
}
.out .button p {
  width: 15px;
  height: 15px;
  float: left;
  margin: 0 5px;
  cursor: pointer;
  background-color: silver;
}
.out .button p:first-child {
  background-color: #1486bb;
}
.out #last {
  transform: translateX(0);
  z-index: 9;
  opacity: 1;
}
.out #first {
  transform: translateX(200px) scale(1.3);
  z-index: 99;
  opacity: 1;
}
.out #second {
  transform: translateX(400px);
  z-index: 9;
  opacity: 1;
}
.out #left {
  transform: translateX(-100px);
  z-index: 1;
  opacity: 0;
}
.out #right {
  transform: translateX(500px);
  z-index: 1;
  opacity: 0;
}
</style>
