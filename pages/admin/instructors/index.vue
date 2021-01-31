<template>
  <div>
    <TheHeadInfo
      text="Instructors"
      @openAddNewDialog="openNewInstructorDialog"
    />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      Error Occurred while loading the data
    </div>
    <div v-else>
      <div v-if="instructors.length > 0">
        <v-row>
          <v-col
            v-for="(user, i) in instructors"
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
    <NewInstructorDialog
      :open-dialog="newInstructorDialogState"
      @closeDialog="closeNewInstructorDialog"
      @reloadData="$fetch"
    />
  </div>
</template>

<script>
import TheHeadInfo from '~/components/general/TheHeadInfo'
import NewInstructorDialog from '~/components/dialogs/NewInstructorDialog'
import UsersDataCard from '~/components/cards/UsersDataCard'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  components: { UsersDataCard, NewInstructorDialog, TheHeadInfo },
  middleware: ['authenticate', 'auth-admin'],
  async fetch() {
    const { data } = await this.$axios.get(
      CONSTANTS.ROUTES.ADMIN.GET_INSTRUCTORS
    )
    this.instructors = data.instructors
  },
  data() {
    return {
      newInstructorDialogState: false,
      instructors: [],
      noData: CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY,
    }
  },
  computed: {},
  methods: {
    openNewInstructorDialog() {
      this.newInstructorDialogState = true
    },
    closeNewInstructorDialog() {
      this.newInstructorDialogState = false
    },
  },
  head: {
    title: "Instructors' List",
  },
}
</script>

<style scoped></style>
