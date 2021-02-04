<template>
  <div>Course Page - {{ $route.params.title }}</div>
</template>

<script>
export default {
  layout: 'homepage',
  data() {
    return {}
  },
  computed: {},
  methods: {},
  head: {
    title: 'Course Page',
  },
}
</script>

<style scoped></style>
