<template>
  <div class="music__container" v-if="music">
    <div class="music__image">
      <img :src="music.image" :alt="music.name">
    </div>

    <div class="music__detail">
      <h1 class="music__name">{{ music.name }}</h1>
      <h3 class="music__singer">{{ music.singer }}</h3>

      <ul class="music__options">
        <li class="music__option-item" @click="playMusic">
          <i class="fa fa-play"></i> Play
        </li>
        <li class="music__option-item" @click="addToPlaylist">
          <i class="fa fa-plus"></i> Add To Playlist
        </li>
        <li class="music__option-item">
          <i class="fa fa-heart"></i> Like
        </li>
      </ul>
    </div>
  </div>

  <div class="music__lyric" v-if="music">
    <div class="music__lyric-show" @click="toggleLyric">
      {{ lyricToggleText }}
      <i :class="[ 'fa', showLyric ? 'fa-angle-up' : 'fa-angle-down' ]"></i>
    </div>
    <div :class="[ 'music__lyric-text', showLyric ? 'music__lyric-text--show' : 'music__lyric-text--hide' ]" >
      {{ music.lyric }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Music",
  data() {
    return {
      showLyric: false,
      music: null
    }
  },
  methods: {
    toggleLyric() {
      this.showLyric = !this.showLyric;
    },
    playMusic() {
      this.$bus.emit('play-single-music', this.music);
    },
    addToPlaylist() {
      this.$bus.emit('add-to-playlist', this.music);
    }
  },
  computed: {
    lyricToggleText() {
      return (this.showLyric ? 'Hide Lyric' : 'Show Lyric');
    }
  },
  mounted() {
    const id = this.$route.params.id;
    const url = 'http://localhost:3000/music/' + id;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          this.$router.push('/NotFound');
        } else {
          throw new Error();
        }
      })
    .then(result => {
      this.music = result;
    })
    .catch(error => {
      this.$bus.emit('error', 'Error In Connection Happened! Please Try Later');
    })
  }
}
</script>

<style scoped>
  .music__container {
    display: flex;
    flex-flow: row nowrap;
    margin: 100px auto 50px;
    width: 80%;
  }

  /* Left Image */
  .music__image {
    flex: 0 0 25%;
    padding: 25px;
  }
  .music__image img {
    border-radius: 15px;
    width: 100%;
  }

  /* Right Detail */
  .music__detail {
    flex: 0 0 75%;
    padding: 25px;
  }
  .music__name, .music__singer {
    color: #ffffff;
  }
  /* Option List */
  .music__options {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .music__option-item {
    background-color: #000000;
    border: 1px solid #ffffff;
    border-radius: 15px;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    padding: 5px 10px;
    margin: 5px 10px 0 0;
    transition: all 0.2s ease-in-out;
  }
  .music__option-item:hover {
    /* background-color: #ffffff; */
    /* border: 1px solid #000000; */
    /* color: #000000; */
    filter: invert(100%);
  }

  /* Music Lyric */
  .music__lyric {
    margin: 0 auto 50px;
    width: 80%;
  }
  .music__lyric-show {
    cursor: pointer;
    color: #ffffff;
    margin: 0 auto;
    text-align: center;
    width: 40%;
  }
  .music__lyric-text {
    color: #ffffff;
    max-height: 75vh;
    margin-top: 50px;
    overflow: scroll;
    text-align: center;
    text-transform: capitalize;
    white-space: pre-line;
  }
  .music__lyric-text--show {
    display: block;
  }
  .music__lyric-text--hide {
    display: none;
  }

  /* Media Query */
  @media screen and (max-width: 768px) {
    .music__container {
      flex-wrap: wrap;
    }
    .music__image {
      flex: 0 0 100%;
    }
    .music__detail {
      flex: 0 0 100%;
    }
  }
</style>
