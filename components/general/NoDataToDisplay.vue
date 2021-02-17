<template>
  <div
    class="mx-auto mt-6 mb-7 text-center text-h6 text-sm-h5 text-md-h3 font-weight-bold"
  >
    <slot>{{ noData }}</slot>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'NoDataToDisplay',
  data() {
    return {
      noData: CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY,
    }
  },
}
</script>

<style scoped></style>
