<template>
  <div class="container">
    <h1 class="title">All Musics: </h1>
    <HorizontalScroll>
      <MusicCard v-for="(item, index) in music" :key="index" :music="item" />
    </HorizontalScroll>

    <h1 class="title">All PlayLists:</h1>
    <HorizontalScroll>
      <PlaylistCard v-for="(item, index) in playlist" :key="index" :playlist="item" />
    </HorizontalScroll>
  </div>
</template>

<script>
import HorizontalScroll from "@/components/home/HorizontalScroll";
import MusicCard from "@/components/home/MusicCard";
import PlaylistCard from "@/components/home/PlaylistCard";

export default {
  name: "Home",
  components: {
    PlaylistCard,
    HorizontalScroll,
    MusicCard
  },
  data() {
    return {
      music: [],
      playlist: []
    }
  },
  methods: {
    loadData() {
      fetch('http://localhost:3000/music')
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error();
        })
        .then(result => {
          this.music = result;
        })
        .catch(error => {
          this.$bus.emit('error', 'Error In Connection Happened! Please Try Later');
        })

      fetch('http://localhost:3000/playlist')
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          throw new Error();
        })
        .then(result => {
          this.playlist = result;
        })
        .catch(error => {
          this.$bus.emit('error', 'Error In Connection Happened! Please Try Later');
        })
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>

<style scoped>
  .container {
    background-color: #030303;
  }
  .title {
    color: #FFFFFF;
    font-size: 3vw;
    margin: 0;
    padding: 50px 5% 25px;
    transition: font-size 0.2s ease-in-out;
  }

  @media screen and (max-width: 768px) {
    .title {
      font-size: 5vw;
    }
  }
</style>
