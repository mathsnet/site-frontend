<template>
  <v-app dark>
    <TheNavigationDrawer :show-nav-bar="drawer" />
    <v-app-bar color="primary" fixed app>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text" v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <TheSiteFooter />
    <TheSnackbarAlert />
    <TheActionOverlay />
  </v-app>
</template>

<script>
import TheNavigationDrawer from '~/components/general/TheNavigationDrawer'
import TheSiteFooter from '~/components/general/TheSiteFooter'
import TheSnackbarAlert from '~/components/general/TheSnackbarAlert'
import TheActionOverlay from '~/components/general/TheActionOverlay'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  components: {
    TheActionOverlay,
    TheNavigationDrawer,
    TheSiteFooter,
    TheSnackbarAlert,
  },
  data() {
    return {
      title: CONSTANTS.APP_NAME,
      drawer: true,
      fixed: false,
    }
  },
}
</script>
