<template>
  <div>
    <v-card elevation="3" max-height="400px" min-height="400px">
      <v-img :src="courseImage"></v-img>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle>&#8358;{{ item.subscription.price }}</v-card-subtitle>
      <v-card-text> {{ item.description }} </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-rating
          x-small
          :length="4"
          :value="ratingValue"
          color="amber darken-2"
        />
        <v-spacer></v-spacer>
        <v-btn
          :x-small="xSmall"
          :small="$vuetify.breakpoint.mdAndUp"
          outlined
          color="primary"
          @click="updateData(item)"
          >Modify</v-btn
        >
        <v-btn
          :x-small="xSmall"
          :small="$vuetify.breakpoint.mdAndUp"
          color="error"
          @click="deleteData(item)"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash'
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
      rating: [1, 2, 3],
    }
  },
  computed: {
    courseImage() {
      if (this.item.thumbnail) {
        return this.item.thumbnail
      } else {
        return '/images/thumbnail.jpg'
      }
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name
    },
    xSmall() {
      return this.breakpoint === 'xs'
    },
    ratingValue() {
      return _.sample(this.rating)
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
