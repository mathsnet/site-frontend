<template>
  <v-snackbar v-model="showSnackAlert" :color="color"> {{ text }}</v-snackbar>
</template>

<script>
export default {
  name: 'TheSnackbarAlart',
  computed: {
    showSnackAlert: {
      get() {
        return this.$store.getters['snackalert/getSnackbarState']
      },
      set() {
        this.$store.dispatch('snackalert/updateSnackbar', {
          show: false,
          msg: '',
          color: '',
        })
      },
    },
    color: {
      get() {
        return this.$store.getters['snackalert/getSnackbarColor']
      },
      set() {
        this.$store.dispatch('snackalert/updateSnackbar', {
          show: false,
          msg: '',
          color: '',
        })
      },
    },
    text: {
      get() {
        return this.$store.getters['snackalert/getSnackbarText']
      },
      set() {
        this.$store.dispatch('snackalert/updateSnackbar', {
          show: false,
          msg: '',
          color: '',
        })
      },
    },
  },
}
</script>

<style scoped></style>
