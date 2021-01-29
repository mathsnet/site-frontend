<template>
  <div>Students</div>
</template>

<script>
export default {
  middleware: ['authenticate', 'auth-admin'],
  head: {
    title: "Students' List",
  },
}
</script>

<style scoped></style>
