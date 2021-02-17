<template>
  <div>
    <TheHeadInfo text="Payments History" :show-add="false" />
    <div class="mt-4">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
        ></v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import TheHeadInfo from '~/components/general/TheHeadInfo'
export default {
  components: { TheHeadInfo },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    headers() {
      return [
        { value: 'subscription', text: 'Subscription' },
        { value: 'reference', text: 'Reference' },
        { value: 'start', text: 'Start Date', align: 'center' },
        { value: 'end', text: 'End Date', align: 'center' },
        { value: 'status', text: 'Status', align: 'center' },
      ]
    },
    items() {
      return [
        {
          subscription: 'Primary Education',
          reference: 'MathsNet-33-93skAdeisd',
          start: '-',
          end: '-',
          status: 'pending',
        },
      ]
    },
  },
  methods: {},
  head() {
    return {
      title: 'Payments History',
    }
  },
}
</script>

<style scoped></style>
