<template>
  <div>
    <div class="mt-8">
      <v-footer padless app>
        <v-card
          :color="$vuetify.theme.themes.light.background"
          class="text-center text-sm-left"
          min-width="100%"
        >
          <v-card-text>
            <v-row
              justify="center"
              align="center"
              align-content="center"
              class="text-center"
            >
              <v-col cols="12" align-self="center" class="text-center">
                <v-divider></v-divider>
                <span class="text-center"
                  >&copy; {{ new Date().getFullYear() }},
                  <v-btn
                    text
                    class="mx-n4 text-capitalize"
                    color="primary"
                    plain
                    tile
                    to="/"
                    >{{ appName }}</v-btn
                  >
                  All Right Reserved. Developed by
                  <span class="font-weight-bold">Rastaarc</span>, Designed by
                  <span class="font-weight-bold">Winnpixels</span></span
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-footer>
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
// import TheNavFooter from '~/components/general/TheNavFooter'
export default {
  name: 'TheSiteFooter',
  components: {},
  data() {
    return {
      fixed: false,
      appName: CONSTANTS.APP_NAME,
    }
  },
}
</script>

<style scoped></style>
