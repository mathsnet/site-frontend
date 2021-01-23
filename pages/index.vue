<template>
  <div class="mb-5">
    <v-row justify="center" align="center" class="mt-2 mt-md-1 ml-sm-4 mb-5">
      <v-col cols="12" sm="7" md="5" class="pl-3">
        <div
          class="primary--text display-1 text-sm-h4 text-center text-md-left font-weight-black"
        >
          LEARN MATH EASILY AND SWIFTLY WITH US
        </div>
        <div class="title text-center text-md-left">
          Learn and understand math easily and quickly using great teaching
          methods
        </div>
      </v-col>
      <v-col cols="12" sm="5" md="7" class="mt-n9 mt-sm-0">
        <v-img :src="displayImage"></v-img>
      </v-col>
    </v-row>
    <v-row class="mt-5 mx-5">
      <v-col cols="12">
        <div class="mx-4 d-flex">
          <span class="text-uppercase font-weight-bold">Courses</span>
          <span class="ml-auto">
            <v-btn icon><v-icon>mdi-chevron-left</v-icon></v-btn>
            <v-btn icon><v-icon>mdi-chevron-right</v-icon></v-btn>
          </span>
        </div>
        <v-divider> </v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="n in 6" :key="n" cols="12">
        <v-card class="mx-5">
          <v-card-title>Title</v-card-title>
          <v-card-text>Text</v-card-text>
          <v-card-actions>Actions</v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  layout: 'homepage',
  components: {},
  data() {
    return {
      displayImage: '/images/hero_image.png',
    }
  },
  head: {
    title: `Home`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `${CONSTANTS.APP_NAME} Homepage, Online maths schools`,
      },
    ],
  },
}
</script>
