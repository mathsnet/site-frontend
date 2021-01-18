<template>
  <div>
    <v-overlay :value="showOverlay" opacity="0.8">
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
  },
}
</script>

<style scoped></style>
