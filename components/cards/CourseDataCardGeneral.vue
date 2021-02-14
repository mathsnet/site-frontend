<template>
  <div>
    <v-card>
      <v-img :src="thumbnail" lazy-src="/images/thumbnail.jpg" height="240">
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
      <v-card-title>{{ course.title }}</v-card-title>
      <v-card-subtitle
        ><v-chip color="primary">{{
          course.subscription.title
        }}</v-chip></v-card-subtitle
      >
      <v-card-text>
        <div :style="{ height: '60px' }">
          {{ courseDescription }}
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          small
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
    cardHeight() {
      return this.$vuetify.breakpoint.smAndUp ? '410px' : '100%'
    },
    thumbnail() {
      if (this.course.thumbnail_link) {
        return this.course.thumbnail_link
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
