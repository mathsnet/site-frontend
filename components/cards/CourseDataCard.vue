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
        Rating <v-spacer></v-spacer>
        <v-btn
          :x-small="xSmall"
          outlined
          color="primary"
          @click="updateData(item.id)"
          >Modify</v-btn
        >
        <v-btn :x-small="xSmall" color="error" @click="deleteData(item.id)"
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
    updateData(id) {
      this.$emit('updateData', { id })
    },
    deleteData(id) {
      this.$emit('deleteData', { id })
    },
  },
}
</script>

<style scoped></style>
