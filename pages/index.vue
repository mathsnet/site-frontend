<template>
  <div class="mb-5">
    <v-sheet color="secondary" class="mt-n5 pt-6 pt-md-3">
      <v-row justify="center" align="center" class="pt-2 pt-md-1 ml-sm-4 mb-5">
        <v-col cols="12" sm="7" md="5" class="pl-5">
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
    </v-sheet>
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
    <v-row
      v-if="$fetchState.pending"
      justify="center"
      align="center"
      align-content="center"
    >
      <v-col cols="12">
        <CircularLoader />
      </v-col>
    </v-row>
    <v-row
      v-else-if="$fetchState.error"
      justify="center"
      align="center"
      align-content="center"
    >
      Error Loading Data
    </v-row>
    <div v-else class="mx-7 my-7">
      <div v-if="courses.length > 0">
        <v-row>
          <v-col
            v-for="(course, n) in courses"
            :key="n"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <CourseDataCardGeneral :course="course" />
          </v-col>
        </v-row>
        <ThePagination />
      </div>
      <div v-else class="text-center font-weight-bold text-h4">
        No Data To Display Right Now
      </div>
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import CourseDataCardGeneral from '~/components/cards/CourseDataCardGeneral'
import CircularLoader from '~/components/loaders/CircularLoader'
import ThePagination from '~/components/general/ThePagination'

export default {
  layout: 'homepage',
  components: {
    CourseDataCardGeneral,
    CircularLoader,
    ThePagination,
  },
  async fetch() {
    const { data } = await this.$axios.get(CONSTANTS.ROUTES.GENERAL.GET_COURSES)
    this.courses = data.courses
  },
  data() {
    return {
      displayImage: '/images/hero_image.png',
      courses: [],
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
