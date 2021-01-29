<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-app-bar color="secondary" app>
      <v-toolbar-title
        ><!--<v-bt
          text
          color="primary"
          tile
          plain
          class="text-capitalize"
          nuxt
          to="/"
          >{{ appName }}</v-bt
        >-->
        <TheSiteLogo />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <TheToolbarMenuItems />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <TheNavFooter />
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
import TheNavFooter from '~/components/general/TheNavFooter'
import TheSiteLogo from '~/components/general/TheSiteLogo'

export default {
  name: 'Homepage',
  components: {
    TheSiteLogo,
    TheNavFooter,
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
