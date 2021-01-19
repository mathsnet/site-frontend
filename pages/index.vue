<template>
  <v-row justify="center" align="center" class="mt-2 mt-md-1 ml-sm-4">
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
</template>

<script>
export default {
  layout: 'homepage',
  components: {},
  data() {
    return {
      displayImage: '/images/hero_image.png',
    }
  },
}
</script>
