<template>
  <div>
    <TheHeadInfo text="Instructor's Topics" @openAddNewDialog="openDialog" />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else class="mt-7">
      <div v-if="topics.length > 0">
        <div v-for="(topic, i) in topics" :key="i" class="mb-4" elevation="4">
          <TopicDataCard
            :topic="topic"
            @editTopic="updateTopic($event)"
            @deleteTopic="confirmDeletion($event)"
          />
        </div>
        <div class="mt-5">
          <ThePagination
            :pagination="pagination"
            @changePage="moveToPage($event)"
          />
        </div>
      </div>
      <div v-else class="text-center font-weight-bold text-h5 text-md-h3">
        {{ noData }}
      </div>
    </div>
    <TopicDialog
      :show-dialog="dialogState"
      :topic-data="topicData"
      :callee="callee"
      @closeDialog="closeDialog"
      @reloadData="$fetch"
    />
    <ConfirmationDialog
      :open-dialog="confirmationDialogState"
      :item="itemToDelete"
      @YesAnswer="deleteTopic($event)"
      @CancelAnswer="confirmationDialogState = false"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { CONSTANTS } from '~/assets/javascript/constants'
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import TopicDataCard from '~/components/cards/TopicDataCard'
import TopicDialog from '~/components/dialogs/TopicDialog'
import ConfirmationDialog from '~/components/dialogs/ConfirmationDialog'
export default {
  middleware: ['authenticate', 'auth-instructor'],
  components: {
    TopicDialog,
    TopicDataCard,
    CircularLoader,
    FetchError,
    ConfirmationDialog,
  },
  async fetch() {
    let page
    this.pageToGo ? (page = this.pageToGo) : (page = this.$route.query.p)
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.INSTRUCTOR.GET_TOPICS,
      { page }
    )
    this.topics = data.topics
    this.pagination = data.pagination
  },
  data() {
    return {
      username: _.capitalize(this.$auth.user.username),
      pagination: {},
      topics: [],
      callee: 'add',
      confirmationDialogState: false,
      itemToDelete: null,
      pageToGo: null,
      dialogState: false,
      noData: CONSTANTS.MESSAGES.NO_TOPICS_TO_DISPLAY,
      topicData: {
        title: '',
        description: '',
        course: '',
        id: '',
        video_link: '',
      },
    }
  },
  computed: {},
  methods: {
    updateTopic(topic) {
      this.callee = 'update'

      this.topicData.title = topic.title
      this.topicData.description = topic.description
      this.topicData.course = topic.course.id
      this.topicData.id = topic.id
      this.topicData.video_link = topic.video_link

      this.dialogState = true
    },
    confirmDeletion(id) {
      this.itemToDelete = id
      this.confirmationDialogState = true
    },
    async deleteTopic({ id }) {
      this.confirmationDialogState = false
      this.$store.dispatch('actionoverlay/updateOverlayAction', true)
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.INSTRUCTOR.DELETE_TOPIC,
          { id }
        )
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.$fetch()
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.$store.dispatch('actionoverlay/updateOverlayAction', false)
    },
    closeDialog() {
      this.dialogState = false
    },
    moveToPage({ page }) {
      this.pageToGo = page
      this.$fetch()
    },
    openDialog() {
      this.dialogState = true
    },
  },
  head() {
    return {
      title: `${this.username}'s Topics`,
    }
  },
}
</script>

<style scoped></style>
