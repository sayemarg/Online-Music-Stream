<template>
  <div v-if="show_player" class="player">
    <audio ref="audio_player" @timeupdate="audioTimeUpdate" @ended="endMusic" @progress="audioBufferUpdate" hidden>
      <source :src="audioSource" type="audio/mpeg">
      Your Browser Does Not Support Audio
    </audio>

    <PlayerList :show="showList" :playlist="playlist" :play-index="playIndex"
      @close-player-list="togglePlayerList" @clear-player-list="clearPlayerList"
      @music-item-delete="playerMusicDelete" @music-item-play="playerMusicPlay"/>

    <div v-show="timing.show" class="player__timing" :style="{ 'left': timing.position }">
      {{ timing.text }}
    </div>

    <div class="player__progress-bar" @click="seekMusic"
         @mouseenter="showTiming" @mousemove="setTiming" @mouseleave="hideTiming">
      <div class="player__progress-bar-buffer" :style="{ 'width': progress.buffer }"></div>
      <div class="player__progress-bar-current" :style="{ 'width': progress.current }"></div>
      <div class="player__progress-bar-seeker" :style="{ 'left': progress.current }"></div>
    </div>

    <div class="player__controls">
      <div class="player__controls--left">
        <div class="player__image">
          <router-link :to="{ name: 'Music', params: { id: playlist[playIndex].id } }">
            <img :src="playlist[playIndex].image" :alt="playlist[playIndex].name">
          </router-link>
        </div>
        <div class="player__detail">
          <h3 class="player__detail-text">{{ playlist[playIndex].name }}</h3>
          <h5 class="player__detail-text">{{ playlist[playIndex].singer }}</h5>
        </div>
      </div>

      <div class="player__controls--middle">
        <div class="player__control">
          <div class="player__control-icon" title="Previous Track">
            <i class="fa fa-fast-backward" @click="changeTrack(-1)"></i>
          </div>
        </div>
        <div class="player__control">
          <div class="player__control-icon" title="10 Seconds Ago">
            <i class="fa fa-backward" @click="seekTenSecond(-1)"></i>
          </div>
        </div>
        <div class="player__control">
          <div class="player__control-icon" :title="[ play ? 'Pause' : 'Play' ]">
            <i class="fa" :class="[ play ? 'fa-pause' : 'fa-play' ]" @click="togglePlay(!play)"></i>
          </div>
        </div>
        <div class="player__control">
          <div class="player__control-icon" title="10 Seconds Later">
            <i class="fa fa-forward" @click="seekTenSecond(1)"></i>
          </div>
        </div>
        <div class="player__control">
          <div class="player__control-icon" title="Next Track">
            <i class="fa fa-fast-forward" @click="changeTrack(1)"></i>
          </div>
        </div>
      </div>

      <div class="player__controls--right">
        <div class="player__control">
          <div class="player__control-icon player__sound" :title="sound">
            <div class="player__sound-container">
              <div class="player__sound-volume" @click="changeVolume">
                <div class="player__sound-seeker" :style="{ 'height': sound + '%' }"></div>
              </div>
            </div>
            <i class="fa" :class="volumeIcon" @click.self="toggleVolume"></i>
          </div>
        </div>
        <div class="player__control">
          <div class="player__control-icon" :class="{ 'player__control-icon--disable': !shuffle }"
               :title="[ shuffle ? 'Shuffle Off' : 'Shuffle On' ]">
            <i class="fa fa-random" @click="toggleShuffle"></i>
          </div>
        </div>
        <div class="player__control">
          <div class="player__control-icon" :class="{ 'player__control-icon--disable': !repeat }"
               :title="[ repeat ? 'Repeat Off' : 'Repeat On' ]">
            <i class="fa fa-repeat" @click="toggleRepeat"></i>
          </div>
        </div>
        <div class="player__control">
          <div class="player__control-icon" :class="{ 'player__control-icon--disable': showList }"
               @click="togglePlayerList" :title="[ showList ? 'Hide List' : 'Show List' ]">
            <i class="fa fa-list"></i>
          </div>
        </div>
        <div class="player__control">
          <div class="player__control-icon" @click="toggleShowPlayer(false)" title="Stop And Close">
            <i class="fa fa-close"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerList from "@/components/player/PlayerList";

