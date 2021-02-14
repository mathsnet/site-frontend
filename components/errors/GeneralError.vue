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
          v-if="showReload"
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
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  name: 'GeneralError',
  props: {
    showImg: {
      type: Boolean,
      default: true,
    },
    msg: {
      type: String,
      default: 'Oops! Something went wrong with your request. please try again',
    },
    showReload: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      errorMsg: CONSTANTS.MESSAGES.GENERAL_ERROR_MESSAGE,
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
