<template>
  <div>
    <v-card>
      <v-img :src="courseImage" />
      <v-card-title>{{ course.title }}</v-card-title>
      <v-card-subtitle>&#8358;{{ course.subscription.price }}</v-card-subtitle>
      <v-card-text>{{ courseDescription }}</v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          :to="{ name: 'course-title', params: { title: course.seo_link } }"
          >Open Course</v-btn
        >
        <v-spacer />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CourseDataCardGeneral',
  props: {
    course: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    courseImage() {
      if (this.course.thumbnail) {
        return this.course.thumbnail
      } else {
        return '/images/thumbnail.jpg'
      }
    },
    courseDescription() {
      return this.course.description
    },
  },
}
</script>

<style scoped></style>
