<template>
  <div class="ma-5 ma-md-7">
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <div v-if="!l_.isEmpty(courseData)">
        <v-breadcrumbs>
          <v-breadcrumbs-item
            ><v-btn
              text
              tile
              plain
              color="primary"
              :to="{ name: 'courses' }"
              class="text-capitalize"
              >Courses</v-btn
            ></v-breadcrumbs-item
          >
          /
          <v-breadcrumbs-item
            ><v-btn text tile disabled class="text-capitalize">{{
              pageTitle
            }}</v-btn></v-breadcrumbs-item
          >
        </v-breadcrumbs>
        <v-card
          elevation="2"
          class="mt-5 mt-sm-6 mt-md-7"
          :tile="$vuetify.breakpoint.xsOnly"
        >
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12" sm="5">
                <v-img :src="courseImage" lazy-src="/images/thumbnail.jpg">
                  <template #placeholder>
                    <v-row
                      class="fill-height ma-0"
                      justify="center"
                      align="center"
                    >
                      <v-progress-circular indeterminate />
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" sm="7">
                <!-- Mobile -->
                <div v-if="$vuetify.breakpoint.xsOnly">
                  <v-expansion-panels flat>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        class="text-title font-weight-bold"
                      >
                        {{ l_.startCase(courseData.title) }}
                        <template #actions>
                          <v-icon color="primary"> $expand </v-icon>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div class="text-caption mb-3">
                          <v-chip color="primary"
                            >&#8358;{{ courseData.subscription.price }}</v-chip
                          >
                        </div>
                        {{ courseData.description }}</v-expansion-panel-content
                      >
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
                <!-- desktop -->
                <div v-else>
                  <div class="text-md-h5 font-weight-bold">
                    {{ l_.startCase(courseData.title) }}
                  </div>
                  <div class="text-caption mb-4 mt-3">
                    <v-chip color="primary"
                      >&#8358;{{ courseData.subscription.price }}</v-chip
                    >
                  </div>
                  <div class="text-body-1">{{ courseData.description }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-row
          class="fill-height text-center my-5"
          justify="center"
          align="center"
        >
          <v-btn color="primary">Enroll Now </v-btn>
        </v-row>
        <v-row justify="center" class="mt-5">
          <v-col cols="12" md="8">
            <div class="text-title text-md-h5 font-weight-bold text-uppercase">
              Course Topics
            </div>
            <div>
              <div v-if="topicsLoading">
                <v-progress-circular indeterminate color="primary" />
              </div>
              <div v-else>
                <div v-if="topics.length > 0">
                  <v-expansion-panels>
                    <v-expansion-panel v-for="(topic, i) in topics" :key="i">
                      <v-expansion-panel-header class="font-weight-bold"
                        >{{ topic.title }}
                        <template #actions>
                          <v-icon color="primary"> $expand </v-icon>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content
                        class="text-caption text-md-h6"
                        >{{ topic.description }}</v-expansion-panel-content
                      >
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
                <div
                  v-else
                  class="mt-4 font-weight-bold text-md-h5 text-title text-uppercase text-center"
                >
                  No Topics for this course yet. Check back later
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div
              class="text-title text-md-h5 font-weight-bold text-center text-uppercase"
            >
              Other Courses
            </div>
            <div v-if="otherCoursesLoading" class="text-center">
              <v-progress-circular indeterminate color="primary" />
            </div>
            <div v-else>
              <div v-if="otherCourses.length > 0">
                <div v-for="(course, i) in otherCourses" :key="i" class="mb-4">
                  <CourseDataCardGeneral :course="course" />
                </div>
              </div>
              <div
                v-else
                class="mt-4 font-weight-bold text-md-h5 text-title text-uppercase text-center"
              >
                No other courses yet. Check back later
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-else class="text-uppercase font-weight-bold text-h5 text-center">
        {{ messages.COURSE_NOT_FOUND }}
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { CONSTANTS } from '~/assets/javascript/constants'
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import CourseDataCardGeneral from '~/components/cards/CourseDataCardGeneral'
export default {
  layout: 'homepage',
  components: {
    CourseDataCardGeneral,
    CircularLoader,
    FetchError,
  },
  async fetch() {
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.GENERAL.GET_COURSE_DATA,
      {
        data: {
          course_seo_link: this.$route.params.title,
        },
      }
    )
    if (data.message) {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
        throw new Error(data.message)
      } else {
        this.$store.dispatch('snackalert/showErrorSnackbar', data.message)
        await this.$router.push({ name: 'courses' })
      }
    }
    this.courseData = data.course
    this.pageTitle = _.startCase(this.courseData.title)
    await this.loadTopics(this.courseData.id)
    await this.loadOtherCourses(this.courseData.id)
  },
  data() {
    return {
      courseData: {},
      pageTitle: 'loading',
      messages: CONSTANTS.MESSAGES,
      l_: _,
      topics: [],
      otherCourses: [],
      topicsLoading: true,
      otherCoursesLoading: true,
    }
  },
  computed: {
    breadcrumbsItems() {
      return [
        {
          text: 'Courses',
          href: 'courses',
          disabled: false,
        },
        {
          text: this.pageTitle,
          href: null,
          disabled: true,
        },
      ]
    },
    courseName() {
      return this.pageTitle
    },
    courseImage() {
      return this.courseData.thumbnail_link
        ? this.courseData.thumbnail_link
        : '/images/thumbnail.jpg'
    },
  },
  methods: {
    async loadTopics(courseId) {
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.GENERAL.GET_TOPIC_DATA,
          { data: courseId }
        )
        this.topics = data.topics
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.topicsLoading = false
    },
    async loadOtherCourses(courseId) {
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.GENERAL.GET_RANDOM_COURSES,
          { data: courseId }
        )
        this.otherCourses = data.courses
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.otherCoursesLoading = false
    },
  },
  head() {
    return {
      title: `${this.pageTitle}`,
    }
  },
}
</script>

<style scoped></style>
