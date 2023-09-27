<template>
    <div class="carousel-list">
      <img
        v-for="(item, i) in items"
        :key="i"
        class="carousel-item"
        :src="item.src"
        :alt="'Image ' + (i + 1)"
        @click="goToSlide(i)"
        :style="{
          transform: item.transform,
          zIndex: item.zIndex,
        }"
      />
      <a class="prev" @click="prevSlide">&#10094;</a>
      <a class="next" @click="nextSlide">&#10095;</a>
    </div>
  </template>
  
  <script>
  import swiper1 from "../assets/img/swiper1.png";
  import swiper2 from "../assets/img/swiper2.png";
  import swiper3 from "../assets/img/swiper3.png";
  
  export default {
    data() {
      return {
        items: [
          {
            src: swiper1,
            transform: "translateX(-50px) scale(0.8)",
            zIndex: 0,
          },
          {
            src: swiper2,
            transform: "",
            zIndex: 1,
          },
          {
            src: swiper3,
            transform: "translateX(50px) scale(0.8)",
            zIndex: 0,
          },
        ],
        index: 1,
      };
    },
    methods: {
      layout() {
        const xOffsetStep = 100;
        const count = this.items.length;
  
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];
          let sign = Math.sign(i - this.index);
          let xOffset = (i - this.index) * xOffsetStep;
  
          if (this.index === 0 && i === count - 1) {
            xOffset = xOffset + count * xOffsetStep;
          } else if (this.index === count - 1 && i === 0) {
            xOffset = xOffset - count * xOffsetStep;
          }
  
          if (i === this.index) {
            item.transform = "";
          } else {
            item.transform = `translateX(${xOffset}px) scale(0.8)`;
          }
  
          item.zIndex = count - Math.abs(this.index - i);
        }
      },
      prevSlide() {
        this.index--;
        if (this.index < 0) {
          this.index = this.items.length - 1;
        }
        const lastItem = this.items.pop();
        this.items.unshift(lastItem);
        this.layout();
      },
      nextSlide() {
        this.index++;
        if (this.index >= this.items.length) {
          this.index = 0;
        }
        const firstItem = this.items.shift();
        this.items.push(firstItem);
        this.layout();
      },
      goToSlide(i) {
        this.index = i;
        this.layout();
      },
      startAutoSlide() {
        this.timer = setInterval(() => {
          this.nextSlide();
        }, 3000);
      },
      stopAutoSlide() {
        clearInterval(this.timer);
      },
      onMouseDown() {
        this.stopAutoSlide();
      },
      onMouseUp() {
        this.startAutoSlide();
      },
    },
    mounted() {
      this.layout();
      this.startAutoSlide();
    },
  };
  </script>
  
  <style scoped>
  .carousel-list {
    display: flex;
    margin-left: 50vw;
    align-items: center;
    justify-content: center;
  }
  
  .carousel-item {
    position: absolute;
    width: 300px;
    height: 300px;
    transition: transform 0.3s;
  }
  
  .prev,
  .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
  
  .prev {
    left: 0;
  }
  
  .next {
    right: 0;
  }
  </style>
  