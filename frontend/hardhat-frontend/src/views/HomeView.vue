<template>
  <div class="container">
    <div class="title-1"></div>
    <div class="title">欢迎来到嘉陵西村</div>

    <div class="carousel-list">
      <img
        v-for="(item, i) in images"
        :key="i"
        class="carousel-item"
        :src="item.src"
        @click="goToSlide(i)"
      />
      <a class="prev" @click="prevSlide">&#10094;</a>
      <a class="next" @click="nextSlide">&#10095;</a>
    </div>

    <!-- 轮播进度点 -->
    <div class="carousel-dots">
      <span
        v-for="(image, index) in images"
        :key="index"
        :class="{
          dot: true,
          active: index === currentIndex,
          transitioning: isTransitioning(index),
        }"
        @click="goToSlide(index)"
      ></span>
    </div>

    <button class="button">进入</button>
  </div>
</template>
<script>
import swiper1 from "../assets/img/swiper1.png";
import swiper2 from "../assets/img/swiper2.png";
import swiper3 from "../assets/img/swiper3.png";
export default {
  data() {
    return {
      currentIndex: 0,
      images: [swiper1, swiper2, swiper3],
      isDragging: false,
      dragStartX: 0,
      dragEndX: 0,
      autoSlideInterval: null,
      transitionIndex: null,
    };
  },
  methods: {
    layout() {
      const items = document.querySelectorAll(".carousel-item");
      let index = 1;
      layout();

      function layout() {
        const xOffsetStep = 100; //轮播图间隔
        const count = items.length; //轮播图数量
        const scaleStep = 0.6; //缩放倍率
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const sign = Math.sign(i - index);
          let xOffset = (i - index) * xOffsetStep;
          if (i !== index) {
            xOffset = xOffset + 100 * sign;
          }

          const scale = scaleStep ** Math.abs(i - index);
          const rotateY = i === index ? 0 : 45 * -sign;
          item.style.transform = `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
          item.style.zIndex = count - Math.abs(index - i);
        }
      }

      const prev = document.querySelector(".prev");
      const next = document.querySelector(".next");
      prev.addEventListener("click", () => {
        index--;
        if (index < 0) {
          index = 0;
        }
        layout();
      });
      next.addEventListener("click", () => {
        index++;
        if (index > items.length - 1) {
          index = items.length - 1;
        }
        layout();
      });

      items.forEach((item, i) => {
        item.addEventListener("click", () => {
          index = i;
          layout();
        });
      });
    },
    prevSlide() {
      this.index--;
      if (this.index < 0) {
        this.index = 0;
      }
      this.layout();
    },
    nextSlide() {
      this.index++;
      if (this.index > this.items.length - 1) {
        this.index = this.items.length - 1;
      }
      this.layout();
    },
    goToSlide(i) {
      this.index = i;
      this.layout();
    },
  },
  mounted() {
    this.layout();
  },
  //   methods: {
  //     prev() {
  //       // 如果当前是第一张，则切换到最后一张
  //       if (this.currentIndex > 0) {
  //         this.currentIndex--;
  //       }
  //     },
  //     next() {
  //       // 如果当前是最后一张，则切换到第一张
  //       if (this.currentIndex === this.images.length - 1) {
  //         this.currentIndex = 0;
  //       } else {
  //         this.currentIndex++;
  //       }
  //     },
  //     handleMouseDown(event) {
  //       this.isDragging = true;
  //       this.dragStartX = event.clientX;
  //     },
  //     handleMouseUp(event) {
  //       if (this.isDragging) {
  //         this.dragEndX = event.clientX;
  //         if (this.dragEndX - this.dragStartX > 50) {
  //           this.prev();
  //         } else if (this.dragStartX - this.dragEndX > 50) {
  //           this.next();
  //         }
  //         this.isDragging = false;
  //       }
  //     },
  //     handleMouseMove(event) {
  //       if (this.isDragging) {
  //         event.preventDefault();
  //       }
  //     },
  //     handleMouseLeave() {
  //       this.isDragging = false;
  //     },
  //     handleTouchStart(event) {
  //       this.isDragging = true;
  //       this.dragStartX = event.touches[0].clientX;
  //     },
  //     handleTouchEnd(event) {
  //       if (this.isDragging) {
  //         this.dragEndX = event.changedTouches[0].clientX;
  //         if (this.dragEndX - this.dragStartX > 50) {
  //           this.prev();
  //         } else if (this.dragStartX - this.dragEndX > 50) {
  //           this.next();
  //         }
  //         this.isDragging = false;
  //       }
  //     },
  //     handleTouchMove(event) {
  //       if (this.isDragging) {
  //         event.preventDefault();
  //       }
  //     },
  //     goToSlide(index) {
  //       this.currentIndex = index;
  //     },
  //     startAutoSlide() {
  //       this.autoSlideInterval = setInterval(this.next, 3000); // 3秒自动切换
  //     },
  //     stopAutoSlide() {
  //       clearInterval(this.autoSlideInterval);
  //     },

  //     // 判断是否正在过渡
  //     isTransitioning(index) {
  //       return this.transitionIndex !== null && this.transitionIndex === index;
  //     },

  //     // 设置过渡结束后清除过渡类
  //     clearTransitionClass() {
  //       this.transitionIndex = null;
  //     },
  //   },
  //   created() {
  //     this.startAutoSlide();
  //   },
  //   beforeDestroy() {
  //     this.stopAutoSlide();
  //   },
};
</script>
<style scoped>
.container {
  /* background-color: #d83535; */
  background-image: url("../assets/img/bgImg.png");
  background-size: cover;
  /* background-position: center; */

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 100vh;
  /* background-color: #e11414; */
  width: 100vw;
}
.title-1 {
  /* background-color: #e1e737; */
  background-image: url("../assets/img/title_red.png");
  background-size: 100% 100%;
  /* background-position: center; */
  /* object-fit: cover; */
  /* margin: 150px auto; */
  margin: 18vh 0 20px 0;
  width: 70%;
  height: 50px;
}
.title {
  /* background-color: #ed4f4f; */
  font-size: larger;
  font-weight: bold;
}
.carousel-container {
  margin: 4vh 0 0 0;
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
  height: 320px;
  /* width: 300px; */
  overflow: hidden;
  /* background-size: 100% 100%; */
  background-color: #e02828;
}

.carousel {
  display: flex;
  position: relative;
  width: 300px;
  height: 100%;

  background-color: #e21717;
}

.carousel-item {
  background-color: #23b088;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;
}
.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left {
  /* transform: scale(0.8) translateX(-100%); */
}

.center {
  /* transform: scale(1);
  transition: transform 0.5s ease; */
}

.right {
  /* transform: translateX(100%); */
}

.carousel-dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dot {
  width: 12px;
  height: 7px;
  border-radius: 35%;
  background-color: #ddd;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
/* 添加过渡动画 */
.dot.transitioning {
  width: 20px; /* 或其他更大的宽度，根据需要调整 */
  transition: width 0.3s ease;
}
.dot.active {
  background-color: #ba0000;
  width: 30px;
}

.button {
  width: 40vw;
  margin: 10vh 0 0 0;
  background-color: #ba0000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #841313;
}
</style>
