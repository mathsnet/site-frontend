<template>
  <div>Recover account</div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'Recovery',
  layout: 'auth',
  head: {
    title: `Forget Password`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `${CONSTANTS.APP_NAME} account recovery page, Online maths schools`,
      },
    ],
  },
}
</script>

<style scoped></style>
