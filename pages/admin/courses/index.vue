<template>
  <div>
    <div class="d-flex">
      <div
        class="primary--text font-weight-bold text-h6 text-sm-h4 text-md-h3 mb-5"
      >
        Courses
      </div>
      <div class="ml-auto">
        <v-btn
          :small="small"
          :large="large"
          :x-large="xLarge"
          color="primary"
          @click.stop="openCourseDialog"
          ><v-icon left>mdi-plus-circle</v-icon>Add New</v-btn
        >
      </div>
    </div>
    <v-divider class="mb-6"></v-divider>
    <div v-if="$fetchState.pending">
      {{ fetchPendingMessage }}
    </div>
    <div v-else-if="$fetchState.error">
      {{ fetchErrorMessage }}
    </div>
    <div v-else>
      <v-row v-if="courses.length > 0">
        <v-col v-for="(item, i) in courses" :key="i" sm="6" md="4" class="mb-2">
          <CourseDataCard
            :item="item"
            @deleteData="openConfirmationDialog($event)"
            @updateData="updateData($event)"
          />
        </v-col>
      </v-row>
      <div v-else class="mx-auto text-center display-3 font-weight-bold">
        {{ noData }}
      </div>
    </div>
    <CourseDialog
      :show-dialog="dialogState"
      :course-data="courseData"
      :callee="callee"
      @closeDialog="closeCourseDialog"
      @reloadData="$fetch"
    />
    <ConfirmationDialog
      :open-dialog="confirmationDialogState"
      :item="itemToDelete"
      @YesAnswer="deleteData($event)"
      @CancelAnswer="confirmationDialogState = false"
    />
  </div>
</template>

<script>
import CourseDialog from '~/components/dialogs/CourseDialog'
import CourseDataCard from '~/components/cards/CourseDataCard'
import { CONSTANTS } from '~/assets/javascript/constants'
import ConfirmationDialog from '~/components/dialogs/ConfirmationDialog'
export default {
  middleware: ['authenticate', 'auth-admin'],
  components: {
    ConfirmationDialog,
    CourseDialog,
    CourseDataCard,
  },
  async fetch() {
    const { data } = await this.$axios.get(CONSTANTS.ROUTES.ADMIN.GET_COURSES)
    this.courses = data.data
  },
  data() {
    return {
      courses: [],
      dialogState: false,
      fetchPendingMessage: CONSTANTS.MESSAGES.FETCH_LOADING_DATA,
      fetchErrorMessage: CONSTANTS.MESSAGES.FETCH_LOADING_ERROR,
      noData: CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY,
      courseData: {
        title: '',
        description: '',
        subscription: '',
        id: null,
      },
      callee: 'add',
      confirmationDialogState: false,
      itemToDelete: null,
    }
  },
  computed: {
    breakPoint() {
      return this.$vuetify.breakpoint.name
    },
    small() {
      if (this.breakPoint === 'xs') {
        return true
      } else {
        return false
      }
    },
    large() {
      if (this.breakPoint === 'xs') {
        return false
      } else {
        return true
      }
    },
    xLarge() {
      if (
        this.breakPoint === 'md' ||
        this.breakPoint === 'lg' ||
        this.breakPoint === 'xl'
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    openConfirmationDialog(data) {
      this.itemToDelete = data
      this.confirmationDialogState = true
    },
    openCourseDialog() {
      this.callee = 'add'
      this.dialogState = true
    },
    closeCourseDialog() {
      this.dialogState = false
    },
    deleteData(item) {
      this.confirmationDialogState = false
      console.log(item)
    },
    updateData(item) {
      this.callee = 'update'

      this.courseData.title = item.title
      this.courseData.description = item.description
      this.courseData.subscription = item.subscription.id
      this.courseData.id = item.id

      this.dialogState = true
    },
  },
  head: {
    title: "Courses' List",
  },
}
</script>

<style scoped></style>
