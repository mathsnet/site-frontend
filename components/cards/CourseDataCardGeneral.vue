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
        <div
          :style="{ height: '70px' }"
          @click="showFullDescription(courseDescription)"
        >
          <TextTruncate>{{ courseDescription }}</TextTruncate>
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
    <FullDescriptionDialog
      :open="openFullDescription"
      :text="fullDescription"
      @closeDialog="openFullDescription = false"
    />
  </div>
</template>

<script>
import FullDescriptionDialog from '~/components/dialogs/FullDescriptionDialog'
export default {
  name: 'CourseDataCardGeneral',
  components: { FullDescriptionDialog },
  props: {
    course: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      openFullDescription: false,
      fullDescription: '',
    }
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
  methods: {
    showFullDescription(data) {
      this.fullDescription = data
      this.openFullDescription = true
    },
  },
}
</script>

<style scoped></style>
