<template>
    <div class="search-container">
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          @input="handleSearch"
          @focus="showModal = true"
          placeholder="Search movies..."
          class="search-input"
        />
        <button @click="showModal = true" class="search-icon">
          🔍
        </button>
      </div>
  
      <!-- Search Modal -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Arama Sonucunuz</h3>
            <button class="close-button" @click="closeModal">×</button>
          </div>
          <div class="search-results" v-if="searchQuery">
            <div 
              v-for="movie in filteredMovies" 
              :key="movie.imdbID"
              class="movie-result"
              @click="goToMovie(movie.imdbID)"
            >
              <img :src="movie.Poster" :alt="movie.Title" class="result-poster" />
              <div class="result-info">
                <h4>{{ movie.Title }}</h4>
                <p>{{ movie.Year }}</p>
                <span class="rating">IMDb: {{ movie.imdbRating }}</span>
              </div>
            </div>
            
            <div v-if="filteredMovies.length === 0" class="no-results">
             Aradığınız Film Bulunamadı
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchModal',
    props: {
      movies: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        searchQuery: '',
        showModal: false,
        filteredMovies: []
      }
    },
    methods: {
      handleSearch() {
        if (this.searchQuery.length > 0) {
          this.filteredMovies = this.movies.filter(movie =>
            movie.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        } else {
          this.filteredMovies = []
        }
      },
      goToMovie(id) {
        this.closeModal()
        this.$router.push(`/movie/${id}`)
      },
      closeModal() {
        this.showModal = false
        this.searchQuery = ''
        this.filteredMovies = []
      }
    }
  }
  </script>
  
  <style scoped>
  .search-container {
    position: relative;
    width: 100%;
    max-width: 500px;
  }
  
  .search-box {
    position: relative;
    width: 100%;
  }
  
  .search-input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 25px;
  border: none;
  background-color: #2d3748;
  color: #edf2f7;
  font-size: 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}
  
  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #f5c518;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
  }
  
  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

  
.modal-content {
  position: relative;
  top: 10%;
  left: 57%;
  width: 35%;
  background-color: #1c1c1c;
  border-radius: 8px;
  max-height: 400px;
  overflow-y:auto;
  margin-top: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #333;
  }
  
  .modal-header h3 {
    color: #fff;
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }
  
  .search-results {
    padding: 15px;
  }
  
  .movie-result {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #333;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .movie-result:hover {
    background-color: #2d3748;
  }
  
  .result-poster {
    width: 50px;
    height: 75px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .result-info {
    flex: 1;
  }
  
  .result-info h4 {
    color: #fff;
    margin: 0 0 5px 0;
  }
  
  .result-info p {
    color: #888;
    margin: 0;
    font-size: 0.9rem;
  }
  
  .rating {
    color: #f5c518;
    font-size: 0.9rem;
  }
  
  .no-results {
    color: #888;
    text-align: center;
    padding: 20px;
  }
  </style>