<template>
  <div>Instructors</div>
</template>

<script>
export default {
  middleware: ['authenticate', 'auth-admin'],
  head: {
    title: "Instructors' List",
  },
}
</script>

<style scoped></style>