export default {
  name: "Player",
  components: {
    PlayerList
  },
  props: {
    show_player: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      timing: {
        show: false,
        text: '00:00',
        position: '0px'
      },
      progress: {
        current: '0%',
        buffer: '0%'
      },
      play: false,
      shuffle: false,
      repeat: false,
      sound: 100,
      /* Play List Options */
      playlist: [],
      playIndex: 0,
      showList: false
    }
  },
  methods: {
    toggleShowPlayer(show) {
      if (!show) {
        this.togglePlay(false);
        this.play = false
        this.playlist = []
        this.playIndex = 0
      }
      this.$emit('toggle-player', show)
    },
    // Seek Music By Click On SeekBar
    seekMusic(event) {
      const clickPercent = (event.clientX / document.body.clientWidth);

      this.$refs.audio_player.currentTime = this.$refs.audio_player.duration * clickPercent;
      this.progress.current = (clickPercent * 100) + '%';
    },
    audioTimeUpdate() {
      try {
        this.progress.current = (this.$refs.audio_player.currentTime / this.$refs.audio_player.duration * 100) + '%';
      } catch (e) {
        // console.log(e);
      }
    },
    // Find Nearest Buffer To Current Play Time From Last To First
    audioBufferUpdate() {
      const audioPlayer = this.$refs.audio_player;

      for (let i = 0, index; i < audioPlayer.buffered.length; i++) {
        index = audioPlayer.buffered.length - (i + 1);

        if (audioPlayer.buffered.start(index) <= audioPlayer.currentTime) {
          this.progress.buffer = (audioPlayer.buffered.end(index) / audioPlayer.duration * 100) + '%';
          break;
        }
      }
    },
    // Where Should Show Timing
    showTiming() {
      this.timing.show = true;
    },
    setTiming(event) {
      const movePercent = event.clientX / document.body.clientWidth;
      const time = Math.floor(this.$refs.audio_player.duration * movePercent);

      let minute = String(Math.floor(time / 60)).padStart(2, '0');
      let second = String(time % 60).padStart(2, '0');

      let timingPosition = event.clientX;
      if (timingPosition < 20) {
        timingPosition = 20;
      } else if (timingPosition > (document.body.clientWidth - 20)) {
        timingPosition = document.body.clientWidth - 20;
      }

      this.timing.text = minute + ':' + second;
      this.timing.position = timingPosition + 'px';
    },
    hideTiming() {
      this.timing.show = false;
    },
    // Change Track To Next Or Previous
    changeTrack(step) {
      if (this.shuffle) {
        // Shuffle Play With Random Index
        let random;
        do {
          random = Math.floor(Math.random() * this.playlist.length);
        } while (random === this.playIndex && this.playlist.length > 1);

        this.playIndex = random;
      } else {
        this.playIndex += step;

        if (this.playIndex < 0) {
          this.playIndex = this.playlist.length - 1;
        } else if (this.playIndex === this.playlist.length) {
          this.playIndex = 0;
        }
      }

      this.reloadPlayer();
    },
    // Seek Music 10 Seconds Ago Or Later
    seekTenSecond(step) {
      this.$refs.audio_player.currentTime += (step) * 10;
    },
    // Toggle Play
    togglePlay(play) {
      if (play) {
        this.$refs.audio_player.play();
      } else {
        this.$refs.audio_player.pause();
      }
      this.play = play;
    },
    // Change Volume By User Click
    changeVolume(event) {
      const volumeContainer = event.target.closest('div.player__sound-volume');

      let percent = (volumeContainer.getBoundingClientRect().bottom - event.clientY) / volumeContainer.offsetHeight;
      percent = Math.floor(percent * 100);
      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }

      this.sound = percent;
      this.$refs.audio_player.volume = percent / 100;
    },
    toggleVolume() {
      this.sound = Boolean(this.sound) ? 0 : 100;
      this.$refs.audio_player.volume = (this.sound / 100);
    },
    // Toggle Shuffling Mode
    toggleShuffle() {
        this.shuffle = !this.shuffle;
    },
    // Toggle Repeat Mode
    toggleRepeat() {
      this.repeat = !this.repeat;
    },
    // Player Music List Functions
    togglePlayerList() {
      this.showList = !this.showList;
    },
    clearPlayerList() {
      this.playlist = this.playlist.slice(this.playIndex, this.playIndex + 1);
      this.playIndex = 0;
    },
    playerMusicDelete(index) {
      this.playlist.splice(index, 1);

      if (index < this.playIndex) {
        this.playIndex--;
      }
    },
    playerMusicPlay(index) {
      this.playIndex = index;
      this.reloadPlayer();
    },
    /* Music Events Control */
    endMusic() {
      this.togglePlay(false);
      this.$refs.audio_player.currentTime = 0;
      if (this.repeat) {
        this.togglePlay(true);
      } else {
        if (this.playlist.length > 1) {
          this.changeTrack(1);
        }
      }
    },
    reloadPlayer() {
      // Wait For Player Mount
      this.$refs.audio_player.load();
      this.togglePlay(true);
    },
    playSingleMusic(music) {
      this.playlist = [music];
      this.playIndex = 0;
      this.toggleShowPlayer(true);
      setTimeout(() => {
        this.reloadPlayer();
      }, 500);
    },
    playPlaylist(event) {
      if (event.list.length !== 0) {
        this.playlist = event.list;
        this.playIndex = event.index;
        this.toggleShowPlayer(true);
        setTimeout(() => {
          this.reloadPlayer();
        }, 500);
      } else {
        this.$bus.emit('error', 'This Playlist Is Empty!');
      }
    },
    addToPlaylist(music) {
      if (this.playlist.length) {
        this.playlist.push(music);
      } else {
        this.$bus.emit('error', 'Your Player Playlist Is Empty!');
      }
    },
  },
  computed: {
    audioSource() {
      return this.playlist[this.playIndex].src;
    },
    // Change Volume Icon By The Amount Of Sound
    volumeIcon() {
      return {
        'fa-volume-up': this.sound >= 50,
        'fa-volume-down': this.sound < 50 && this.sound > 0,
        'fa-volume-off': this.sound === 0,
        'player__control-icon--disable': this.sound === 0
      }
    }
  },
  mounted() {
    this.$bus.on('play-single-music', (music) => {
      this.playSingleMusic(music);
    });

    this.$bus.on('play-playlist', (event) => {
      this.playPlaylist(event);
    });

    this.$bus.on('add-to-playlist', (music) => {
      this.addToPlaylist(music);
    });
  }
}
</script>

