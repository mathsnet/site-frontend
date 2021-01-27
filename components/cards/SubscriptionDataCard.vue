<template>
  <div>
    <v-card elevation="3">
      <v-img
        src="/images/thumbnail.jpg"
        lazy-src="/images/thumbnail.jpg"
      ></v-img>
      <v-card-title>{{ item.title }}</v-card-title>
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
