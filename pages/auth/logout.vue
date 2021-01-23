<template>
  <div>Logging Out.............</div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'Logout',
  layout: 'homepage',
  mounted() {
    this.logoutUser()
  },
  methods: {
    async logoutUser() {
      this.$store.dispatch('actionoverlay/updateOverlayAction', true, 0.95)
      try {
        await this.$auth.logout()
        this.$store.dispatch(
          'snackalert/showSuccessSnackbar',
          CONSTANTS.MESSAGES.LOGOUT_SUCCESSFUL
        )
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.UNKNOWN_ERROR
        )
      }
      this.$store.dispatch('actionoverlay/updateOverlayAction', false)
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
