<template>
  <div>Student Subscriptions</div>
</template>

<script>
export default {
  middleware: ['authenticate', 'auth-student'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
  head: {
    title: 'Student Subscriptions',
  },
}
</script>

<style scoped></style>
