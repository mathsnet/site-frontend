<template>
  <div>
    <v-dialog
      v-model="showDialog"
      :max-width="maxWidth"
      :fullscreen="fullscreen"
      persistent
    >
      <v-card>
        <v-card-title class="primary--text">
          {{ callee === 'update' ? 'Update' : 'Add New' }} Subscription
        </v-card-title>
        <v-card-text>
          <v-form
            ref="subscriptionForm"
            :value="valid"
            @submit.prevent="submitData"
          >
            <v-text-field
              v-model="subscriptionData.title"
              label="Subscription Title"
              :rules="rules.newSubscriptionTitle"
            ></v-text-field>
            <v-textarea
              v-model="subscriptionData.description"
              label="Subscription Description"
              :rules="rules.newSubscriptionDescription"
            ></v-textarea>
            <v-text-field
              v-model="subscriptionData.duration"
              label="Subscription Duration(in year)"
              :rules="rules.newSubscriptionDuration"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="subscriptionData.price"
              label="Subscription Price"
              :rules="rules.newSubscriptionPrice"
              type="number"
            ></v-text-field>
            <div class="text-center mt-7">
              <v-btn :loading="loading" color="primary" type="submit">{{
                callee === 'update' ? 'Update' : 'Add'
              }}</v-btn>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-small text color="error" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { formRules } from '~/assets/javascript/formRules'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  props: {
    callee: {
      type: String,
      default: 'add',
    },
    subscriptionData: {
      type: Object,
      default: () => {},
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: Number,
      default: 450,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: formRules,
      valid: false,
      loading: false,
    }
  },
  computed: {},
  methods: {
    closeDialog() {
      this.clearData()
      this.$emit('closeDialog')
    },
    async submitData() {
      if (!this.$refs.subscriptionForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.loading = true
      try {
        this.subscriptionData.title = _.upperFirst(this.subscriptionData.title)
        let url
        if (this.callee === 'add') {
          url = CONSTANTS.ROUTES.ADMIN.ADD_SUBSCRIPTION
        } else {
          url = CONSTANTS.ROUTES.ADMIN.UPDATE_SUBSCRIPTION
        }
        const { data } = await this.$axios.post(url, {
          data: this.subscriptionData,
        })
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.$emit('reloadData')
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.ta.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.loading = false
      this.closeDialog()
    },
    clearData() {
      this.subscriptionData.title = ''
      this.subscriptionData.description = ''
      this.subscriptionData.duration = ''
      this.subscriptionData.price = ''
    },
  },
}
</script>

<style scoped></style>
