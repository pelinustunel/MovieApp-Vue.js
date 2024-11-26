<template>
  <div class="movie-detail">
    <!-- Geri Butonu -->
    <div class="back-button-container">
      <router-link to="/" class="back-button">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/left.png"
          alt="Geri"
          class="back-icon"
        />
      </router-link>
    </div>

    <div v-if="movie" class="movie-content">
      <div class="movie-poster-container">
        <img :src="movie.Poster" :alt="movie.Title" class="movie-poster" />
      </div>

      <div class="movie-info">
        <h1 class="movie-title">{{ movie.Title }}</h1>

        <div></div>
        <div class="info-row">
          <p><strong>Year:</strong> {{ movie.Year }}</p>
          <p><strong>Ratings:</strong> {{ movie.imdbRating }}</p>
        </div>
        <div class="info-row">
          <p><strong>Released:</strong> {{ movie.Released }}</p>
          <p><strong>Language:</strong> {{ movie.Language }}</p>
        </div>

        <div class="info-row2">
          <p><strong>Genre:</strong> {{ movie.Genre }}</p>
          <p><strong>Writer:</strong> {{ movie.Writer }}</p>
          <p><strong>Plot:</strong> {{ movie.Plot }}</p>
          <p><strong>Box Office:</strong> {{ movie.BoxOffice }}</p>
        </div>
      </div>
    </div>
    <div v-if="movie && movie.Actors" class="actors-section">
      <h3>Actors</h3>
      <div class="actor-cards">
        <div
          v-for="actor in actorsList"
          :key="actor.Name"
          class="actor-card"
          @click="goToActorDetail(actor.Name)"
        >
          <img :src="actor.Photo" :alt="actor.Name" class="actor-photo" />
          <h4>{{ actor.Name }}</h4>
          <h6>{{ actor.Role }}</h6>
        </div>
      </div>
    </div>
    <div v-if="movie && movie.Comments">
      <CommentSlider :comments="movie.Comments" />
    </div>
  </div>
</template>

<script>
import sourceData from "@/data.json";
import CommentSlider from "@/views/CommentSlider.vue";

export default {
  name: "MovieDetail",
  components: {
    CommentSlider,
  },
  data() {
    return {
      movie: null,
    };
  },
  computed: {
    actorsList() {
      if (!this.movie || !this.movie.Actors) return [];
      return typeof this.movie.Actors === "string"
        ? this.movie.Actors.split(",").map((name) => ({
            Name: name.trim(),
            Photo: "/default-actor-photo.jpg",
          }))
        : this.movie.Actors;
    },
  },

  methods: {
    goToActorDetail(actorName) {
      this.$router.push({
        name: "ActorDetail",
        params: { name: actorName },
      });
    },

    loadMovie() {
      const movieId = this.$route.params.id;
      this.movie = sourceData.movies.find((movie) => movie.imdbID === movieId);

      if (!this.movie) {
        console.error("Film Bulunamadı!");
      }
    },
  },

  mounted() {
    this.loadMovie();
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #1c1c1c;
}

.movie-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1c1c1c;
  color: #f0f0f0;
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
}

.back-button-container {
  align-self: flex-start;
  margin-bottom: 20px;
}
.info-row {
  margin-left: 5px;
}
.back-button {
  display: inline-flex;
  align-items: center;
  padding: 10px;
  border: 2px solid #fdd835;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: #fdd835;
}

.back-button:hover {
  background-color: #fdd835;
  color: #1c1c1c;
}

.back-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
h6 {
  color: #c3c3c3;
  line-height: 2rem;
}
.info-row2 {
  margin-left: 5px;
}
.actors-section {
  width: 100%;
  max-width: 1200px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
.movie-content {
  display: flex;
  gap: 20px;
  max-width: 900px;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  background-color: #2a2a2a;
  width: 100%;
}

/* Film Posteri */
.movie-poster-container {
  flex-shrink: 0;
}

.movie-poster {
  width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.movie-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.movie-title {
  font-size: 36px;
  font-weight: bold;
  color: #fdd835;
  text-align: center;
  margin-bottom: 70px;
}

.movie-info p {
  margin: 5px 0;
}

.movie-info strong {
  color: #fdd835;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-row p {
  margin: 0;
  flex: 1;
  text-align: left;
}

/* Responsive Ayarlar */
@media (max-width: 600px) {
  .movie-content {
    flex-direction: column;
  }

  .info-row {
    flex-direction: column;
  }

  .info-row p {
    text-align: left;
    margin-bottom: 5px;
  }
}
.actors-section {
  width: 100%;
  max-width: 500px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
.actor-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.actor-card {
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s;
}
.actor-card:hover {
  transform: scale(1.05);
}
.actor-photo {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
}
/* Footer styles */
.footer {
  background-color: #222;
  color: #fff;
  padding: 20px 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-section {
  margin: 20px 0;
}

.footer-section a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

.footer-section a:hover {
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
}

.sign-in-button {
  background-color: #ff9900;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.sign-in-button:hover {
  background-color: #cc7a00;
}

.social-icons img {
  width: 30px;
  height: 30px;
  margin: 0 5px;
}

.get-app img {
  width: 50px;
  height: 50px;
}
</style>
