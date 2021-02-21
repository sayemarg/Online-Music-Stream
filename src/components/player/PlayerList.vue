<template>
  <div class="player-list" :class="[ show ? 'player-list--show' : 'player-list--hide' ]">
    <div class="player-list__header">
      <div class="player-list__clear" @click="clearList" title="Clear List">
        <i class="fa fa-trash"></i>
      </div>

      <div class="player-list__close" @click="closeList" title="Close List">
        <i class="fa fa-close"></i>
      </div>
    </div>

    <div class="player-list__body">
      <template v-for="(music, index) in playlist">
        <div class="music-item" :class="{ 'music-item--playing': index === playIndex }"
             @click="musicItemClick($event, index)">
          <div class="music-item__image">
            <img class="music-item__image" :src="music.image" :alt="music.name">
          </div>
          <div class="music-item__detail">
            <h4>{{ music.name }}</h4>
            <p>{{ music.singer }}</p>
          </div>
          <div class="music-item__remove">
            <i v-show="index !== playIndex" class="fa fa-trash"></i>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerList",
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    playlist: {
      type: Array,
      required: true,
      default: []
    },
    playIndex: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    clearList() {
      this.$emit('clear-player-list');
    },
    closeList() {
      this.$emit('close-player-list');
    },
    musicItemClick(event, index) {
      if (index !== this.playIndex) {
        const eventName = (event.target.matches('i.fa.fa-trash')) ? 'music-item-delete' : 'music-item-play';
        this.$emit(eventName, index);
      }
    }
  }
}
</script>

<style scoped>
.player-list {
  background-color: #212121;
  border-right: 1px solid #777777;
  bottom: 0;
  height: 100%;
  left: 0;
  padding-top: 75px;
  position: fixed;
  transition: transform 0.3s linear, opacity 0.5s ease;
  user-select: none;
  width: 400px;
  z-index: 2;
}
.player-list--show {
  opacity: 1;
  transform: translateX(0);
}
.player-list--hide {
  opacity: 0;
  transform: translateX(-100%);
}

.player-list__header {
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.player-list__clear, .player-list__close {
  color: #ffffff;
  cursor: pointer;
}

.player-list__body {
  width: 100%;
  max-height: calc(100% - 40px);
  overflow-y: auto;
}
.music-item {
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  padding: 5px 10px 0;
}
.music-item:hover, .music-item--playing {
  background-color: #404040;
}
.music-item__image, .music-item__remove {
  flex: 0 0 25%;
  text-align: center;
}
.music-item__image img {
  border-radius: 50%;
  display: block;
  height: 75px;
  margin: 0 auto;
  width: 75px;
}
.music-item__detail {
  flex: 0 0 50%;
  text-align: center;
}
.music-item__detail h4 {
  margin-bottom: 0;
}
.music-item__detail, .music-item__remove {
  color: #ffffff;
}

@media screen and (max-width: 768px) {
  .player-list {
    width: 100%;
  }
}
</style>
