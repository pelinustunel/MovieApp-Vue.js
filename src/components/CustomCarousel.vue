import AppCarousel from '@/components/AppCarousel.vue';
<template>
  <div class="carousel" @mouseenter="stopAutoScroll" @mouseleave="startAutoScroll">
    <div class="carousel-container" ref="carouselContainer">
      <div 
        v-for="movie in randomMovies" 
        :key="movie.imdbID" 
        class="carousel-item"
      >
      <router-link :to="'/movie/' + movie.imdbID">

        <img :src="movie.Poster" :alt="movie.Title" class="carousel-img" />
      </router-link>
      </div>
    </div>
    <!-- Kontroller -->
    <button class="prev-button" @click="scrollLeft">‹</button>
    <button class="next-button" @click="scrollRight">›</button>
  </div>
</template>
<script>
export default {
  name: "CustomCarousel",
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      randomMovies: [],
      scrollInterval: null,
    };
  },
  created() {
    this.randomMovies = this.getRandomMovies();
  },
  mounted() {
    this.startAutoScroll();
  },
  beforeUnmount() {
    this.stopAutoScroll();
  },
  methods: {
    getRandomMovies() {
      const shuffledMovies = [...this.movies].sort(() => 0.5 - Math.random());
      return shuffledMovies.slice(0, 10); 
    },
    startAutoScroll() {
      this.stopAutoScroll(); 
      this.scrollInterval = setInterval(() => {
        this.scrollRight();
      }, 3000); 
    },
    stopAutoScroll() {
      if (this.scrollInterval) {
        clearInterval(this.scrollInterval);
      }
    },
    scrollLeft() {
      const container = this.$refs.carouselContainer;
      if (container) {
        container.scrollBy({
          left: -300, 
          behavior: "smooth",
        });
      } else {
        console.error("Carousel container is undefined.");
      }
    },
    scrollRight() {
      const container = this.$refs.carouselContainer;
      if (container) {
        container.scrollBy({
          right: 300, 
          behavior: "smooth",
        });
      } else {
        console.error("Carousel container is undefined.");
      }
    },
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  padding: 20px;
  margin: auto;
  max-width: 1200px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  margin-bottom:60px;
  margin-top:0px;
  top:50px;
  image-rendering: pixelated;

}

.carousel-container {
  display: flex;
  gap: 20px;
  overflow: hidden;
  image-rendering: pixelated;
}

.carousel-item {
  flex: 0 0 auto;
  width: 200px;
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  image-rendering: pixelated;

}

.carousel-item:hover {
  transform: scale(1.1);
}

.carousel-img {
  background-color: red;
  width: 100%;
  height: 300px;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}
.title {
  font-weight: 700;
  color: white;
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
  border-left: 6px solid #f5c518;
  padding-left: 8px;
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(145deg, #3b3b3b, #4a4a4a);
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.prev-button:hover,
.next-button:hover {
  transform: scale(1.1);
}
</style>
