<template>
  <div class="home-card">
    <div class="home-card__header">
      <div class="home-card__image">
        <router-link :to="{ name: 'PlaylistPage', params: { id: playlist.id } }">
          <img :src="playlist.image" :alt="playlist.name">
        </router-link>
      </div>
      <div class="home-card__play" @click="playPlaylist">
        <i class="fa fa-play"></i>
      </div>
    </div>

    <div class="home-card__footer">
      <h2 class="home-card__title">
        <router-link :to="{ name: 'PlaylistPage', params: { id: playlist.id } }">{{ playlist.name }}</router-link>
      </h2>
      <p class="home-card__detail">{{ playlist.detail }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistCard",
  props: {
    playlist: {
      type: Object,
      required: true
    }
  },
  methods: {
    playPlaylist() {
      const url = 'http://localhost:3000/music?pid=' + this.playlist.id;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          throw new Error();
        })
        .then(result => {
          this.$bus.emit('play-playlist', {
            list: result,
            index: 0
          })
        })
        .catch(error => {
          this.$bus.emit('error', 'Error In Connection Happened! Please Try Later');
        })
    }
  }
}
</script>
