<template>
  <div>
    <v-img :lazy-src="logoUrl" :src="logoUrl" :width="logoWidth" />
  </div>
</template>

<script>
export default {
  name: 'TheSiteLogo',
  props: {
    logoType: {
      type: String,
      default: 'primary',
    },
    width: {
      type: Number,
      default: 120,
    },
  },
  computed: {
    logoUrl() {
      return this.logoType === 'primary'
        ? '/images/mathsnet_logo_p.png'
        : '/images/mathsnet_logo_w.png'
    },
    logoWidth() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return 95
      } else if (this.$vuetify.breakpoint.smOnly) {
        return 110
      } else {
        return 120
      }
    },
  },
}
</script>

<style scoped></style>
