<template>
  <v-footer :absolute="!fixed" app>
    <span
      >&copy; {{ new Date().getFullYear() }}, {{ appName }}. All Right Reserved.
      Developed by <span class="font-weight-bold">Rastaarc</span>, Designed by
      <span class="font-weight-bold">Winnpixels</span></span
    >
  </v-footer>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'TheSiteFooter',
  data() {
    return {
      fixed: true,
      appName: CONSTANTS.APP_NAME,
    }
  },
}
</script>

<style scoped></style>
