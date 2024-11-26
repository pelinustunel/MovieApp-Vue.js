<template>
    <div 
      class="comment-slider-container" 
      @mouseenter="stopAutoSlide" 
      @mouseleave="startAutoSlide"
    >

    <div class="controls">
        <button class="prev-button" @click="prevSlide">‹</button>
        <button class="next-button" @click="nextSlide">›</button>
      </div>
      <div class="comment-slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div class="comment-slide" v-for="(comment, index) in comments" :key="index">
          <p class="comment-author">{{ comment.Author }}:</p>
          <p class="comment-content">{{ comment.Comment }}</p>
          <p class="comment-date">{{ comment.Date }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CommentSlider",
    props: {
      comments: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        currentSlide: 0,
        intervalId: null,
      };
    },
    methods: {
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.comments.length;
      },
      prevSlide() {
        this.currentSlide =
          (this.currentSlide - 1 + this.comments.length) % this.comments.length;
      },
      startAutoSlide() {
        this.stopAutoSlide(); 
        this.intervalId = setInterval(() => {
          this.nextSlide();
        }, 1000);
      },
      stopAutoSlide() {
        clearInterval(this.intervalId);
      },
    },
    mounted() {
      this.startAutoSlide();
    },
    beforeUnmount() {
      this.stopAutoSlide();
    },
  };
  </script>
  
  <style scoped>

  .comment-slider-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin: 40px auto;
  border-radius: 16px;
  background: linear-gradient(145deg, #2a2a2a, #333333);
  box-shadow: 0 18px 20px rgba(0, 0, 0, 0.4);
}

.comment-slider {
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1); 
  width: 1000px;

}

.comment-slide {
  color: #fff;
  padding: 24px;
  width: 100%;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.comment-author {
  font-weight: bold;
  color: #ffc107;
  margin-bottom: 8px;
}

.comment-content {
  color: #ddd;
  margin: 12px 0;
  line-height: 1.6;
}

.comment-date {
  font-size: 12px;
  color: #bbb;
}

.controls {
  position: absolute;
  top: 40%;
  width: 100%;
  display: flex;
  transform: translateY(-50%);
  pointer-events: none;
}

.prev-button,
.next-button {
  background: linear-gradient(145deg, #3b3b3b, #4a4a4a);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.prev-button:hover,
.next-button:hover {
  background: linear-gradient(145deg, #4a4a4a, #5a5a5a);
  transform: scale(1.1);
}

  </style>
  