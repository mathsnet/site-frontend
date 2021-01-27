<template>
  <v-app dark>
    <TheAppBar />
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
import TheAppBar from '~/components/general/TheAppBar'
import TheSiteFooter from '~/components/general/TheSiteFooter'
import TheSnackbarAlert from '~/components/general/TheSnackbarAlert'
import TheActionOverlay from '~/components/general/TheActionOverlay'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  components: {
    TheActionOverlay,
    TheAppBar,
    TheSiteFooter,
    TheSnackbarAlert,
  },
  data() {
    return {
      title: CONSTANTS.APP_NAME,
    }
  },
}
</script>
