<template>
  <div class="text-center mt-10 mb-13">
    <v-btn
      color="primary"
      class="mr-3"
      fab
      :small="xSmall"
      outlined
      :disabled="!pagination.has_prev"
      @click="changePage('prev')"
      ><v-icon>mdi-chevron-left</v-icon></v-btn
    >
    <v-btn
      fab
      outlined
      :small="xSmall"
      color="primary"
      :disabled="!pagination.has_next"
      @click="changePage('next')"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <div class="mt-3 text-body-2 text-md-body-1">
      Showing page {{ pagination.current_page }} out of
      {{ pagination.total_pages }}
      {{ pagination.total_pages > 1 ? 'pages' : 'page' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    xSmall() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    async changePage(type = 'next') {
      let page
      if (type === 'next') {
        page = this.pagination.current_page + 1
      } else {
        page = this.pagination.current_page - 1
      }
      if (page === 1) {
        await this.$router.push({ path: this.$route.path })
      } else {
        await this.$router.push({
          path: this.$route.path,
          query: { p: page.toString() },
        })
      }
      this.$emit('changePage', { page })
    },
  },
}
</script>

<style scoped></style>
