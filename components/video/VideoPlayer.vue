<template>
  <div>
    <div
      v-video-player:myVideoPlayer="playerOptions"
      class="video-player-box"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    playerOptions: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
