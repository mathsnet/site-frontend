<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-app-bar color="secondary" app>
      <v-toolbar-title
        ><v-btn text color="primary" nuxt to="/">{{ appName }}</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <TheToolbarMenuItems />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <TheSiteFooter />
    <TheSnackbarAlert />
    <TheActionOverlay />
  </v-app>
</template>

<script>
import TheToolbarMenuItems from '~/components/general/TheToolbarMenuItems'
import TheSnackbarAlert from '~/components/general/TheSnackbarAlert'
import TheActionOverlay from '~/components/general/TheActionOverlay'
import { CONSTANTS } from '~/assets/javascript/constants'
import TheSiteFooter from '~/components/general/TheSiteFooter'

export default {
  name: 'Homepage',
  components: {
    TheSiteFooter,
    TheActionOverlay,
    TheToolbarMenuItems,
    TheSnackbarAlert,
  },
  data() {
    return {
      appName: CONSTANTS.APP_NAME,
    }
  },
}
</script>

<style scoped></style>
