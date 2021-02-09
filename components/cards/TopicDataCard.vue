<template>
  <div>
    <v-card width="100%">
      <v-card-title>{{ topic.course.title }} | {{ topic.title }}</v-card-title>
      <v-card-subtitle class="text-subtitle-2"
        >By: {{ topic.instructor.first_name }},
        {{ topic.instructor.last_name }}</v-card-subtitle
      >
      <v-card-text>
        <div :style="{ height: '60px' }">
          {{ topic.description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          small
          depressed
          color="primary"
          target="_blank"
          :to="{
            name: 'course-title-topic-slug',
            params: { title: topic.course.seo_link, slug: topic.seo_link },
          }"
          >View</v-btn
        >
        <v-btn small depressed color="primary" @click="editTopic(topic)"
          >Edit</v-btn
        >
        <v-btn small depressed color="error" @click="deleteTopic(topic.id)"
          >Delete</v-btn
        >
        <v-spacer />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TopicDataCard',
  props: {
    topic: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    editTopic(topic) {
      this.$emit('editTopic', { ...topic })
    },
    deleteTopic(id) {
      this.$emit('deleteTopic', { id })
    },
  },
}
</script>

<style scoped></style>
