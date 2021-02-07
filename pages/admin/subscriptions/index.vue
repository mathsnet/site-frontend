<template>
  <div>
    <TheHeadInfo
      text="Subscriptions"
      @openAddNewDialog="openSubscriptionDialog"
    />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <div v-if="subscriptions.length > 0">
        <v-row>
          <v-col
            v-for="(item, i) in subscriptions"
            :key="i"
            sm="6"
            md="4"
            class="mb-2"
          >
            <SubscriptionDataCard
              :item="item"
              @deleteData="openConfirmationDialog($event)"
              @updateData="updateData($event)"
            />
          </v-col>
        </v-row>
        <div class="mt-7">
          <ThePagination
            :pagination="pagination"
            @changePage="moveToPage($event)"
          />
        </div>
      </div>
      <div v-else class="text-center display-3 font-weight-bold mx-auto">
        {{ noData }}
      </div>
    </div>
    <SubscriptionDialog
      :show-dialog="dialogState"
      :callee="callee"
      :subscription-data="subscriptionData"
      @closeDialog="closeDialog"
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
import SubscriptionDialog from '~/components/dialogs/SubscriptionDialog'
import SubscriptionDataCard from '~/components/cards/SubscriptionDataCard'
import CircularLoader from '~/components/loaders/CircularLoader'
import { CONSTANTS } from '~/assets/javascript/constants'
import TheHeadInfo from '~/components/general/TheHeadInfo'
import ConfirmationDialog from '~/components/dialogs/ConfirmationDialog'
import FetchError from '~/components/errors/FetchError'

export default {
  middleware: ['authenticate', 'auth-admin'],
  watchQuery: ['p'],
  components: {
    ConfirmationDialog,
    TheHeadInfo,
    SubscriptionDialog,
    SubscriptionDataCard,
    CircularLoader,
    FetchError,
  },
  async fetch() {
    let page
    this.pageToGo ? (page = this.pageToGo) : (page = this.$route.query.p)
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.ADMIN.GET_SUBSCRIPTIONS,
      { page }
    )
    this.subscriptions = data.subscriptions
    this.pagination = data.pagination
  },
  data() {
    return {
      dialogState: false,
      subscriptions: [],
      fetchPendingMessage: CONSTANTS.MESSAGES.FETCH_LOADING_DATA,
      fetchErrorMessage: CONSTANTS.MESSAGES.FETCH_LOADING_ERROR,
      noData: CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY,
      callee: 'add',
      subscriptionData: {
        title: '',
        description: '',
        duration: '',
        price: '',
        id: '',
        thumbnail_link: '',
      },
      confirmationDialogState: false,
      itemToDelete: null,
      pagination: {},
      pageToGo: null,
    }
  },
  computed: {},
  methods: {
    moveToPage({ page }) {
      this.pageToGo = page
      this.$fetch()
    },
    openConfirmationDialog(data) {
      this.itemToDelete = data
      this.confirmationDialogState = true
    },
    openSubscriptionDialog() {
      this.callee = 'add'
      this.dialogState = true
    },
    closeDialog() {
      this.dialogState = false
    },
    async deleteData(item) {
      this.confirmationDialogState = false
      this.$store.dispatch('actionoverlay/updateOverlayAction', true)
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.ADMIN.DELETE_SUBSCRIPTION,
          { data: item.id }
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
    updateData(item) {
      this.callee = 'update'
      this.subscriptionData = item
      this.dialogState = true
    },
  },
  head: {
    title: "Subscriptions' List",
  },
}
</script>

<style scoped></style>
