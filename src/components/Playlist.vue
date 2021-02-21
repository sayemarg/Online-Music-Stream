<template>
  <div class="playlist__tabs">
    <div class="playlist__tab" :class="{ 'playlist__tab--active': selectedTab === 0 }"
         @click="changeTab(0)">
      List
    </div>
    <div class="playlist__tab" :class="{ 'playlist__tab--active': selectedTab === 1 }"
      @click="changeTab(1)" v-show="selectedMusic !== null">
      Lyrics
    </div>
  </div>

  <div class="playlist__content">
    <div class="playlist__list" v-show="selectedTab === 0">
      <template v-if="music_list.length !== 0">
        <div class="playlist-item" v-for="(music, index) in music_list" :key="index" @click="playWithIndex(index)">
          <div class="playlist-item__image">
            <img :src="music.image" :alt="music.name">
          </div>
          <div class="playlist-item__detail">
            <div class="playlist-item__name">{{ music.name }}</div>
            <div class="playlist-item__singer">{{ music.singer }}</div>
          </div>
        </div>
      </template>

      <div class="playlist--empty" v-else>
        This PlayList Is Empty
      </div>
    </div>

    <div class="playlist__lyric" v-show="selectedTab === 1" v-if="selectedMusic !== null">
      {{ music_list[selectedMusic].lyric }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  props: {
    music_list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTab: 0,
      selectedMusic: null
    }
  },
  methods: {
    changeTab(index) {
      this.selectedTab = index;
    },
    playWithIndex(index) {
      this.selectedMusic = index;
      this.$emit('play-with-index', index);
    }
  },
  emits: ['play-with-index']
}
</script>

<style scoped>
  .playlist__tab {
    border-radius: 5px 5px 0 0;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    padding: 10px 20px;
    text-align: center;
    transition: background-color 0.5s ease-in-out;
    width: 50%;
  }
  .playlist__tab:hover {
    background-color: #404040;
  }
  .playlist__tab--active {
    border-bottom: 2px solid #ffffff;
  }
  .playlist__content {
    overflow: scroll;
    max-height: 70vh;
  }
  .playlist__lyric {
    color: #ffffff;
    padding-top: 20px;
    text-align: center;
    text-transform: capitalize;
    white-space: pre-line;
  }
  .playlist--empty {
    background-color: #dc143c;
    border-radius: 5px;
    color: #ffffff;
    font-weight: bold;
    margin-top: 10px;
    padding: 20px;
    text-align: center;
    width: 100%;
  }

  .playlist-item {
    border-bottom: 1px solid #aaaaaa;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    padding: 5px;
    transition: background-color 0.3s ease-in-out;
  }
  .playlist-item:hover {
    background-color: #606060;
  }
  .playlist-item:last-of-type {
    border-bottom: none;
  }
  .playlist-item__image {
    flex: 0 0 25%;
  }
  .playlist-item__image img {
    display: block;
    height: 50px;
    margin: 0 auto;
    object-fit: cover;
    width: 50px;
  }
  .playlist-item__detail {
    align-items: flex-start;
    display: flex;
    flex: 0 0 75%;
    flex-flow: column wrap;
    justify-content: center;
  }
  .playlist-item__name {
    color: #ffffff;
  }
  .playlist-item__singer {
    color: #bbbbbb;
  }
</style>
