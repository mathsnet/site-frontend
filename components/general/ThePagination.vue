<template>
  <div class="text-center mt-10 mb-13">
    <v-btn color="primary" class="mr-3" fab outlined @click="moveLeft"
      ><v-icon>mdi-chevron-left</v-icon></v-btn
    >
    <v-btn fab outlined color="primary" @click="moveRight">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    moveRight() {
      return 'move right'
    },
    moveLeft() {
      return 'move left'
    },
  },
}
</script>

<style scoped></style>
