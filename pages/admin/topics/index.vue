<template>
  <div>Topics</div>
</template>

<script>
export default {
  middleware: ['authenticate', 'auth-admin'],
  head: {
    title: "Topics' List",
  },
}
</script>

<style scoped></style>
