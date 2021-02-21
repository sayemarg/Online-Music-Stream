<template>
  <div class="playlist__container" v-if="playlist">
    <div class="playlist__image">
      <img :src="playlist.image" :alt="playlist.name">
      <div class="playlist__detail">
        {{ playlist.detail }}
      </div>
      <div class="playlist__play" title="Play Playlist" @click="playPlaylist(0)">
        <i class="fa fa-play"></i>
      </div>
    </div>

    <div class="playlist__right" v-if="musicList">
      <Playlist :music_list="musicList" @play-with-index="playPlaylist" />
    </div>
  </div>
</template>

<script>
import Playlist from '../components/Playlist'

export default {
  name: "PlaylistPage",
  components: {
    Playlist
  },
  data() {
    return {
      playlist: null,
      musicList: null
    }
  },
  methods: {
    playPlaylist(index) {
      this.$bus.emit('play-playlist', {
        list: this.musicList,
        index: index
      });
    }
  },
  mounted() {
    const id = this.$route.params.id;
    let url = 'http://localhost:3000/playlist/' + id;
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
        this.playlist = result;
      })
      .catch(error => {
        this.$bus.emit('error', 'Error In Connection Happened! Please Try Later');
      })

    url = 'http://localhost:3000/music?pid=' + id;
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
        this.musicList = result;
      })
      .catch(error => {
        this.$bus.emit('error', 'Error In Connection Happened! Please Try Later');
      })
  }
}
</script>

<style scoped>
  .playlist__container {
    align-items: flex-start;
    display: flex;
    flex-flow: row nowrap;
    padding: 100px;
  }
  .playlist__image {
    flex: 0 0 40%;
    position: relative;
  }
  .playlist__image img {
    border-radius: 15px;
    height: auto;
    width: 100%;
  }
  .playlist__play {
    align-items: center;
    background-color: #000000;
    border: 1px solid #aaaaaa;
    border-radius: 50%;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    font-size: 2em;
    height: 75px;
    justify-content: center;
    left: 50%;
    line-height: 75px;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: 0.3s ease-in-out;
    width: 75px;
  }
  .playlist__detail {
    background-color: #212121;
    border-radius: 0 0 15px 15px;
    color: #eeeeee;
    bottom: 3px;
    left: 0;
    padding: 20px 5px;
    position: absolute;
    opacity: 0;
    text-align: center;
    transition: opacity 0.3s ease-in-out;
    width: 100%;
  }
  .playlist__image:hover .playlist__play, .playlist__image:hover .playlist__detail {
    opacity: 1;
  }
  .playlist__play:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }

  .playlist__right {
    flex: 0 0 60%;
    padding: 0 50px;
  }

  @media screen and (max-width: 992px){
    .playlist__container {
      flex-wrap: wrap;
      padding: 100px 5%;
    }
    .playlist__image {
      padding: 0 20%;
      flex: 0 0 100%;
    }
    .playlist__detail {
      width: 60%;
      margin: 0 20%;
    }
    .playlist__right {
      flex: 0 0 100%;
      padding-top: 20px;
    }
  }
</style>
