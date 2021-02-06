<template>
  <div>
    <v-card class="colorback mb-7 px-7 pt-6" flat tile>
      <v-card-text>
        <v-row class="fill-height mb-8" justify="center" align="center">
          <v-col cols="12" sm="6" md="8">
            <div
              class="primary--text text-h5 text-md-h3 text-center text-sm-left font-weight-bold"
            >
              Ready to make your Mathematics learning a beautify one?
            </div>
            <div
              class="text-subtitle-2 text-md-h6 text-center text-sm-left mt-4"
            >
              Browse through our available courses to brighten your horizon and
              excel in <span class="primary--text">Mathematics</span> or use the
              search box to find a specific course
            </div>
          </v-col>
          <v-col
            v-if="!$vuetify.breakpoint.xsOnly"
            cols="12"
            sm="6"
            md="4"
            class="text-center"
            order="1"
            order-sm="2"
          >
            <v-img
              :src="displayImg"
              min-width="300px"
              max-width="500px"
              alt="Display Image"
            />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
          class="mt-3 px-sm-16 text-center fill-height d-flex-column"
        >
          <v-col cols="12">
            <v-form ref="searchForm" :value="valid" @submit.prevent="search">
              <v-text-field
                v-model="searchItem"
                filled
                rounded
                :rules="searchRules"
                append-icon="mdi-magnify"
                @click:append="search"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn
            :small="$vuetify.breakpoint.xsOnly"
            color="primary"
            @click="search"
            >search</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <div class="mx-3 mt-16 mt-sm-4 mt-md-2">
      <div v-if="$fetchState.pending">
        <CircularLoader />
      </div>
      <div v-else-if="$fetchState.error">
        <FetchError @reloadFetch="$fetch" />
      </div>
      <div v-else>
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
          <div class="mt-7">
            <ThePagination
              :pagination="pagination"
              @changePage="moveToPage($event)"
            />
          </div>
        </div>
        <div v-else class="text-center font-weight-bold text-h4">
          No Course Data To Display Right Now
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import CourseDataCardGeneral from '~/components/cards/CourseDataCardGeneral'
import ThePagination from '~/components/general/ThePagination'
import { CONSTANTS } from '~/assets/javascript/constants'
import { formRules } from '~/assets/javascript/formRules'
export default {
  layout: 'homepage',
  components: {
    CircularLoader,
    FetchError,
    CourseDataCardGeneral,
    ThePagination,
  },
  async fetch() {
    let page
    this.pageToGo ? (page = this.pageToGo) : (page = this.$route.query.p)
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.GENERAL.GET_COURSES,
      { page }
    )
    this.courses = data.courses
    this.pagination = data.pagination
  },
  data() {
    return {
      valid: false,
      courses: [],
      pagination: {},
      pageToGo: null,
      searchItem: '',
      displayImg: '/images/courses_page_hero_img.png',
      searchRules: formRules.fieldRequired,
    }
  },
  computed: {
    displayHeight() {
      return this.$vuetify.breakpoint.mdAndUp
        ? '600px'
        : this.$vuetify.breakpoint.sm
        ? '450px'
        : '300px'
    },
  },
  methods: {
    moveToPage({ page }) {
      this.pageToGo = page
      this.$fetch()
    },
    search() {
      if (!this.$ref.searchForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      console.log(this.searchItem)
    },
  },
  head: {
    title: 'Courses',
  },
}
</script>

<style scoped>
.colorback {
  background-color: #dbdef0;
}
</style>
