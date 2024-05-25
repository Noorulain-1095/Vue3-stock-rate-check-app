<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import watchlist from './components/WatchList.vue'
import './index.css'

export default defineComponent({
  components: {
    Header,
    watchlist
  }
})
</script>

<template>
  <Header />
  <main class="main">
    <watchlist/>
  </main>
</template>

<style>
#app {
  font-family: var(--font-regular);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main {
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: 50px;
}

.heading1 {
  font-family: var(--font-bold);
}

</style>
