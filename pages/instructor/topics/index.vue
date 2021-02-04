<template>
  <div>Instructor's Topics Page</div>
</template>

<script>
export default {
  middleware: ['authenticate', 'auth-instructor'],
  data() {
    return {
      username: this.$auth.user.username,
    }
  },
  computed: {},
  methods: {},
  head: {
    title: `Instructor's Topics`,
  },
}
</script>

<style scoped></style>
