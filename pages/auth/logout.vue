<template>
  <div class="text-center font-weight-black text-h6 text-md-h3 mt-14 mt-md-7">
    Logging Out............. Please wait
  </div>
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
