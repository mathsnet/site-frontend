<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.secondary }">
    <v-app-bar color="primary" prominent flat tile app>
      <v-spacer />
      <v-app-bar-title class="mt-n5"
        ><TheSiteLogo logo-type="w"
      /></v-app-bar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fill-height>
        <v-row
          justify="center"
          align="center"
          align-content="center"
          class="my-5"
        >
          <v-col cols="12" sm="6" md="5">
            <v-card elevation="12" rounded>
              <nuxt />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <TheSnackbarAlert />
  </v-app>
</template>

<script>
import TheSnackbarAlert from '~/components/general/TheSnackbarAlert'
import TheSiteLogo from '~/components/general/TheSiteLogo'
export default {
  name: 'Auth',
  components: { TheSiteLogo, TheSnackbarAlert },
}
</script>

<style scoped></style>
