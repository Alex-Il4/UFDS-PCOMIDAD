<template>
    <v-responsive class="border rounded">
        <v-app :theme="theme">
          <v-app-bar class="px-3" :elevation="0">
            <v-app-bar-title>Title</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn
              :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              text="Toggle Theme"
              slim
              @click="onClick"
            ></v-btn>
          </v-app-bar>
          <v-main>
            <v-container>
                <v-bottom-navigation
                v-model="value"
                :bg-color="color"
                mode="shift"
              >
                <v-btn>
                  <v-icon>mdi-television-play</v-icon>
                  <span>Video</span>
                </v-btn>
                <v-btn>
                  <v-icon>mdi-music-note</v-icon>
                  <span>Music</span>
                </v-btn>
                <v-btn>
                  <v-icon>mdi-book</v-icon>
                  <span>Book</span>
                </v-btn>
                <v-btn>
                  <v-icon>mdi-image</v-icon>
                  <span>Image</span>
                </v-btn>
              </v-bottom-navigation>
            </v-container>
          </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
export default {
    name: "DashboardMain",
    data: () => ({ value: 0 }),
    computed: {
      color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
          default: return 'blue-grey'
        }
      },
    },
}
</script>

<script setup>
  import { ref } from 'vue'

  const theme = ref('light')

  function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script>
<style scoped>

</style>