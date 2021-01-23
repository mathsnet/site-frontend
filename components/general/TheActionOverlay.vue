<template>
  <div>
    <v-overlay :value="showOverlay" :opacity="opacity">
      <v-progress-circular size="50" indeterminate></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'TheActionOverlay',
  computed: {
    showOverlay() {
      return this.$store.getters['actionoverlay/getShow']
    },
    opacity() {
      return this.$store.getters['actionoverlay/getOpacity']
    },
  },
}
</script>

<style scoped></style>
