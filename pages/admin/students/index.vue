<template>
  <div>
    <TheHeadInfo text="Students" @openAddNewDialog="openNewUserDialog" />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      Error Occurred while loading the data
    </div>
    <div v-else>
      <div v-if="students.length > 0">
        <v-row>
          <v-col
            v-for="(user, i) in students"
            :key="i"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <UsersDataCard :user="user.profile" />
          </v-col>
        </v-row>
      </div>
      <div v-else class="mx-auto text-center display-3 font-weight-bold">
        {{ noData }}
      </div>
    </div>
    <NewStudentDialog
      :open-dialog="newUserDialogState"
      @closeDialog="closeNewInstructorDialog"
      @reloadData="$fetch"
    />
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import NewStudentDialog from '~/components/dialogs/NewStudentDialog'

export default {
  components: { NewStudentDialog },
  middleware: ['authenticate', 'auth-admin'],
  async fetch() {
    const { data } = await this.$axios.get(CONSTANTS.ROUTES.ADMIN.GET_STUDENTS)
    this.students = data.students
  },
  data() {
    return {
      newUserDialogState: false,
      students: [],
      noData: CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY,
    }
  },
  computed: {},
  methods: {
    openNewUserDialog() {
      this.newUserDialogState = true
    },
    closeNewInstructorDialog() {
      this.newUserDialogState = false
    },
  },
  head: {
    title: "Students' List",
  },
}
</script>

<style scoped></style>
