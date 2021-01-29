<template>
  <div>Past Questions</div>
</template>

<script>
export default {
  middleware: ['authenticate', 'auth-admin'],
  head: {
    title: "Past Questions' List",
  },
}
</script>

<style scoped></style>
