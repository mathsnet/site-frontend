<template>
  <div>
    <v-card elevation="3">
      <v-img
        src="/images/thumbnail.jpg"
        lazy-src="/images/thumbnail.jpg"
      ></v-img>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle>{{ item.price }}</v-card-subtitle>
      <v-card-text> {{ item.description }} </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-rating x-small :length="5" :value="3" color="primary" />
        <v-spacer></v-spacer>
        <v-btn
          :x-small="xSmall"
          outlined
          color="primary"
          @click="updateData(item)"
          >Modify</v-btn
        >
        <v-btn :x-small="xSmall" color="error" @click="deleteData(item)"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CourseDataList',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      thumb: '/images/hero_image.png',
    }
  },
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.name
    },
    xSmall() {
      return this.breakpoint === 'xs'
    },
  },
  methods: {
    updateData(item) {
      this.$emit('updateData', { ...item })
    },
    deleteData(item) {
      this.$emit('deleteData', { ...item })
    },
  },
}
</script>

<style scoped></style>
