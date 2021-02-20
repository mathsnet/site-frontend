<template>
  <div>
    <TheHeadInfo text="My Courses" :show-add="false" />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <div v-if="courses && courses.length > 0">
        <div class="mt-7">
          <ThePagination
            :pagination="pagination"
            @changePage="moveToPage($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeadInfo from '~/components/general/TheHeadInfo'
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  middleware: ['authenticate', 'auth-student'],
  components: {
    TheHeadInfo,
    CircularLoader,
    FetchError,
  },
  async fetch() {
    let page
    this.pageToGo ? (page = this.pageToGo) : (page = this.$route.query.p)
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.STUDENT.LOAD_COURSES,
      {
        page,
      }
    )
    // eslint-disable-next-line no-console
    console.log(data)
  },
  data() {
    return {
      courses: [],
      pageToGo: 1,
      pagination: {},
    }
  },
  computed: {},
  methods: {
    moveToPage({ page }) {
      this.pageToGo = page
      this.$fetch()
    },
  },
  head: {
    title: 'Student Courses',
  },
}
</script>

<style scoped></style>
