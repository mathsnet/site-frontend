<template>
  <div class="mx-5 text-center my-7">
    <v-row align="center" justify="center" fill-height>
      <v-col cols="12" md="6">
        <v-card
          width="700"
          flat
          tile
          style="background-color: transparent !important"
        >
          <v-img :src="errorImage" />
        </v-card>
      </v-col>
    </v-row>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <v-btn
      class="mt-3 ml-3 text-capitalize"
      color="primary"
      outlined
      @click="$router.go()"
      >Reload</v-btn
    >
    <v-btn
      class="mt-3 text-capitalize"
      color="primary"
      outlined
      :to="{ name: 'index' }"
      >Home Page</v-btn
    >
  </div>
</template>

<script>
export default {
  layout: 'homepage',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      errorImage: '/images/mathsnet_error_image.png',
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
