<template>
  <div class="mb-5">
    <div
      class="primary--text font-weight-bold text-h5 text-sm-h4 text-md-h3 mb-5"
    >
      Overview
    </div>
    <v-divider></v-divider>
    <v-row align="center" class="mt-5">
      <v-col
        v-for="(item, i) in overviewItems"
        :key="i"
        cols="12"
        sm="6"
        md="4"
      >
        <v-sheet
          elevation="7"
          :color="boardColors[i]"
          height="200px"
          class="pa-4 white--text"
          rounded
        >
          <v-row>
            <v-col cols="2"> Icon </v-col>
            <v-col cols="10" class="text-center">
              <div class="display-3 font-weight-bold">{{ item.count }}</div>
              <div class="text-uppercase title" v-html="item.text"></div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col
        v-for="(item, i) in overviewItems2"
        :key="overviewItems.length + i"
        cols="12"
        sm="6"
        md="4"
      >
        <v-sheet
          elevation="7"
          :color="boardColors[overviewItems.length + i]"
          height="200px"
          class="pa-4 white--text"
          rounded
        >
          <v-row>
            <v-col cols="2"> Icon </v-col>
            <v-col cols="10" class="text-center">
              <div class="text-h4 font-weight-bold">{{ item.head }}</div>
              <div class="text-uppercase title">{{ item.text }}</div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ['authenticate', 'admin-auth'],
  data() {
    return {
      d: null,
      boardColors: [
        'primary',
        'pink darken-4',
        'green darken-4',
        'yellow darken-4',
        'teal darken-3',
        'blue darken-4',
        'red darken-4',
        'green lighten-1',
        'amber',
      ],
    }
  },
  computed: {
    overviewItems() {
      return [
        { count: 235, text: 'Topics<br />Created' },
        { count: 200, text: 'Courses <br />Created' },
        { count: 15, text: 'Past<br />Questions<br /> Created' },
        { count: 25, text: 'Levels<br /> Created' },
      ]
    },
    overviewItems2() {
      return [
        { head: 'Calculus', text: 'Course with Highest Subscription' },
        { head: 'Algebra', text: 'Course with highest topics' },
        { head: 'Trigonometry', text: 'Course with highest views' },
        { head: 'Calculus', text: 'Course with highest Re-subscription' },
        { head: 'Numeracy', text: 'Course with highest Youtube views' },
      ]
    },
    sbreak() {
      return this.$vuetify.breakpoint.name
    },
    totalTopics() {
      return 345
    },
    totalCourses() {
      return 200
    },
  },
}
</script>

<style scoped></style>
