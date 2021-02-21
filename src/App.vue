<template>
  <!-- Navbar Here -->
  <NavBar />

  <!-- On Screen Error -->
  <ErrorList />

  <!-- Main View For Changing -->
  <router-view />

  <!-- Footer Of ALl Pages -->
  <Footer />

  <!-- Go To Top -->
  <GoUp :is_playing="showPlayer" />

  <!-- Player Component -->
  <Player :show_player="showPlayer" @toggle-player="togglePlayer" />
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Footer from "@/components/footer/Footer";
import GoUp from "@/components/footer/GoUp";
import Player from "@/components/player/Player";
import ErrorList from "@/components/ErrorList";

export default {
  name: "App",
  components: {
    NavBar,
    ErrorList,
    GoUp,
    Footer,
    Player
  },
  data() {
    return {
      showPlayer: false
    }
  },
  methods: {
    togglePlayer(show) {
      this.showPlayer = show
    }
  }
}
</script>
