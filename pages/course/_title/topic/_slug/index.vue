<template>
  <div class="ma-5">
    Topic Page - {{ $route.params.title }} | {{ $route.params.slug }}
    <VideoPlayer :player-options="options" />

    <vue-core-video-player :src="options.sources[0].src" />
    <video-embed :src="options.sources[1].src" />
    <video-embed :src="options.sources[0].src" />
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import VideoPlayer from '~/components/video/VideoPlayer'
export default {
  layout: 'homepage',
  components: {
    VideoPlayer,
  },
  data() {
    return {}
  },
  computed: {
    options() {
      return {
        language: 'en',
        sources: [
          {
            src:
              'https://res.cloudinary.com/rastaarc/video/upload/v1612834225/ts_afpof2.mp4',
          },
          {
            src:
              'https://www.youtube.com/watch?v=oBcRhrHb2Go&ab_channel=TopTipsGraphics',
          },
        ],
      }
    },
  },
  methods: {},
  head() {
    return {
      title: `${this.$route.params.slug}`,
    }
  },
}
</script>

<style scoped></style>
