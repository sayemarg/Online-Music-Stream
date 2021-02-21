<template>
  <div class="home-card">
    <div class="home-card__header">
      <div class="home-card__image">
        <router-link :to="{ name: 'Music', params: { id: music.id } }">
          <img :src="music.image" :alt="music.name">
        </router-link>
      </div>
      <div class="home-card__play" @click="playMusic">
        <i class="fa fa-play"></i>
      </div>
    </div>

    <div class="home-card__footer">
      <h2 class="home-card__title">
        <router-link :to="{ name: 'Music', params: { id: music.id } }">{{ music.name }}</router-link>
      </h2>
      <p class="home-card__detail">{{ music.singer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicCard",
  props: {
    music: {
      type: Object,
      required: true
    }
  },
  methods: {
    playMusic() {
      this.$bus.emit('play-single-music', this.music);
    }
  }
}
</script>

<style>
  /* Static Width For Card */
  .home-card {
    display: inline-block;
    margin-right: 20px;
    width: 200px;
  }
  .home-card:last-of-type {
    margin-right: 0;
  }

  .home-card__header {
    position: relative;
  }
  .home-card__image img {
    width: 100%;
    height: 200px;
    border-radius: 5px;
  }
  .home-card__image img:hover {
    opacity: 0.8;
  }
  .home-card__play {
    align-items: center;
    background-color: #000000;
    border-radius: 50%;
    bottom: 15px;
    color: #FFFFFF;
    cursor: pointer;
    display: flex;
    height: 50px;
    justify-content: center;
    opacity: 0.7;
    position: absolute;
    right: 15px;
    transition: transform 0.2s ease-in-out;
    visibility: hidden;
    width: 50px;
    z-index: 1;
  }
  .home-card__play:hover {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }
  .home-card__header:hover .home-card__play {
    visibility: visible;
  }

  .home-card__title {
    margin: 5px 0;
  }
  .home-card__title a {
    color: #FFFFFF;
    text-decoration: none;
  }
  .home-card__title a:hover {
    text-decoration: underline;
  }
  .home-card__detail {
    color: #aaaaaa;
    margin: 5px 0 0;
    white-space: pre-wrap;
  }
</style>
