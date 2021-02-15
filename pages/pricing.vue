<template>
  <div class="ma-7">
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
  </div>
</template>

<script>
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  name: 'Pricing',
  layout: 'homepage',
  components: {
    CircularLoader,
    FetchError,
  },
  async fetch() {
    const { data } = await this.$axios.get(
      CONSTANTS.ROUTES.GENERAL.GET_SUBSCRIPTIONS_DATA
    )

    this.subscriptions = data.subscriptions
    // eslint-disable-next-line no-console
    console.log(this.subscriptions)
  },
  data() {
    return {
      subscriptions: [],
    }
  },
  head() {
    return {
      title: 'Pricing',
    }
  },
}
</script>

<style scoped></style>
