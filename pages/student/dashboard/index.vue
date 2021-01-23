<template>
  <div>Student Dashboard</div>
</template>

<script>
export default {
  name: 'Index',
  middleware: ['authenticate', 'auth-student'],
}
</script>

<style scoped></style>
