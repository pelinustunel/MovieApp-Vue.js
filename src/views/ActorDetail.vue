<template>
  <div class="actor-detail">
    <div class="back-button-container">
      <button @click="$router.go(-1)" class="back-button">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/left.png"
          alt="Geri"
          class="back-icon"
        />
      </button>
    </div>

    <div v-if="actor" class="actor-content">
      <div class="actor-photo-container">
        <img :src="actor.Photo || 'default-photo.png'" :alt="actor.Name || 'Unknown Actor'" class="actor-photo" />
      </div>

      <div class="actor-info">
        <h1 class="actor-name">{{ actor.Name || 'Unknown Actor' }}</h1>
        <p><strong>Role:</strong> {{ actor.Role || 'Unknown' }}</p>
        <p><strong>Bio:</strong> {{ actor.Bio || 'Actor information not available.' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from "@/data.json";

export default {
  name: "ActorDetail",
  data() {
    return {
      actor: null,
    };
  },
  mounted() {
    const actorName = this.$route.params.name;
    let foundActor = null;

    for (const movie of sourceData.movies) {
      foundActor = movie.Actors.find(actor => actor.Name === actorName);
      if (foundActor) {
        this.actor = foundActor;
        break;
      }
    }

    if (!this.actor) {
      console.error(`Actor with name ${actorName} not found.`);
      this.actor = {
        Name: actorName,
        Role: "Unknown",
        Bio: "Actor information not available.",
        Photo: "default-photo.png",
      };
    }
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #1c1c1c;
}

.actor-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1c1c1c;
  color: #f0f0f0;
  font-family: "Roboto", sans-serif;
  max-height: 100vh;
}

.back-button-container {
  align-self: flex-start;
  margin-bottom: 20px;
}

.back-button {
  background-color: black;
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

.actor-content {
  display: flex;
  gap: 20px;
  max-width: 900px;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  background-color: #2a2a2a;
  width: 100%;
}

.actor-photo-container {
  flex-shrink: 0;
}

.actor-photo {
  width: 200px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.actor-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding-left:5px;
}

.actor-name {
  font-size: 36px;
  font-weight: bold;
  color: #fdd835;
  text-align: center;
  margin-bottom: 20px;
}

.actor-info p {
  margin: 5px 0;
}

.actor-info strong {
  color: #fdd835;
}

@media (max-width: 600px) {
  .actor-content {
    flex-direction: column;
    align-items: center;
  }
  .actor-photo {
    width: 150px;
  }
}
</style>
