<template>
  <div class="mb-md-15">
    <TheHeadInfo text="Overview" :show-add="false" />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <v-row align="center" class="mt-5">
        <v-col
          v-for="(item, i) in overviewItems"
          :key="i"
          cols="12"
          sm="6"
          md="4"
        >
          <v-sheet
            elevation="7"
            :color="boardColors[i]"
            height="200px"
            class="pa-4 white--text"
            rounded
          >
            <v-row>
              <v-col cols="2">
                <v-icon color="white" x-large
                  >mdi-book-education-outline</v-icon
                >
              </v-col>
              <v-col cols="10" class="text-center">
                <div class="display-3 font-weight-bold mt-4">
                  {{ item.count }}
                </div>
                <div class="text-uppercase title mt-4">{{ item.text }}</div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col
          v-for="(item, i) in overviewItems2"
          :key="overviewItems.length + i"
          cols="12"
          sm="6"
          md="4"
        >
          <v-sheet
            elevation="7"
            :color="boardColors[overviewItems.length + i]"
            height="200px"
            class="pa-2 pt-4 white--text"
            rounded
          >
            <div class="text-center">
              <div class="text-h4 text-md-h5 font-weight-bold text-uppercase">
                {{ item.head }}
              </div>
              <v-divider dark></v-divider>
              <div class="text-uppercase subtitle-1 mt-3">{{ item.text }}</div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import TheHeadInfo from '~/components/general/TheHeadInfo'
export default {
  middleware: ['authenticate', 'auth-admin'],
  components: {
    TheHeadInfo,
    CircularLoader,
    FetchError,
  },
  async fetch() {
    const { data } = await this.$axios.get(
      CONSTANTS.ROUTES.ADMIN.GET_BASIC_REVIEWS
    )
    this.counter.courses = data.data.total_courses
    this.counter.sub_level = data.data.total_sub_levels
    this.counter.topics = data.data.total_topics
  },
  data() {
    return {
      d: null,
      boardColors: [
        'primary',
        'pink darken-4',
        'green darken-4',
        'yellow darken-4',
        'teal darken-3',
        'blue darken-4',
        'red darken-4',
        'green lighten-1',
        'amber darken-4',
      ],
      counter: {
        courses: 0,
        topics: 0,
        pq: 0,
        sub_level: 0,
      },
    }
  },
  computed: {
    overviewItems() {
      return [
        { count: this.counter.topics, text: 'Topics' },
        { count: this.counter.courses, text: 'Courses' },
        { count: this.counter.pq, text: 'Past Questions' },
        { count: this.counter.sub_level, text: 'Subscription Levels' },
      ]
    },
    overviewItems2() {
      return [
        { head: 'Calculus', text: 'Course with Highest Subscription' },
        { head: 'Algebra', text: 'Course with highest topics' },
        { head: 'Trigonometry', text: 'Course with highest views' },
        { head: 'Calculus', text: 'Course with highest Re-subscription' },
        { head: 'Numeracy', text: 'Course with highest Youtube views' },
      ]
    },
    sbreak() {
      return this.$vuetify.breakpoint.name
    },
    totalTopics() {
      return 345
    },
    totalCourses() {
      return 200
    },
  },
  head: {
    title: 'Dashboard',
  },
}
</script>

<style scoped></style>
