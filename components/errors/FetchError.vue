<template>
  <div class="my-9">
    <v-row v-if="showImg" align="center" justify="center">
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
    <div class="text-center">
      <div class="mt-3">
        {{ errorMsg }}
      </div>
      <div class="mt-5">
        <v-btn
          outlined
          color="primary"
          class="text-capitalize"
          @click="$emit('reloadFetch')"
          >Refresh</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  props: {
    showImg: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      errorMsg: CONSTANTS.MESSAGES.FETCH_LOADING_ERROR,
    }
  },
  computed: {
    errorImage() {
      return '/images/mathsnet_error_image.png'
    },
  },
  methods: {},
}
</script>

<style scoped></style>
