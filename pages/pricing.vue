<template>
  <div class="ma-7">
    <div>
      <div
        class="mt-5 text-center text-h5 text-sm-h4 text-md-h3 primary--text font-weight-black"
      >
        Simple, straight forward pricing.
      </div>
      <div class="mt-4 mb-6 text-center text-title text-md-h5">
        Choose the plan that's right for your learning. Whether you're still in
        Elementary class, Primary School, Secondary School or Advance Level,
        we've got you covered
      </div>
    </div>
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <div v-if="subscriptions && subscriptions.length > 0" class="mt-5">
        <v-row justify="center" align="center">
          <v-col
            v-for="(pricing, i) in subscriptions"
            :key="i"
            cols="12"
            sm="6"
            md="4"
          >
            <PricingCard
              :pricing="pricing"
              @addSubscription="addSubscription($event)"
            />
          </v-col>
        </v-row>
      </div>
      <div v-else class="mt-5">
        <NoDataToDisplay />
      </div>
    </div>
    <PaymentDialog
      :show="paymentDialogState"
      :amount="amount"
      @closeDialog="paymentDialogState = false"
    />
  </div>
</template>

<script>
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import { CONSTANTS } from '~/assets/javascript/constants'
import NoDataToDisplay from '~/components/general/NoDataToDisplay'
import PricingCard from '~/components/cards/PricingCard'
import PaymentDialog from '~/components/dialogs/PaymentDialog'
export default {
  name: 'Pricing',
  layout: 'homepage',
  components: {
    PaymentDialog,
    PricingCard,
    NoDataToDisplay,
    CircularLoader,
    FetchError,
  },
  async fetch() {
    const { data } = await this.$axios.get(
      CONSTANTS.ROUTES.GENERAL.GET_SUBSCRIPTIONS_DATA
    )
    this.subscriptions = data.subscriptions
  },
  data() {
    return {
      subscriptions: [],
      amount: 0,
      paymentDialogState: false,
    }
  },
  computed: {},
  methods: {
    addSubscription(data) {
      this.amount = data.price
      this.paymentDialogState = true
    },
  },
  head() {
    return {
      title: 'Pricing',
    }
  },
}
</script>

<style scoped></style>
