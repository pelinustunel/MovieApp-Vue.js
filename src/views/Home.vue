<template>
  <div class="home">
    <div
      class="carousel-container"
      ref="carouselContainer"
    >
    <h4>Popular Movies</h4>
      <CustomCarousel :movies="movies" />
    </div>
    <div class="allProduct">
      <h1 class="title" style="color: aliceblue">All Movies</h1>
      <div class="movies-grid">
        <div v-for="movie in movies" :key="movie.imdbID" class="movie-card">
          <router-link :to="'/movie/' + movie.imdbID">
            <div class="card">
              <img :src="movie.Poster" :alt="movie.Title" class="movie-img" />
              <div class="card-content">
                <div class="movie-title">{{ movie.Title }}</div>
                 <div class="movie-rating">
                  <span class="rating-text">IMDB: {{ movie.imdbRating }}</span>
                  <div class="stars">
                    <span
                      v-for="star in maxStars"
                      :key="star"
                      class="star"
                      :style="{
                        color:
                          star <= Math.round(movie.imdbRating / 2)
                            ? '#ffd700'
                            : '#ccc',
                      }"
                    >
                      ★
                    </span>
                  </div>
                </div>
                <div class="comment-container">
                  <img src="https://img.icons8.com/?size=100&id=jOjH1Mt48Fp1&format=png&color=FFFFFF" width="15px">
                  <span class="comment-title">{{ movie.Comments ? Object.keys(movie.Comments).length : 0 }}</span>
              </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from "@/data.json";
import CustomCarousel from "@/components/CustomCarousel.vue";

export default {
  name: "MovieGrid",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CustomCarousel,
  },
  data() {
    return {
      movies: sourceData.movies,
      currentBackground: "",
      randomMovies: [],
      maxStars: 5,
    };
  },
  computed: {
    remainingMovies() {
      const randomMovieIds = this.randomMovies.map((movie) => movie.imdbID);
      return this.movies.filter(
        (movie) => !randomMovieIds.includes(movie.imdbID)
      );
    },
  },

  created() {
    this.setRandomBackground();
    setInterval(this.setRandomBackground, 5000); 
  },
  methods: {
    setRandomBackground() {
      // Carousel'den rastgele bir film görselini al
      const randomIndex = Math.floor(Math.random() * this.movies.length);
      this.currentBackground = this.movies[randomIndex].Poster;
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  max-width: 100%;
  background-color: black;
  margin: 0 auto;
  padding: 20px;
}
.allProduct {
  margin-top: 100px;
}

.carousel-container {
  width: 100%;
  height: 300%;
  object-fit: fill;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  image-rendering: smooth; 
  image-rendering: crisp-edges;
}
.carousel-container h4{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  font-size: 30px;
  color: #fff;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding-top: 30px;
  text-align: center;
  font-size: 30px;
  color: aliceblue;
  margin-bottom: 2rem;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
  padding:40px;
  justify-items: center;
  align-items: start;
}

.movie-card {
  border-radius: 15px;
  color: #fff;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  height: 400px;
  max-width: 220px;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
}

.movie-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 3px solid #f5c518;
}

.card-content {
  background-color: transparent;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
}

.comment-container {
  display: flex;
  align-items: center;
  margin-left: auto; 
  padding-right: 10px; 
}

.comment-container img {
  margin-right: 5px; 
}

.comment-title {
  color: #ffffff;
  font-size: 11px;
}

.movie-title {
  font-size: 1rem;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 95%;
  text-decoration: none;
}

.movie-rating {
  font-size: 0.85rem;
  color: #ffffff;
  background-color: transparent;
  border-radius: 10px;
  padding: 3px 7px;
  display: inline-block;
  margin-top: 1px;
  align-items: center; 
}

.stars {
  display: flex;
  gap: 2px;
  text-align: center;
}

.star {
  color: #ffc107;
  font-size: 0.8rem;
}

.star.gray {
  color: #cccccc;
}

.star:hover {
  color: #ffcc00;
  transform: scale(1.2);
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

/* Responsive Tasarım */
@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
  .movie-card {
    max-width: 150px;
    height: auto;
  }
  .movie-img {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }

  .movie-img {
    height: 200px;
}
}
</style>