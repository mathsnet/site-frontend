<template>
  <div>
    <TheHeadInfo text="My Subscriptions" :show-add="false" />
    <div class="mt-4">
      <v-card>
        <v-card-title>
          <!--<v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>-->
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :page="page"
          :page-count="totalPages"
          :options.sync="options"
          :search="search"
          :loading="loading"
          :server-items-length="totalItems"
          loading-text="Loading Data, Please wait"
        >
          <template #item.status="{ item }">
            <div v-if="item.status === true" class="error--text">Expired</div>
            <div v-else class="success--text">Active</div>
          </template>
          <template #item.addedOn="{ item }">
            <div>
              {{ format(new Date(item.addedOn), 'dd MMM YYY HH:mm:ss') }}
            </div>
          </template>
          <template #item.action="{ item }">
            <v-menu v-if="item.status">
              <template #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" color="primary" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="primary--text"
                      @click="renewSubscription(item)"
                      >Renew</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import TheHeadInfo from '~/components/general/TheHeadInfo'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  components: { TheHeadInfo },
  middleware: ['authenticate', 'auth-student'],
  data() {
    return {
      format,
      search: '',
      loading: false,
      page: 1,
      totalItems: 0,
      totalItemsPerPage: 0,
      totalPages: 0,
      itemsData: [],
      options: {},
    }
  },
  computed: {
    headers() {
      return [
        { value: 'subscription', text: 'Subscription', sortable: false },
        {
          value: 'addedOn',
          text: 'Added On',
          align: 'center',
          sortable: false,
        },
        { value: 'status', text: 'Status', align: 'center', sortable: false },
        { value: 'action', text: 'Actions', align: 'center', sortable: false },
      ]
    },
    items() {
      return this.itemsData && this.itemsData.length > 0
        ? this.itemsData.map((item) => {
            return {
              subscription: item.subscription.title,
              addedOn: item.added_on,
              status: item.expired,
            }
          })
        : []
    },
  },
  watch: {
    options: {
      handler() {
        this.loadPaymentData()
      },
    },
    deep: true,
  },
  mounted() {
    // this.loadPaymentData()
  },
  methods: {
    async loadPaymentData() {
      this.loading = true
      const { page, itemsPerPage } = this.options
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.STUDENT.LOAD_SUBSCRIPTIONS,
          { page, per_page: itemsPerPage > 0 ? itemsPerPage : 100000 }
        )

        this.totalPages = data.pagination.total_pages
        this.totalItems = data.pagination.total
        this.itemsData = data.student_sub
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.loading = false
    },
    renewSubscription(data) {
      // eslint-disable-next-line no-console
      console.log(data)
    },
  },
  head() {
    return {
      title: 'My Subscriptions',
    }
  },
}
</script>

<style scoped></style>
