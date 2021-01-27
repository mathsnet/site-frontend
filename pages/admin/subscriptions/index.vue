<template>
  <div>
    <div class="d-flex">
      <div
        class="primary--text font-weight-bold text-h6 text-sm-h4 text-md-h3 mb-5"
      >
        Subscriptions
      </div>
      <div class="ml-auto">
        <v-btn
          :small="small"
          :large="large"
          :x-large="xLarge"
          color="primary"
          @click.stop="openNewSubscriptionDialog"
          ><v-icon left>mdi-plus-circle</v-icon>Add New</v-btn
        >
      </div>
    </div>
    <v-divider class="mt-7"></v-divider>
    <div v-if="$fetchState.pending">
      {{ fetchPendingMessage }}
    </div>
    <div v-else-if="$fetchState.error">
      {{ fetchErrorMessage }}
    </div>
    <div v-else>
      <v-row v-if="subscriptions.length > 0">
        <v-col
          v-for="(item, i) in subscriptions"
          :key="i"
          sm="6"
          md="4"
          class="mb-2"
        >
          <SubscriptionDataCard
            :item="item"
            @deleteData="deleteData($event)"
            @updateData="updateData($event)"
          />
        </v-col>
      </v-row>
      <div v-else class="text-center display-3 font-weight-bold mx-auto">
        {{ noData }}
      </div>
    </div>
    <NewSubscriptionDialog
      :show-dialog="dialogState"
      @closeDialog="closeDialog"
      @reloadData="$fetch"
    />
  </div>
</template>

<script>
import NewSubscriptionDialog from '~/components/dialogs/NewSubscriptionDialog'
import SubscriptionDataCard from '~/components/cards/SubscriptionDataCard'
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  middleware: ['authenticate', 'auth-admin'],
  components: {
    NewSubscriptionDialog,
    SubscriptionDataCard,
  },
  async fetch() {
    const { data } = await this.$axios.get(
      CONSTANTS.ROUTES.ADMIN.GET_SUBSCRIPTIONS
    )
    this.subscriptions = data.subscriptions
  },
  data() {
    return {
      dialogState: false,
      subscriptions: [],
      fetchPendingMessage: CONSTANTS.MESSAGES.FETCH_LOADING_DATA,
      fetchErrorMessage: CONSTANTS.MESSAGES.FETCH_LOADING_ERROR,
      noData: CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY,
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
    openNewSubscriptionDialog() {
      this.dialogState = true
    },
    closeDialog() {
      this.dialogState = false
    },
    deleteData({ id }) {
      console.log(id)
    },
    updateData({ id }) {
      console.log(id)
    },
  },
}
</script>

<style scoped></style>
