<template>
  <header class="navbar">
    <div class="container">
      <div class="logo">
<img src="../../public/assets/movieLogo.png" alt="movie-projector">        <router-link to="/" class="app-title">MovieApp</router-link>
      </div>

      <div class="search-box">
        <SearchModal :movies="movies"/>
      </div>
    </div>
  </header>
</template>

<script>
import SearchModal from './SearchModal.vue';
import sourceData from "@/data.json"

export default {
  name: 'AppNavigation',
  components: {
    SearchModal

  },
  data() {
    return {
      movies: sourceData.movies,
      filteredMovies: sourceData.movies, 
    }
  },
  methods: {
    handleSearch(keyword) {
      // Arama işlevi
      this.filteredMovies = this.movies.filter(movie =>
        movie.Title.toLowerCase().includes(keyword.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #1c1c1c;
  color: #edf2f7;
  width: 100%;
  padding: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  width: 50px;
  height: 50px;
  color: #fff;
}

.logo .app-title {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
} 

.logo .app-title {
  font-size: 2rem;
  font-weight: bold;
  color: #f5c518;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo .app-title:hover {
  color: #ffd700;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 500px;
}
</style>