<template>
  <div>
    <div class="d-flex">
      <div
        class="primary--text font-weight-bold text-h6 text-sm-h4 text-md-h3 mb-5"
      >
        {{ text }}
      </div>
      <div v-if="showAdd" class="ml-auto">
        <v-btn
          :small="small"
          :large="large"
          :x-large="xLarge"
          color="primary"
          @click="$emit('openAddNewDialog')"
          ><v-icon left>mdi-plus-circle</v-icon>Add New</v-btn
        >
      </div>
    </div>
    <v-divider class="mb-7 mb-md-5" />
  </div>
</template>

<script>
export default {
  name: 'TheHeadInfo',
  props: {
    text: {
      type: String,
      default: '',
    },
    showAdd: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    small() {
      return !!(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
    },
    large() {
      return !!this.$vuetify.breakpoint.md
    },
    xLarge() {
      return !!this.$vuetify.breakpoint.lgAndUp
    },
  },
  methods: {},
}
</script>

<style scoped></style>
