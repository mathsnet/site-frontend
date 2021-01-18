<template>
  <div>Logging Out.............</div>
</template>

<script>
export default {
  name: 'Logout',
  layout: 'homepage',
  mounted() {
    this.logoutUser()
  },
  methods: {
    async logoutUser() {
      this.$store.dispatch('actionoverlay/updateOverlayAction', true)
      try {
        await this.$auth.logout()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
