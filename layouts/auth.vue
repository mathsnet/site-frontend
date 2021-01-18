<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
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
export default {
  name: 'Auth',
  components: { TheSnackbarAlert },
}
</script>

<style scoped></style>