<style scoped>
.player {
  background-color: #212121;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 2;
}

/* Timing */
.player__timing {
  background-color: #404040;
  border-radius: 5px;
  bottom: 110%;
  color: #ffffff;
  display: inline-block;
  padding: 2px;
  position: absolute;
  transform: translateX(-50%);
  z-index: 0;
}

/* Progress Bar */
.player__progress-bar {
  background-color: #404040;
  cursor: pointer;
  height: 5px;
  position: relative;
  width: 100%;
  z-index: 0;
}

.player__progress-bar-buffer, .player__progress-bar-current, .player__progress-bar-seeker {
  left: 0;
  position: absolute;
  top: 0;
}

.player__progress-bar-buffer {
  background-color: #707070;
  height: 5px;
}

.player__progress-bar-current {
  background-color: #ff0000;
  height: 5px;
}

.player__progress-bar-seeker {
  background-color: #ff0000;
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  top: -3px;
  transform: translateX(-5px);
  width: 10px;
}

/* Controls Of Player */
.player__controls {
  display: flex;
  flex-flow: row wrap;
}

.player__controls--left, .player__controls--right, .player__controls--middle {
  align-items: center;
  display: flex;
  justify-content: center;
}

.player__controls--left {
  flex: 0 0 30%;
}
.player__controls--right, .player__controls--middle {
  flex: 0 0 35%;
}

/* Left Side */
.player__image {
  flex: 0 0 40%;
  padding: 10px;
  text-align: center;
}
.player__detail {
  flex: 60%;
  padding: 10px;
}

.player__image img {
  border-radius: 10px;
  height: 75px;
  object-fit: cover;
  width: 75px;
}
.player__detail-text {
  color: #ffffff;
  margin: 0 0 5px;
  text-align: center;
}

/* Middle, Right Side */
.player__control {
  flex: 1 0;
  padding: 20px;
  text-align: center;
}

.player__control-icon {
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 1.5em;
}

.player__control-icon--disable {
  color: #808080;
}

/* Sound Control */
.player__sound {
  position: relative;
  z-index: 1;
}
.player__sound-container {
  background-color: #212121;
  border: 1px solid #aaaaaa;
  border-radius: 15px;
  bottom: 100%;
  cursor: default;
  display: none;
  height: 150px;
  left: 0;
  padding: 5px 0;
  position: absolute;
  transform: rotate(180deg);
  width: 20px;
}
.player__sound-volume {
  background-color: transparent;
  cursor: pointer;
  height: 100%;
  margin: 0 auto;
  width: 50%;
}
.player__sound-seeker {
  background-color: #aaaaaa;
  border-radius: 15px;
  transition: height 0.3s linear;
}

/* Player Media Query */
@media screen and (min-width: 992px){
  /* Show Sound Option For Large Screen */
  .player__sound:hover .player__sound-container {
    display: block;
  }
}
@media screen and (max-width: 992px) {
  /* Left Side */
  .player__controls--left {
    flex: 0 0 30%;
    order: 2;
  }
  .player__image {
    display: none;
  }

  /* Middle Side */
  .player__controls--right {
    flex: 0 0 70%;
    order: 3;
  }

  /* Right Side */
  .player__controls--middle {
    flex: 0 0 100%;
    order: 1;
  }
}
</style>
