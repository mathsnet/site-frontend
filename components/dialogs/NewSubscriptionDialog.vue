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
          Add New Subscription
        </v-card-title>
        <v-card-text>
          <v-form
            ref="newCourseForm"
            :value="valid"
            @submit.prevent="addNewSubscription"
          >
            <v-text-field
              v-model="newSubscriptionData.title"
              label="Subscription Title"
              :rules="rules.newSubscriptionTitle"
            ></v-text-field>
            <v-textarea
              v-model="newSubscriptionData.description"
              label="Subscription Description"
              :rules="rules.newSubscriptionDescription"
            ></v-textarea>
            <v-text-field
              v-model="newSubscriptionData.duration"
              label="Subscription Duration(in year)"
              :rules="rules.newSubscriptionDuration"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="newSubscriptionData.price"
              label="Subscription Price"
              :rules="rules.newSubscriptionPrice"
              type="number"
            ></v-text-field>
            <div class="text-center mt-7">
              <v-btn :loading="loading" color="primary" type="submit"
                >Add</v-btn
              >
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
      newSubscriptionData: {
        title: null,
        description: null,
        duration: null,
        price: null,
      },
      loading: false,
    }
  },
  computed: {},
  methods: {
    closeDialog() {
      this.clearData()
      this.$emit('closeDialog')
    },
    async addNewSubscription() {
      if (!this.$refs.newCourseForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.loading = true
      try {
        this.newSubscriptionData.title = _.capitalize(
          this.newSubscriptionData.title
        )
        const data = await this.$axios.post(
          CONSTANTS.ROUTES.ADMIN.ADD_SUBSCRIPTION,
          {
            data: this.newSubscriptionData,
          }
        )
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.$emit('reloadData')
        this.clearData()
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.ta.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
        console.log(e)
      }
      this.loading = false
      // this.closeDialog()
    },
    clearData() {
      this.newSubscriptionData.title = ''
      this.newSubscriptionData.description = ''
      this.newSubscriptionData.duration = ''
      this.newSubscriptionData.price = ''
    },
  },
}
</script>

<style scoped></style>
