<template>
  <div class="ma-5">
    Topic Page - {{ $route.params.title }} | {{ $route.params.slug }}
  </div>
</template>

<script>
export default {
  layout: 'homepage',
  data() {
    return {}
  },
  computed: {},
  methods: {},
  head() {
    return {
      title: `${this.$route.params.slug}`,
    }
  },
}
</script>

<style scoped></style>
