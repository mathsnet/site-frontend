<template>
  <div>
    <v-card elevation="3" max-height="400px" min-height="400px">
      <v-img
        src="/images/thumbnail.jpg"
        lazy-src="/images/thumbnail.jpg"
      ></v-img>
      <v-card-title class="text-capitalize">{{ item.title }}</v-card-title>
      <v-card-subtitle> &#8358;{{ item.price }}</v-card-subtitle>
      <v-card-text> {{ item.description }} </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-icon :small="xSmall" color="primary"
          >mdi-clipboard-clock-outline</v-icon
        >
        <span class="primary--text subtitle-2"
          >{{ item.duration }}{{ item.duration > 1 ? 'yrs' : 'yr' }}</span
        >
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
    return {}
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
