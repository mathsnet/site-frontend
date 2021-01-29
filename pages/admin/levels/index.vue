<template>
  <div>Levels</div>
</template>

<script>
export default {
  middleware: ['authenticate', 'auth-admin'],
  head: {
    title: "Levels' List",
  },
}
</script>

<style scoped></style>
