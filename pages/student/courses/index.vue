<template>
  <div>Student Courses</div>
</template>

<script>
export default {
  middleware: ['authenticate', 'auth-student'],
  async fetch() {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  head: {
    title: 'Student Courses',
  },
}
</script>

<style scoped></style>
