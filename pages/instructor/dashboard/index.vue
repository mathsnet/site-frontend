<template>
  <div>Instructor Dashboard</div>
</template>

<script>
export default {
  middleware: ['authenticate', 'auth-instructor'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
  head() {
    return {
      title: `Dashboard`,
    }
  },
}
</script>

<style scoped></style>
